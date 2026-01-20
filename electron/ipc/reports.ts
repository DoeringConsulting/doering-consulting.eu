import { ipcMain } from 'electron';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';
import { getDatabase, schema } from '../database/connection';
import log from '../utils/logger';

const { timeEntries, expenses, fixedCosts, customers, taxSettings, exchangeRates } = schema;

export function registerReportsHandlers(): void {
  // Generate monthly report
  ipcMain.handle('reports:generateMonthlyReport', async (_event, year: number, month: number) => {
    try {
      const db = getDatabase();
      
      // Calculate month boundaries
      const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      const monthEnd = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
      
      // Get time entries for the month
      const timeEntriesData = db.select({
        id: timeEntries.id,
        customerId: timeEntries.customerId,
        date: timeEntries.date,
        projectName: timeEntries.projectName,
        entryType: timeEntries.entryType,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        customer: {
          id: customers.id,
          name: customers.name,
          dailyRate: customers.dailyRate,
          currency: customers.currency,
          billingModel: customers.billingModel
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .all()
      .filter(e => e.date >= monthStart && e.date <= monthEnd);

      // Get expenses for the month
      const expensesData = db.select({
        id: expenses.id,
        customerId: expenses.customerId,
        date: expenses.date,
        category: expenses.category,
        subcategory: expenses.subcategory,
        amount: expenses.amount,
        currency: expenses.currency,
        distance: expenses.distance,
        description: expenses.description,
        customer: {
          id: customers.id,
          name: customers.name
        }
      })
      .from(expenses)
      .leftJoin(customers, eq(expenses.customerId, customers.id))
      .all()
      .filter(e => e.date >= monthStart && e.date <= monthEnd);

      // Get active fixed costs
      const fixedCostsData = db.select().from(fixedCosts).all()
        .filter(cost => {
          const startBeforeMonthEnd = cost.startDate <= monthEnd;
          const endAfterMonthStart = !cost.endDate || cost.endDate >= monthStart;
          return startBeforeMonthEnd && endAfterMonthStart;
        });

      // Get tax settings
      const taxSettingsData = db.select().from(taxSettings).all();

      // Calculate totals
      const totalHours = timeEntriesData.reduce((sum, e) => sum + e.hours + e.minutes / 60, 0);
      const totalDays = totalHours / 8;

      // Group by customer
      const customerSummary: Record<number, {
        customerId: number;
        customerName: string;
        dailyRate: number;
        currency: string;
        billingModel: string;
        hours: number;
        days: number;
        revenue: number;
        entries: typeof timeEntriesData;
      }> = {};

      for (const entry of timeEntriesData) {
        if (!entry.customer) continue;
        
        if (!customerSummary[entry.customerId]) {
          customerSummary[entry.customerId] = {
            customerId: entry.customerId,
            customerName: entry.customer.name || 'Unknown',
            dailyRate: entry.customer.dailyRate || 0,
            currency: entry.customer.currency || 'EUR',
            billingModel: entry.customer.billingModel || 'exclusive',
            hours: 0,
            days: 0,
            revenue: 0,
            entries: []
          };
        }

        const entryHours = entry.hours + entry.minutes / 60;
        customerSummary[entry.customerId].hours += entryHours;
        customerSummary[entry.customerId].days = customerSummary[entry.customerId].hours / 8;
        customerSummary[entry.customerId].revenue = customerSummary[entry.customerId].days * customerSummary[entry.customerId].dailyRate;
        customerSummary[entry.customerId].entries.push(entry);
      }

      const totalRevenue = Object.values(customerSummary).reduce((sum, c) => sum + c.revenue, 0);
      const totalExpenses = expensesData.reduce((sum, e) => sum + e.amount, 0);
      const totalFixedCosts = fixedCostsData.reduce((sum, f) => sum + f.amount, 0);

      // Calculate taxes
      let zusCost = 0;
      let healthInsuranceCost = 0;
      let incomeTax = 0;

      for (const setting of taxSettingsData) {
        if (setting.taxType === 'zus') {
          zusCost = setting.calculationType === 'fixed' 
            ? setting.value 
            : totalRevenue * (setting.value / 100);
        }
        if (setting.taxType === 'health_insurance') {
          healthInsuranceCost = setting.calculationType === 'fixed' 
            ? setting.value 
            : totalRevenue * (setting.value / 100);
        }
        if (setting.taxType === 'income_tax') {
          const taxableIncome = totalRevenue - totalExpenses - totalFixedCosts - zusCost - healthInsuranceCost;
          incomeTax = setting.calculationType === 'fixed' 
            ? setting.value 
            : taxableIncome * (setting.value / 100);
        }
      }

      const netIncome = totalRevenue - totalExpenses - totalFixedCosts - zusCost - healthInsuranceCost - incomeTax;

      const report = {
        year,
        month,
        monthStart,
        monthEnd,
        summary: {
          totalHours,
          totalDays,
          totalRevenue,
          totalExpenses,
          totalFixedCosts,
          zusCost,
          healthInsuranceCost,
          incomeTax,
          netIncome
        },
        customerBreakdown: Object.values(customerSummary),
        timeEntries: timeEntriesData,
        expenses: expensesData,
        fixedCosts: fixedCostsData,
        taxSettings: taxSettingsData
      };

      log.info('Monthly report generated:', { year, month });
      return { success: true, data: report };
    } catch (error: any) {
      log.error('Error generating monthly report:', error);
      return { success: false, error: error.message };
    }
  });

  // Generate customer report
  ipcMain.handle('reports:generateCustomerReport', async (_event, customerId: number, startDate: string, endDate: string) => {
    try {
      const db = getDatabase();
      
      // Get customer
      const customer = db.select().from(customers).where(eq(customers.id, customerId)).get();
      if (!customer) {
        return { success: false, error: 'Customer not found' };
      }

      // Get time entries
      const timeEntriesData = db.select()
        .from(timeEntries)
        .where(eq(timeEntries.customerId, customerId))
        .all()
        .filter(e => e.date >= startDate && e.date <= endDate);

      // Get expenses
      const expensesData = db.select()
        .from(expenses)
        .where(eq(expenses.customerId, customerId))
        .all()
        .filter(e => e.date >= startDate && e.date <= endDate);

      // Calculate totals
      const totalHours = timeEntriesData.reduce((sum, e) => sum + e.hours + e.minutes / 60, 0);
      const totalDays = totalHours / 8;
      const totalRevenue = totalDays * customer.dailyRate;
      const totalExpenses = expensesData.reduce((sum, e) => sum + e.amount, 0);

      const report = {
        customer,
        startDate,
        endDate,
        summary: {
          totalHours,
          totalDays,
          dailyRate: customer.dailyRate,
          totalRevenue,
          totalExpenses,
          netTotal: totalRevenue + totalExpenses // Expenses are usually reimbursable
        },
        timeEntries: timeEntriesData,
        expenses: expensesData
      };

      log.info('Customer report generated:', { customerId, startDate, endDate });
      return { success: true, data: report };
    } catch (error: any) {
      log.error('Error generating customer report:', error);
      return { success: false, error: error.message };
    }
  });

  // Get dashboard data
  ipcMain.handle('reports:getDashboardData', async () => {
    try {
      const db = getDatabase();
      
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const monthStart = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
      const lastDay = new Date(currentYear, currentMonth, 0).getDate();
      const monthEnd = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${lastDay}`;

      // Get current month time entries
      const currentMonthEntries = db.select({
        id: timeEntries.id,
        customerId: timeEntries.customerId,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        date: timeEntries.date,
        customer: {
          dailyRate: customers.dailyRate
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .all()
      .filter(e => e.date >= monthStart && e.date <= monthEnd);

      // Get current month expenses
      const currentMonthExpenses = db.select()
        .from(expenses)
        .all()
        .filter(e => e.date >= monthStart && e.date <= monthEnd);

      // Get active customers count
      const activeCustomers = db.select()
        .from(customers)
        .where(eq(customers.isArchived, 0))
        .all();

      // Calculate current month totals
      const totalHoursThisMonth = currentMonthEntries.reduce((sum, e) => sum + e.hours + e.minutes / 60, 0);
      const totalDaysThisMonth = totalHoursThisMonth / 8;
      const totalRevenueThisMonth = currentMonthEntries.reduce((sum, e) => {
        const days = (e.hours + e.minutes / 60) / 8;
        return sum + days * (e.customer?.dailyRate || 0);
      }, 0);
      const totalExpensesThisMonth = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

      // Get recent entries
      const recentTimeEntries = db.select({
        id: timeEntries.id,
        date: timeEntries.date,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        projectName: timeEntries.projectName,
        entryType: timeEntries.entryType,
        customer: {
          name: customers.name
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .orderBy(desc(timeEntries.date))
      .limit(5)
      .all();

      const recentExpenses = db.select({
        id: expenses.id,
        date: expenses.date,
        amount: expenses.amount,
        category: expenses.category,
        description: expenses.description,
        customer: {
          name: customers.name
        }
      })
      .from(expenses)
      .leftJoin(customers, eq(expenses.customerId, customers.id))
      .orderBy(desc(expenses.date))
      .limit(5)
      .all();

      const dashboardData = {
        currentMonth: {
          year: currentYear,
          month: currentMonth,
          totalHours: totalHoursThisMonth,
          totalDays: totalDaysThisMonth,
          totalRevenue: totalRevenueThisMonth,
          totalExpenses: totalExpensesThisMonth,
          entriesCount: currentMonthEntries.length,
          expensesCount: currentMonthExpenses.length
        },
        activeCustomersCount: activeCustomers.length,
        recentTimeEntries,
        recentExpenses
      };

      return { success: true, data: dashboardData };
    } catch (error: any) {
      log.error('Error getting dashboard data:', error);
      return { success: false, error: error.message };
    }
  });

  // Get yearly summary
  ipcMain.handle('reports:getYearlySummary', async (_event, year: number) => {
    try {
      const db = getDatabase();
      
      const yearStart = `${year}-01-01`;
      const yearEnd = `${year}-12-31`;

      // Get all time entries for the year
      const yearlyEntries = db.select({
        id: timeEntries.id,
        customerId: timeEntries.customerId,
        date: timeEntries.date,
        hours: timeEntries.hours,
        minutes: timeEntries.minutes,
        customer: {
          dailyRate: customers.dailyRate
        }
      })
      .from(timeEntries)
      .leftJoin(customers, eq(timeEntries.customerId, customers.id))
      .all()
      .filter(e => e.date >= yearStart && e.date <= yearEnd);

      // Get all expenses for the year
      const yearlyExpenses = db.select()
        .from(expenses)
        .all()
        .filter(e => e.date >= yearStart && e.date <= yearEnd);

      // Calculate monthly breakdown
      const monthlyData: Record<number, {
        month: number;
        hours: number;
        days: number;
        revenue: number;
        expenses: number;
      }> = {};

      for (let month = 1; month <= 12; month++) {
        monthlyData[month] = { month, hours: 0, days: 0, revenue: 0, expenses: 0 };
      }

      for (const entry of yearlyEntries) {
        const month = parseInt(entry.date.split('-')[1]);
        const hours = entry.hours + entry.minutes / 60;
        monthlyData[month].hours += hours;
        monthlyData[month].days = monthlyData[month].hours / 8;
        monthlyData[month].revenue += (hours / 8) * (entry.customer?.dailyRate || 0);
      }

      for (const expense of yearlyExpenses) {
        const month = parseInt(expense.date.split('-')[1]);
        monthlyData[month].expenses += expense.amount;
      }

      const summary = {
        year,
        totalHours: yearlyEntries.reduce((sum, e) => sum + e.hours + e.minutes / 60, 0),
        totalDays: yearlyEntries.reduce((sum, e) => sum + e.hours + e.minutes / 60, 0) / 8,
        totalRevenue: Object.values(monthlyData).reduce((sum, m) => sum + m.revenue, 0),
        totalExpenses: yearlyExpenses.reduce((sum, e) => sum + e.amount, 0),
        monthlyBreakdown: Object.values(monthlyData)
      };

      return { success: true, data: summary };
    } catch (error: any) {
      log.error('Error getting yearly summary:', error);
      return { success: false, error: error.message };
    }
  });
}
