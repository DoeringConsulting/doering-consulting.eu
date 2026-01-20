import React, { useEffect, useState } from 'react';
import { api, Expense, Customer } from '@/lib/electron-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Pencil, Trash2, CalendarIcon, Receipt, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

const EXPENSE_CATEGORIES = [
  { value: 'transport', label: 'Transport', subcategories: ['car', 'train', 'flight', 'taxi', 'bus'] },
  { value: 'accommodation', label: 'Unterkunft', subcategories: ['hotel', 'airbnb'] },
  { value: 'meals', label: 'Verpflegung', subcategories: ['restaurant', 'supermarket'] },
  { value: 'fuel', label: 'Kraftstoff', subcategories: ['petrol', 'diesel', 'electric'] },
  { value: 'other', label: 'Sonstiges', subcategories: ['parking', 'toll', 'equipment', 'other'] }
];

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  
  // Filter state
  const [filterCustomerId, setFilterCustomerId] = useState<string>('all');
  const [filterStartDate, setFilterStartDate] = useState<Date>(startOfMonth(new Date()));
  const [filterEndDate, setFilterEndDate] = useState<Date>(endOfMonth(new Date()));

  // Form state
  const [formData, setFormData] = useState({
    customerId: '',
    date: new Date(),
    category: 'transport',
    subcategory: '',
    amount: '',
    currency: 'EUR',
    distance: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, [filterCustomerId, filterStartDate, filterEndDate]);

  async function loadData() {
    try {
      setLoading(true);
      const [customersData, expensesData] = await Promise.all([
        api.customers.list(),
        api.expenses.list({
          startDate: format(filterStartDate, 'yyyy-MM-dd'),
          endDate: format(filterEndDate, 'yyyy-MM-dd'),
          customerId: filterCustomerId !== 'all' ? parseInt(filterCustomerId) : undefined
        })
      ]);
      setCustomers(customersData.filter(c => c.isArchived === 0));
      setExpenses(expensesData);
    } catch (err: any) {
      toast.error('Fehler beim Laden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingExpense(null);
    setFormData({
      customerId: customers[0]?.id.toString() || '',
      date: new Date(),
      category: 'transport',
      subcategory: '',
      amount: '',
      currency: 'EUR',
      distance: '',
      description: ''
    });
    setDialogOpen(true);
  }

  function openEditDialog(expense: Expense) {
    setEditingExpense(expense);
    setFormData({
      customerId: expense.customerId.toString(),
      date: new Date(expense.date),
      category: expense.category,
      subcategory: expense.subcategory || '',
      amount: expense.amount.toString(),
      currency: expense.currency,
      distance: expense.distance?.toString() || '',
      description: expense.description || ''
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const expenseData = {
        customerId: parseInt(formData.customerId),
        date: format(formData.date, 'yyyy-MM-dd'),
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        distance: formData.distance ? parseFloat(formData.distance) : undefined,
        description: formData.description || undefined
      };

      if (editingExpense) {
        await api.expenses.update(editingExpense.id, expenseData);
        toast.success('Ausgabe aktualisiert');
      } else {
        await api.expenses.create(expenseData);
        toast.success('Ausgabe erstellt');
      }
      
      setDialogOpen(false);
      loadData();
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Möchten Sie diese Ausgabe wirklich löschen?')) return;
    
    try {
      await api.expenses.delete(id);
      toast.success('Ausgabe gelöscht');
      loadData();
    } catch (err: any) {
      toast.error('Fehler beim Löschen: ' + err.message);
    }
  }

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const selectedCategory = EXPENSE_CATEGORIES.find(c => c.value === formData.category);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reisekosten</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Neue Ausgabe
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gesamt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">{expenses.length} Ausgaben</p>
          </CardContent>
        </Card>
        {Object.entries(categoryTotals).slice(0, 3).map(([category, total]) => {
          const cat = EXPENSE_CATEGORIES.find(c => c.value === category);
          return (
            <Card key={category}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{cat?.label || category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {total.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
              </CardContent>
            </Card>
          );
        })}
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

      {/* Expenses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead className="text-right">Betrag</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">Laden...</TableCell>
                </TableRow>
              ) : expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Keine Ausgaben gefunden
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((expense) => {
                  const cat = EXPENSE_CATEGORIES.find(c => c.value === expense.category);
                  return (
                    <TableRow key={expense.id}>
                      <TableCell>{format(new Date(expense.date), 'dd.MM.yyyy')}</TableCell>
                      <TableCell>{expense.customer?.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {cat?.label || expense.category}
                          {expense.subcategory && ` / ${expense.subcategory}`}
                        </Badge>
                      </TableCell>
                      <TableCell>{expense.description || '-'}</TableCell>
                      <TableCell className="text-right font-medium">
                        {expense.amount.toLocaleString('de-DE', { style: 'currency', currency: expense.currency })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(expense)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(expense.id)}
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
              {editingExpense ? 'Ausgabe bearbeiten' : 'Neue Ausgabe'}
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPENSE_CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Unterkategorie</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subcategories.map(sub => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Betrag *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Währung</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="PLN">PLN</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(formData.category === 'transport' || formData.category === 'fuel') && (
                <div className="space-y-2">
                  <Label>Distanz (km)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">
                {editingExpense ? 'Speichern' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
