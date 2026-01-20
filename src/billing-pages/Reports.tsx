import React, { useEffect, useState } from 'react';
import { api, MonthlyReport, Customer } from '@/lib/electron-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, RefreshCw, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

export default function Reports() {
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [yearlySummary, setYearlySummary] = useState<any>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Selected period
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());

  useEffect(() => {
    loadCustomers();
    loadYearlySummary(currentYear);
  }, []);

  useEffect(() => {
    generateReport();
  }, [selectedYear, selectedMonth]);

  async function loadCustomers() {
    try {
      const data = await api.customers.list();
      setCustomers(data.filter(c => c.isArchived === 0));
    } catch (err: any) {
      console.error('Error loading customers:', err);
    }
  }

  async function loadYearlySummary(year: number) {
    try {
      const data = await api.reports.getYearlySummary(year);
      setYearlySummary(data);
    } catch (err: any) {
      console.error('Error loading yearly summary:', err);
    }
  }

  async function generateReport() {
    try {
      setLoading(true);
      const data = await api.reports.generateMonthlyReport(
        parseInt(selectedYear),
        parseInt(selectedMonth)
      );
      setReport(data);
    } catch (err: any) {
      toast.error('Fehler beim Generieren: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Generate year options
  const years = [];
  for (let y = currentYear; y >= currentYear - 5; y--) {
    years.push(y);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Berichte</h1>
        <Button onClick={generateReport} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Aktualisieren
        </Button>
      </div>

      {/* Period Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Zeitraum auswählen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="space-y-2">
              <Label>Jahr</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Monat</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">Monatsbericht</TabsTrigger>
          <TabsTrigger value="yearly">Jahresübersicht</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-6">
          {report && (
            <>
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Umsatz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {report.summary.totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {report.summary.totalDays.toFixed(1)} Arbeitstage
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ausgaben</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      -{(report.summary.totalExpenses + report.summary.totalFixedCosts).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reisekosten + Fixkosten
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Steuern</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      -{(report.summary.zusCost + report.summary.healthInsuranceCost + report.summary.incomeTax).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ZUS + NFZ + PIT
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Netto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {report.summary.netIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Verbleibend
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Customer Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Umsatz nach Kunde</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kunde</TableHead>
                        <TableHead className="text-right">Stunden</TableHead>
                        <TableHead className="text-right">Tage</TableHead>
                        <TableHead className="text-right">Tagessatz</TableHead>
                        <TableHead className="text-right">Umsatz</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.customerBreakdown.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            Keine Daten für diesen Monat
                          </TableCell>
                        </TableRow>
                      ) : (
                        report.customerBreakdown.map((customer: any) => (
                          <TableRow key={customer.customerId}>
                            <TableCell className="font-medium">{customer.customerName}</TableCell>
                            <TableCell className="text-right">{customer.hours.toFixed(1)} h</TableCell>
                            <TableCell className="text-right">{customer.days.toFixed(1)}</TableCell>
                            <TableCell className="text-right">
                              {customer.dailyRate.toLocaleString('de-DE', { style: 'currency', currency: customer.currency })}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {customer.revenue.toLocaleString('de-DE', { style: 'currency', currency: customer.currency })}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Detaillierte Aufstellung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="font-medium">Bruttoumsatz:</div>
                      <div className="text-right">{report.summary.totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                      
                      <div>- Reisekosten:</div>
                      <div className="text-right text-red-600">-{report.summary.totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                      
                      <div>- Fixkosten:</div>
                      <div className="text-right text-red-600">-{report.summary.totalFixedCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                      
                      <div className="border-t pt-2 font-medium">= Gewinn vor Steuern:</div>
                      <div className="text-right border-t pt-2 font-medium">
                        {(report.summary.totalRevenue - report.summary.totalExpenses - report.summary.totalFixedCosts).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </div>
                      
                      <div>- ZUS:</div>
                      <div className="text-right text-orange-600">-{report.summary.zusCost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                      
                      <div>- NFZ:</div>
                      <div className="text-right text-orange-600">-{report.summary.healthInsuranceCost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                      
                      <div>- Einkommensteuer:</div>
                      <div className="text-right text-orange-600">-{report.summary.incomeTax.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</div>
                      
                      <div className="border-t pt-2 font-bold text-lg">= Nettogewinn:</div>
                      <div className="text-right border-t pt-2 font-bold text-lg text-green-600">
                        {report.summary.netIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="yearly" className="space-y-6">
          {yearlySummary && (
            <>
              {/* Yearly Summary Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Jahresumsatz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {yearlySummary.totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Arbeitsstunden</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {yearlySummary.totalHours.toFixed(0)} h
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {yearlySummary.totalDays.toFixed(0)} Tage
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ausgaben</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {yearlySummary.totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Durchschnitt/Monat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(yearlySummary.totalRevenue / 12).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Monatliche Übersicht {selectedYear}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={yearlySummary.monthlyBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          tickFormatter={(month) => MONTHS[month - 1].substring(0, 3)}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          labelFormatter={(month) => MONTHS[month - 1]}
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Umsatz" fill="#22c55e" />
                        <Bar dataKey="expenses" name="Ausgaben" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Monatliche Details</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Monat</TableHead>
                        <TableHead className="text-right">Stunden</TableHead>
                        <TableHead className="text-right">Tage</TableHead>
                        <TableHead className="text-right">Umsatz</TableHead>
                        <TableHead className="text-right">Ausgaben</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {yearlySummary.monthlyBreakdown.map((month: any) => (
                        <TableRow key={month.month}>
                          <TableCell className="font-medium">{MONTHS[month.month - 1]}</TableCell>
                          <TableCell className="text-right">{month.hours.toFixed(1)} h</TableCell>
                          <TableCell className="text-right">{month.days.toFixed(1)}</TableCell>
                          <TableCell className="text-right text-green-600">
                            {month.revenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          </TableCell>
                          <TableCell className="text-right text-red-600">
                            {month.expenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
