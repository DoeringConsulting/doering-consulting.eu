import React, { useEffect, useState } from 'react';
import { api } from '@/lib/electron-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  FolderOpen, 
  HardDrive,
  AlertTriangle,
  Check
} from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

interface BackupFile {
  name: string;
  path?: string;
  date: Date;
  size: number;
}

export default function Backup() {
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [dataPath, setDataPath] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupFile | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [backupsData, pathData] = await Promise.all([
        api.backup.list(),
        api.settings.getDataPath()
      ]);
      setBackups(backupsData);
      setDataPath(pathData);
    } catch (err: any) {
      toast.error('Fehler beim Laden: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createBackup() {
    try {
      setCreating(true);
      const backupPath = await api.backup.create();
      toast.success('Backup erstellt: ' + backupPath);
      loadData();
    } catch (err: any) {
      toast.error('Fehler beim Erstellen: ' + err.message);
    } finally {
      setCreating(false);
    }
  }

  async function exportData() {
    try {
      setExporting(true);
      const exportPath = await api.backup.exportData();
      toast.success('Daten exportiert: ' + exportPath);
    } catch (err: any) {
      toast.error('Fehler beim Export: ' + err.message);
    } finally {
      setExporting(false);
    }
  }

  function openRestoreDialog(backup: BackupFile) {
    setSelectedBackup(backup);
    setRestoreDialogOpen(true);
  }

  async function restoreBackup() {
    if (!selectedBackup) return;
    
    try {
      await api.backup.restore(selectedBackup.path);
      toast.success('Backup wiederhergestellt. Die Anwendung muss neu gestartet werden.');
      setRestoreDialogOpen(false);
    } catch (err: any) {
      toast.error('Fehler beim Wiederherstellen: ' + err.message);
    }
  }

  async function openDataFolder() {
    try {
      await api.files.openFolder(dataPath);
    } catch (err: any) {
      toast.error('Fehler beim Öffnen: ' + err.message);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Backup & Datenverwaltung</h1>
      </div>

      {/* Data Path Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Datenordner
          </CardTitle>
          <CardDescription>
            Alle Daten werden in diesem Ordner gespeichert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <code className="flex-1 bg-muted p-3 rounded-lg text-sm font-mono">
              {dataPath || 'Nicht konfiguriert'}
            </code>
            <Button variant="outline" onClick={openDataFolder}>
              <FolderOpen className="h-4 w-4 mr-2" />
              Öffnen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4" />
              Datenbank-Backup
            </CardTitle>
            <CardDescription>
              Erstellt eine Kopie der SQLite-Datenbank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={createBackup} disabled={creating} className="w-full">
              {creating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Backup erstellen
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-4 w-4" />
              Daten-Export
            </CardTitle>
            <CardDescription>
              Exportiert alle Daten als JSON-Datei
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={exportData} disabled={exporting} variant="outline" className="w-full">
              {exporting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Als JSON exportieren
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Backup List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Verfügbare Backups</CardTitle>
          <CardDescription>
            Automatische Backups werden täglich erstellt. Die letzten 30 Backups werden aufbewahrt.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dateiname</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead className="text-right">Größe</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">Laden...</TableCell>
                </TableRow>
              ) : backups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Keine Backups vorhanden
                  </TableCell>
                </TableRow>
              ) : (
                backups.map((backup) => (
                  <TableRow key={backup.name}>
                    <TableCell className="font-mono text-sm">{backup.name}</TableCell>
                    <TableCell>
                      {format(new Date(backup.date), 'dd.MM.yyyy HH:mm', { locale: de })}
                    </TableCell>
                    <TableCell className="text-right">{formatFileSize(backup.size)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openRestoreDialog(backup)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Wiederherstellen
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Wichtige Hinweise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
              <span>Backups werden automatisch täglich beim Start der Anwendung erstellt</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
              <span>Wenn Sie OneDrive als Datenordner verwenden, werden Ihre Daten automatisch in die Cloud synchronisiert</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
              <span>Vor der Wiederherstellung eines Backups wird automatisch ein Sicherheits-Backup erstellt</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 text-orange-500 shrink-0" />
              <span>Nach der Wiederherstellung muss die Anwendung neu gestartet werden</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Restore Dialog */}
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Backup wiederherstellen?</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie das Backup "{selectedBackup?.name}" wiederherstellen?
              <br /><br />
              <strong className="text-destructive">Achtung:</strong> Alle aktuellen Daten werden durch die Daten aus dem Backup ersetzt. 
              Ein Sicherheits-Backup der aktuellen Daten wird automatisch erstellt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={restoreBackup}>
              Wiederherstellen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
