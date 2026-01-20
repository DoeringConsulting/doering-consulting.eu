import React, { useEffect, useState } from 'react';
import { api, TimeEntry, Customer } from '@/lib/electron-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
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
import { Plus, Pencil, Trash2, CalendarIcon, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ENTRY_TYPES = [
  { value: 'onsite', label: 'Vor Ort', color: 'bg-green-500' },
  { value: 'remote', label: 'Remote', color: 'bg-blue-500' },
  { value: 'off_duty', label: 'Frei', color: 'bg-gray-500' },
  { value: 'business_trip', label: 'Geschäftsreise', color: 'bg-orange-500' }
];

export default function TimeTracking() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  
  // Filter state
  const [filterCustomerId, setFilterCustomerId] = useState<string>('all');
  const [filterStartDate, setFilterStartDate] = useState<Date>(startOfMonth(new Date()));
  const [filterEndDate, setFilterEndDate] = useState<Date>(endOfMonth(new Date()));

  // Form state
  const [formData, setFormData] = useState({
    customerId: '',
    date: new Date(),
    projectName: '',
    entryType: 'onsite' as 'onsite' | 'remote' | 'off_duty' | 'business_trip',
    hours: '8',
    minutes: '0',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, [filterCustomerId, filterStartDate, filterEndDate]);

  async function loadData() {
    try {
      setLoading(true);
      const [customersData, entriesData] = await Promise.all([
        api.customers.list(),
        api.timeEntries.list({
          startDate: format(filterStartDate, 'yyyy-MM-dd'),
          endDate: format(filterEndDate, 'yyyy-MM-dd'),
          customerId: filterCustomerId !== 'all' ? parseInt(filterCustomerId) : undefined
        })
      ]);
      setCustomers(customersData.filter(c => c.isArchived === 0));
      setEntries(entriesData);
    } catch (err: any) {
      toast.error('Fehler beim Laden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingEntry(null);
    setFormData({
      customerId: customers[0]?.id.toString() || '',
      date: new Date(),
      projectName: '',
      entryType: 'onsite',
      hours: '8',
      minutes: '0',
      notes: ''
    });
    setDialogOpen(true);
  }

  function openEditDialog(entry: TimeEntry) {
    setEditingEntry(entry);
    setFormData({
      customerId: entry.customerId.toString(),
      date: new Date(entry.date),
      projectName: entry.projectName,
      entryType: entry.entryType,
      hours: entry.hours.toString(),
      minutes: entry.minutes.toString(),
      notes: entry.notes || ''
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const entryData = {
        customerId: parseInt(formData.customerId),
        date: format(formData.date, 'yyyy-MM-dd'),
        projectName: formData.projectName,
        entryType: formData.entryType,
        hours: parseInt(formData.hours),
        minutes: parseInt(formData.minutes),
        notes: formData.notes || undefined
      };

      if (editingEntry) {
        await api.timeEntries.update(editingEntry.id, entryData);
        toast.success('Eintrag aktualisiert');
      } else {
        await api.timeEntries.create(entryData);
        toast.success('Eintrag erstellt');
      }
      
      setDialogOpen(false);
      loadData();
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Möchten Sie diesen Eintrag wirklich löschen?')) return;
    
    try {
      await api.timeEntries.delete(id);
      toast.success('Eintrag gelöscht');
      loadData();
    } catch (err: any) {
      toast.error('Fehler beim Löschen: ' + err.message);
    }
  }

  // Calculate totals
  const totalHours = entries.reduce((sum, e) => sum + e.hours + e.minutes / 60, 0);
  const totalDays = totalHours / 8;
  const totalRevenue = entries.reduce((sum, e) => {
    const days = (e.hours + e.minutes / 60) / 8;
    return sum + days * (e.customer?.dailyRate || 0);
  }, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Zeiterfassung</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Neuer Eintrag
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stunden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)} h</div>
            <p className="text-xs text-muted-foreground">{totalDays.toFixed(1)} Tage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Einträge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length}</div>
            <p className="text-xs text-muted-foreground">im ausgewählten Zeitraum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Geschätzter Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">basierend auf Tagessätzen</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="space-y-2">
              <Label>Kunde</Label>
              <Select value={filterCustomerId} onValueChange={setFilterCustomerId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Alle Kunden" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kunden</SelectItem>
                  {customers.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Von</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(filterStartDate, 'dd.MM.yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filterStartDate}
                    onSelect={(date) => date && setFilterStartDate(date)}
                    locale={de}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Bis</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(filterEndDate, 'dd.MM.yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filterEndDate}
                    onSelect={(date) => date && setFilterEndDate(date)}
                    locale={de}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entries Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Projekt</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Zeit</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">Laden...</TableCell>
                </TableRow>
              ) : entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Keine Einträge gefunden
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => {
                  const entryType = ENTRY_TYPES.find(t => t.value === entry.entryType);
                  return (
                    <TableRow key={entry.id}>
                      <TableCell>{format(new Date(entry.date), 'dd.MM.yyyy')}</TableCell>
                      <TableCell>{entry.customer?.name}</TableCell>
                      <TableCell>{entry.projectName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-white", entryType?.color)}>
                          {entryType?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.hours}:{String(entry.minutes).padStart(2, '0')} h</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(entry)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(entry.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? 'Eintrag bearbeiten' : 'Neuer Zeiteintrag'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Kunde *</Label>
                <Select
                  value={formData.customerId}
                  onValueChange={(value) => setFormData({ ...formData, customerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kunde wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(c => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                <Label>Projektname *</Label>
                <Input
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Typ *</Label>
                <Select
                  value={formData.entryType}
                  onValueChange={(value: any) => setFormData({ ...formData, entryType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ENTRY_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Stunden *</Label>
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Minuten</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={formData.minutes}
                    onChange={(e) => setFormData({ ...formData, minutes: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notizen</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">
                {editingEntry ? 'Speichern' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
