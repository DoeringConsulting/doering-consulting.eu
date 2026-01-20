import React, { useEffect, useState } from 'react';
import { api, DashboardData } from '@/lib/electron-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Clock, 
  Euro, 
  Users, 
  Receipt,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const dashboardData = await api.reports.getDashboardData();
      setData(dashboardData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-32 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">Fehler beim Laden: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentMonth = data?.currentMonth;
  const monthName = currentMonth ? format(new Date(currentMonth.year, currentMonth.month - 1), 'MMMM yyyy', { locale: de }) : '';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{monthName}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arbeitsstunden</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth?.totalHours.toFixed(1)} h</div>
            <p className="text-xs text-muted-foreground">
              {currentMonth?.totalDays.toFixed(1)} Tage diesen Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Umsatz</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonth?.totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentMonth?.entriesCount} Einträge diesen Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reisekosten</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonth?.totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentMonth?.expensesCount} Belege diesen Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Kunden</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.activeCustomersCount}</div>
            <p className="text-xs text-muted-foreground">
              Nicht archivierte Kunden
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Letzte Zeiteinträge</CardTitle>
            <CardDescription>Die neuesten Arbeitszeiten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentTimeEntries && data.recentTimeEntries.length > 0 ? (
                data.recentTimeEntries.map((entry: any) => (
                  <div key={entry.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{entry.projectName}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.customer?.name} • {format(new Date(entry.date), 'dd.MM.yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{entry.hours}:{String(entry.minutes).padStart(2, '0')} h</p>
                      <p className="text-xs text-muted-foreground">{entry.entryType}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Keine Zeiteinträge vorhanden</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Letzte Ausgaben</CardTitle>
            <CardDescription>Die neuesten Reisekosten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentExpenses && data.recentExpenses.length > 0 ? (
                data.recentExpenses.map((expense: any) => (
                  <div key={expense.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{expense.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {expense.customer?.name} • {format(new Date(expense.date), 'dd.MM.yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {expense.amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </p>
                      <p className="text-xs text-muted-foreground">{expense.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Keine Ausgaben vorhanden</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <a href="/time-tracking" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              <Clock className="h-4 w-4" />
              Zeit erfassen
            </a>
            <a href="/expenses" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90">
              <Receipt className="h-4 w-4" />
              Ausgabe hinzufügen
            </a>
            <a href="/reports" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90">
              <TrendingUp className="h-4 w-4" />
              Monatsbericht erstellen
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
