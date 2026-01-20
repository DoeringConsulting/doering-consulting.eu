import React, { useEffect, useState } from 'react';
import { api, TaxSetting } from '@/lib/electron-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calculator, Save, Info } from 'lucide-react';
import { toast } from 'sonner';

const TAX_TYPES = [
  { 
    value: 'zus', 
    label: 'ZUS (Sozialversicherung)', 
    description: 'Monatliche ZUS-Beiträge für Selbstständige in Polen',
    defaultValue: 1600.32,
    defaultType: 'fixed' as const
  },
  { 
    value: 'health_insurance', 
    label: 'Krankenversicherung (NFZ)', 
    description: 'Zusätzliche Krankenversicherungsbeiträge',
    defaultValue: 381.78,
    defaultType: 'fixed' as const
  },
  { 
    value: 'income_tax', 
    label: 'Einkommensteuer (PIT)', 
    description: 'Einkommensteuer auf Gewinne (Flat Tax oder progressive)',
    defaultValue: 12,
    defaultType: 'percentage' as const
  }
];

export default function TaxSettings() {
  const [settings, setSettings] = useState<TaxSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state for each tax type
  const [formData, setFormData] = useState<Record<string, { calculationType: string; value: string }>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await api.taxSettings.list();
      setSettings(data);
      
      // Initialize form data
      const newFormData: Record<string, { calculationType: string; value: string }> = {};
      for (const taxType of TAX_TYPES) {
        const existing = data.find(s => s.taxType === taxType.value);
        if (existing) {
          newFormData[taxType.value] = {
            calculationType: existing.calculationType,
            value: existing.value.toString()
          };
        } else {
          newFormData[taxType.value] = {
            calculationType: taxType.defaultType,
            value: taxType.defaultValue.toString()
          };
        }
      }
      setFormData(newFormData);
    } catch (err: any) {
      toast.error('Fehler beim Laden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(taxType: string) {
    try {
      setSaving(true);
      const data = formData[taxType];
      
      await api.taxSettings.upsert({
        taxType,
        calculationType: data.calculationType as 'percentage' | 'fixed',
        value: parseFloat(data.value)
      });
      
      toast.success('Einstellung gespeichert');
      loadSettings();
    } catch (err: any) {
      toast.error('Fehler beim Speichern: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveAll() {
    try {
      setSaving(true);
      
      for (const taxType of TAX_TYPES) {
        const data = formData[taxType.value];
        await api.taxSettings.upsert({
          taxType: taxType.value,
          calculationType: data.calculationType as 'percentage' | 'fixed',
          value: parseFloat(data.value)
        });
      }
      
      toast.success('Alle Einstellungen gespeichert');
      loadSettings();
    } catch (err: any) {
      toast.error('Fehler beim Speichern: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  function updateFormData(taxType: string, field: 'calculationType' | 'value', value: string) {
    setFormData(prev => ({
      ...prev,
      [taxType]: {
        ...prev[taxType],
        [field]: value
      }
    }));
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Steuereinstellungen</h1>
        <div className="text-center py-12">Laden...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Steuereinstellungen</h1>
        <Button onClick={handleSaveAll} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          Alle speichern
        </Button>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4" />
            Polnisches Steuersystem
          </CardTitle>
          <CardDescription>
            Diese Einstellungen werden für die Berechnung der monatlichen Steuerbelastung verwendet.
            Sie können zwischen einem festen Betrag pro Monat oder einem Prozentsatz vom Gewinn wählen.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tax Settings Cards */}
      <div className="grid gap-6">
        {TAX_TYPES.map((taxType) => {
          const data = formData[taxType.value] || { calculationType: 'fixed', value: '0' };
          const existing = settings.find(s => s.taxType === taxType.value);
          
          return (
            <Card key={taxType.value}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {taxType.label}
                </CardTitle>
                <CardDescription>{taxType.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-end">
                  <div className="space-y-2 flex-1">
                    <Label>Berechnungsart</Label>
                    <Select
                      value={data.calculationType}
                      onValueChange={(value) => updateFormData(taxType.value, 'calculationType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fester Betrag (PLN/Monat)</SelectItem>
                        <SelectItem value="percentage">Prozentsatz (%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>
                      {data.calculationType === 'fixed' ? 'Betrag (PLN)' : 'Prozentsatz (%)'}
                    </Label>
                    <Input
                      type="number"
                      step={data.calculationType === 'fixed' ? '0.01' : '0.1'}
                      value={data.value}
                      onChange={(e) => updateFormData(taxType.value, 'value', e.target.value)}
                    />
                  </div>
                  <Button onClick={() => handleSave(taxType.value)} disabled={saving}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
                {existing && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Zuletzt aktualisiert: {new Date(existing.updatedAt).toLocaleString('de-DE')}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Example Calculation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Beispielrechnung</CardTitle>
          <CardDescription>
            Basierend auf den aktuellen Einstellungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Angenommener Monatsumsatz:</div>
              <div className="font-medium">40.000 PLN</div>
              
              <div>Angenommene Ausgaben:</div>
              <div className="font-medium">5.000 PLN</div>
              
              <div className="border-t pt-2">Gewinn vor Steuern:</div>
              <div className="font-medium border-t pt-2">35.000 PLN</div>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              {TAX_TYPES.map((taxType) => {
                const data = formData[taxType.value];
                const value = parseFloat(data?.value || '0');
                const calculationType = data?.calculationType || 'fixed';
                
                let amount = 0;
                if (calculationType === 'fixed') {
                  amount = value;
                } else {
                  // Simplified calculation
                  amount = 35000 * (value / 100);
                }
                
                return (
                  <div key={taxType.value} className="flex justify-between text-sm">
                    <span>{taxType.label}:</span>
                    <span className="font-medium">
                      {amount.toLocaleString('de-DE', { style: 'currency', currency: 'PLN' })}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Geschätzter Nettogewinn:</span>
                <span>
                  {(() => {
                    let total = 35000;
                    for (const taxType of TAX_TYPES) {
                      const data = formData[taxType.value];
                      const value = parseFloat(data?.value || '0');
                      const calculationType = data?.calculationType || 'fixed';
                      
                      if (calculationType === 'fixed') {
                        total -= value;
                      } else {
                        total -= 35000 * (value / 100);
                      }
                    }
                    return total.toLocaleString('de-DE', { style: 'currency', currency: 'PLN' });
                  })()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
