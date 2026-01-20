import React, { useEffect, useState } from 'react';
import { api, FixedCost } from '@/lib/electron-api';
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
import { Plus, Pencil, Trash2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

const COST_CATEGORIES = [
  { value: 'auto', label: 'Auto/Fahrzeug' },
  { value: 'phone', label: 'Telefon/Internet' },
  { value: 'software', label: 'Software/Lizenzen' },
  { value: 'accounting', label: 'Buchhaltung' },
  { value: 'insurance', label: 'Versicherungen' },
  { value: 'office', label: 'Büro' },
  { value: 'other', label: 'Sonstiges' }
];

export default function FixedCosts() {
  const [costs, setCosts] = useState<FixedCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<FixedCost | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'other',
    amount: '',
    currency: 'EUR',
    startDate: new Date(),
    endDate: null as Date | null,
    notes: ''
  });

  useEffect(() => {
    loadCosts();
  }, []);

  async function loadCosts() {
    try {
      setLoading(true);
      const data = await api.fixedCosts.list();
      setCosts(data);
    } catch (err: any) {
      toast.error('Fehler beim Laden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingCost(null);
    setFormData({
      name: '',
      category: 'other',
      amount: '',
      currency: 'EUR',
      startDate: new Date(),
      endDate: null,
      notes: ''
    });
    setDialogOpen(true);
  }

  function openEditDialog(cost: FixedCost) {
    setEditingCost(cost);
    setFormData({
      name: cost.name,
      category: cost.category,
      amount: cost.amount.toString(),
      currency: cost.currency,
      startDate: new Date(cost.startDate),
      endDate: cost.endDate ? new Date(cost.endDate) : null,
      notes: cost.notes || ''
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const costData = {
        name: formData.name,
        category: formData.category,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        startDate: format(formData.startDate, 'yyyy-MM-dd'),
        endDate: formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : undefined,
        notes: formData.notes || undefined
      };

      if (editingCost) {
        await api.fixedCosts.update(editingCost.id, costData);
        toast.success('Fixkosten aktualisiert');
      } else {
        await api.fixedCosts.create(costData);
        toast.success('Fixkosten erstellt');
      }
      
      setDialogOpen(false);
      loadCosts();
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Möchten Sie diese Fixkosten wirklich löschen?')) return;
    
    try {
      await api.fixedCosts.delete(id);
      toast.success('Fixkosten gelöscht');
      loadCosts();
    } catch (err: any) {
      toast.error('Fehler beim Löschen: ' + err.message);
    }
  }

  // Calculate totals
  const activeCosts = costs.filter(c => !c.endDate || new Date(c.endDate) >= new Date());
  const monthlyTotal = activeCosts.reduce((sum, c) => sum + c.amount, 0);
  const yearlyTotal = monthlyTotal * 12;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Fixkosten</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Neue Fixkosten
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monatliche Fixkosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">{activeCosts.length} aktive Posten</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Jährliche Fixkosten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {yearlyTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-muted-foreground">Hochrechnung</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alle Posten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{costs.length}</div>
            <p className="text-xs text-muted-foreground">inkl. beendeter</p>
          </CardContent>
        </Card>
      </div>

      {/* Costs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Kategorie</TableHead>
                <TableHead>Zeitraum</TableHead>
                <TableHead className="text-right">Monatlich</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">Laden...</TableCell>
                </TableRow>
              ) : costs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Keine Fixkosten vorhanden
                  </TableCell>
                </TableRow>
              ) : (
                costs.map((cost) => {
                  const cat = COST_CATEGORIES.find(c => c.value === cost.category);
                  const isActive = !cost.endDate || new Date(cost.endDate) >= new Date();
                  return (
                    <TableRow key={cost.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cost.name}</p>
                          {cost.notes && (
                            <p className="text-sm text-muted-foreground">{cost.notes}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{cat?.label || cost.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(cost.startDate), 'dd.MM.yyyy')}
                        {cost.endDate && ` - ${format(new Date(cost.endDate), 'dd.MM.yyyy')}`}
                        {!cost.endDate && ' - unbegrenzt'}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {cost.amount.toLocaleString('de-DE', { style: 'currency', currency: cost.currency })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isActive ? 'default' : 'outline'}>
                          {isActive ? 'Aktiv' : 'Beendet'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(cost)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(cost.id)}
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
              {editingCost ? 'Fixkosten bearbeiten' : 'Neue Fixkosten'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="z.B. Kfz-Versicherung"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Kategorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COST_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monatlicher Betrag *</Label>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Startdatum *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.startDate, 'dd.MM.yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                        locale={de}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Enddatum (optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, 'dd.MM.yyyy') : 'Unbegrenzt'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate || undefined}
                        onSelect={(date) => setFormData({ ...formData, endDate: date || null })}
                        locale={de}
                      />
                      <div className="p-2 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setFormData({ ...formData, endDate: null })}
                        >
                          Unbegrenzt
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notizen</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">
                {editingCost ? 'Speichern' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
