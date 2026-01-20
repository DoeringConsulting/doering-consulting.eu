import React, { useEffect, useState } from 'react';
import { api, ExchangeRate } from '@/lib/electron-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
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
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, RefreshCw, CalendarIcon, TrendingUp } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

const CURRENCIES = ['EUR', 'USD', 'CHF', 'GBP'];

export default function ExchangeRates() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fetchingNBP, setFetchingNBP] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    date: new Date(),
    currency: 'EUR',
    rate: ''
  });

  useEffect(() => {
    loadRates();
  }, []);

  async function loadRates() {
    try {
      setLoading(true);
      const data = await api.exchangeRates.list({
        startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd')
      });
      setRates(data);
    } catch (err: any) {
      toast.error('Fehler beim Laden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setFormData({
      date: new Date(),
      currency: 'EUR',
      rate: ''
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      await api.exchangeRates.create({
        date: format(formData.date, 'yyyy-MM-dd'),
        currencyPair: `${formData.currency}/PLN`,
        rate: parseFloat(formData.rate),
        source: 'Manual'
      });
      
      toast.success('Wechselkurs gespeichert');
      setDialogOpen(false);
      loadRates();
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    }
  }

  async function fetchFromNBP(currency: string, date: Date) {
    try {
      setFetchingNBP(true);
      const result = await api.exchangeRates.fetchFromNBP(
        format(date, 'yyyy-MM-dd'),
        currency
      );
      toast.success(`Wechselkurs von NBP abgerufen: ${result.rate.toFixed(4)}`);
      loadRates();
    } catch (err: any) {
      toast.error('Fehler beim Abrufen: ' + err.message);
    } finally {
      setFetchingNBP(false);
    }
  }

  async function fetchAllFromNBP() {
    try {
      setFetchingNBP(true);
      const today = new Date();
      
      for (const currency of CURRENCIES) {
        try {
          await api.exchangeRates.fetchFromNBP(
            format(today, 'yyyy-MM-dd'),
            currency
          );
        } catch {
          // Ignore individual errors
        }
      }
      
      toast.success('Wechselkurse aktualisiert');
      loadRates();
    } catch (err: any) {
      toast.error('Fehler beim Abrufen: ' + err.message);
    } finally {
      setFetchingNBP(false);
    }
  }

  // Get latest rates per currency
  const latestRates: Record<string, ExchangeRate> = {};
  for (const rate of rates) {
    const currency = rate.currencyPair.split('/')[0];
    if (!latestRates[currency] || rate.date > latestRates[currency].date) {
      latestRates[currency] = rate;
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Wechselkurse</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchAllFromNBP} disabled={fetchingNBP}>
            <RefreshCw className={`h-4 w-4 mr-2 ${fetchingNBP ? 'animate-spin' : ''}`} />
            NBP aktualisieren
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Manueller Eintrag
          </Button>
        </div>
      </div>

      {/* Current Rates */}
      <div className="grid gap-4 md:grid-cols-4">
        {CURRENCIES.map(currency => {
          const rate = latestRates[currency];
          return (
            <Card key={currency}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {currency}/PLN
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => fetchFromNBP(currency, new Date())}
                    disabled={fetchingNBP}
                  >
                    <RefreshCw className={`h-3 w-3 ${fetchingNBP ? 'animate-spin' : ''}`} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {rate ? (
                  <>
                    <div className="text-2xl font-bold">{rate.rate.toFixed(4)}</div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(rate.date), 'dd.MM.yyyy')} • {rate.source}
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">Kein Kurs verfügbar</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            NBP Wechselkurse
          </CardTitle>
          <CardDescription>
            Die Wechselkurse werden von der Narodowy Bank Polski (NBP) abgerufen. 
            Falls für ein bestimmtes Datum kein Kurs verfügbar ist (z.B. Wochenende/Feiertag), 
            wird automatisch der letzte verfügbare Kurs verwendet.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Rates History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Letzte 30 Tage</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Währungspaar</TableHead>
                <TableHead className="text-right">Kurs</TableHead>
                <TableHead>Quelle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">Laden...</TableCell>
                </TableRow>
              ) : rates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Keine Wechselkurse vorhanden
                  </TableCell>
                </TableRow>
              ) : (
                rates.slice(0, 50).map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>{format(new Date(rate.date), 'dd.MM.yyyy')}</TableCell>
                    <TableCell>{rate.currencyPair}</TableCell>
                    <TableCell className="text-right font-mono">{rate.rate.toFixed(4)}</TableCell>
                    <TableCell>
                      <Badge variant={rate.source === 'NBP' ? 'default' : 'secondary'}>
                        {rate.source}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Manual Entry Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manueller Wechselkurs</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Datum *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(formData.date, 'dd.MM.yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData({ ...formData, date })}
                      locale={de}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Währung *</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(currency => (
                      <SelectItem key={currency} value={currency}>{currency}/PLN</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kurs (1 {formData.currency} = X PLN) *</Label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  placeholder="4.3456"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">Speichern</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
