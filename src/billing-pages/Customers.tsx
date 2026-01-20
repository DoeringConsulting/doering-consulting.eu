import React, { useEffect, useState } from 'react';
import { api, Customer } from '@/lib/electron-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
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
import { Plus, Pencil, Trash2, Archive, ArchiveRestore, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    taxId: '',
    billingModel: 'exclusive' as 'exclusive' | 'inclusive',
    dailyRate: '',
    currency: 'EUR'
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await api.customers.list();
      setCustomers(data);
    } catch (err: any) {
      toast.error('Fehler beim Laden der Kunden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingCustomer(null);
    setFormData({
      name: '',
      address: '',
      taxId: '',
      billingModel: 'exclusive',
      dailyRate: '',
      currency: 'EUR'
    });
    setDialogOpen(true);
  }

  function openEditDialog(customer: Customer) {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      address: customer.address || '',
      taxId: customer.taxId || '',
      billingModel: customer.billingModel,
      dailyRate: customer.dailyRate.toString(),
      currency: customer.currency
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const customerData = {
        name: formData.name,
        address: formData.address || undefined,
        taxId: formData.taxId || undefined,
        billingModel: formData.billingModel,
        dailyRate: parseFloat(formData.dailyRate),
        currency: formData.currency
      };

      if (editingCustomer) {
        await api.customers.update(editingCustomer.id, customerData);
        toast.success('Kunde aktualisiert');
      } else {
        await api.customers.create(customerData);
        toast.success('Kunde erstellt');
      }
      
      setDialogOpen(false);
      loadCustomers();
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Möchten Sie diesen Kunden wirklich löschen?')) return;
    
    try {
      await api.customers.delete(id);
      toast.success('Kunde gelöscht');
      loadCustomers();
    } catch (err: any) {
      toast.error('Fehler beim Löschen: ' + err.message);
    }
  }

  async function handleArchive(id: number, isArchived: boolean) {
    try {
      if (isArchived) {
        await api.customers.unarchive(id);
        toast.success('Kunde wiederhergestellt');
      } else {
        await api.customers.archive(id);
        toast.success('Kunde archiviert');
      }
      loadCustomers();
    } catch (err: any) {
      toast.error('Fehler: ' + err.message);
    }
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchived = showArchived ? customer.isArchived === 1 : customer.isArchived === 0;
    return matchesSearch && matchesArchived;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kunden</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Neuer Kunde
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kunden suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showArchived ? "secondary" : "outline"}
          onClick={() => setShowArchived(!showArchived)}
        >
          <Archive className="h-4 w-4 mr-2" />
          {showArchived ? 'Archivierte' : 'Aktive'}
        </Button>
      </div>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Tagessatz</TableHead>
                <TableHead>Abrechnungsmodell</TableHead>
                <TableHead>Währung</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Laden...
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Keine Kunden gefunden
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        {customer.address && (
                          <p className="text-sm text-muted-foreground">{customer.address}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.dailyRate.toLocaleString('de-DE', { style: 'currency', currency: customer.currency })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.billingModel === 'exclusive' ? 'default' : 'secondary'}>
                        {customer.billingModel === 'exclusive' ? 'Exklusiv' : 'Inklusiv'}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.currency}</TableCell>
                    <TableCell>
                      <Badge variant={customer.isArchived ? 'outline' : 'default'}>
                        {customer.isArchived ? 'Archiviert' : 'Aktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(customer)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleArchive(customer.id, customer.isArchived === 1)}
                        >
                          {customer.isArchived ? (
                            <ArchiveRestore className="h-4 w-4" />
                          ) : (
                            <Archive className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(customer.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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
              {editingCustomer ? 'Kunde bearbeiten' : 'Neuer Kunde'}
            </DialogTitle>
            <DialogDescription>
              {editingCustomer ? 'Aktualisieren Sie die Kundendaten.' : 'Erstellen Sie einen neuen Kunden.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Steuernummer</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dailyRate">Tagessatz *</Label>
                  <Input
                    id="dailyRate"
                    type="number"
                    step="0.01"
                    value={formData.dailyRate}
                    onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Währung</Label>
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
                      <SelectItem value="CHF">CHF</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingModel">Abrechnungsmodell</Label>
                <Select
                  value={formData.billingModel}
                  onValueChange={(value: 'exclusive' | 'inclusive') => setFormData({ ...formData, billingModel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exclusive">Exklusiv (+ MwSt.)</SelectItem>
                    <SelectItem value="inclusive">Inklusiv (inkl. MwSt.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">
                {editingCustomer ? 'Speichern' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
