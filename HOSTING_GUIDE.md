# Anleitung zum Hosten und Anpassen der DÖRING Consulting Website

Diese Anleitung beschreibt, wie Sie die DÖRING Consulting Website auf Ihrem eigenen Server hosten und die Inhalte anpassen können.

## Inhaltsverzeichnis

1. [Voraussetzungen](#voraussetzungen)
2. [Quellcode herunterladen](#quellcode-herunterladen)
3. [Inhalte anpassen](#inhalte-anpassen)
4. [Website bauen](#website-bauen)
5. [Website auf eigenem Server hosten](#website-auf-eigenem-server-hosten)
6. [Wartung und Updates](#wartung-und-updates)

## Voraussetzungen

Um die Website zu bearbeiten und zu hosten, benötigen Sie:

- Einen Webserver mit HTTP-Unterstützung (z.B. Apache, Nginx)
- Node.js (Version 16 oder höher) und npm für die Entwicklung
- Grundlegende Kenntnisse in HTML, CSS und JavaScript/TypeScript
- FTP-Client oder SSH-Zugang zu Ihrem Server

## Quellcode herunterladen

Der Quellcode der Website befindet sich im Verzeichnis `/home/ubuntu/doering-consulting`. Sie können den gesamten Quellcode als ZIP-Datei herunterladen und auf Ihrem lokalen Computer entpacken.

## Inhalte anpassen

### Textinhalte und Adressen ändern

Die meisten Inhalte der Website befinden sich in den folgenden Dateien:

1. **Karrieredaten und Ausbildung**:
   - Datei: `/src/data/careerData.ts`
   - Hier können Sie Ihre beruflichen Stationen, Ausbildung, Zertifizierungen und Kompetenzen anpassen.

2. **Über-Mich-Seite**:
   - Datei: `/src/pages/UeberMichPage.tsx`
   - Hier können Sie die persönliche Beschreibung und andere Informationen über Sie anpassen.

3. **Fachgebiete**:
   - Datei: `/src/pages/FachgebieteOverview.tsx`
   - Hier können Sie die Beschreibungen Ihrer Fachgebiete anpassen.

4. **Kontaktinformationen**:
   - Datei: `/src/pages/KontaktPage.tsx`
   - Hier können Sie Ihre Kontaktdaten und das Kontaktformular anpassen.

5. **Startseite**:
   - Datei: `/src/pages/HomePage.tsx`
   - Hier können Sie die Inhalte der Startseite anpassen.

### Bilder ändern

Bilder befinden sich im Verzeichnis `/public/images/`. Um ein Bild zu ersetzen:

1. Laden Sie Ihr neues Bild in das Verzeichnis `/public/images/` hoch
2. Aktualisieren Sie die Bildverweise in den entsprechenden Dateien (z.B. in den oben genannten TSX-Dateien)

### Logo ändern

Das Logo befindet sich in der Datei `/public/Color logo - no background.svg`. Um das Logo zu ändern, ersetzen Sie diese Datei mit Ihrem eigenen Logo (behalten Sie den gleichen Dateinamen bei).

### Farben und Design anpassen

Die Farbdefinitionen befinden sich in:

- `/src/lib/colors.ts` - Grundlegende Farbdefinitionen
- `/src/lib/theme.ts` - Themendefinitionen für die gesamte Website

## Website bauen

Nachdem Sie Änderungen vorgenommen haben, müssen Sie die Website neu bauen:

1. Öffnen Sie ein Terminal/Kommandozeile
2. Navigieren Sie zum Projektverzeichnis: `cd pfad/zu/doering-consulting`
3. Installieren Sie die Abhängigkeiten (nur beim ersten Mal): `npm install`
4. Bauen Sie die Website: `npm run build`

Dies erstellt eine optimierte Version der Website im Verzeichnis `dist/`.

## Website auf eigenem Server hosten

### Option 1: Statisches Hosting (empfohlen)

Da es sich um eine statische Website handelt, können Sie sie einfach auf jedem Webserver hosten:

1. Kopieren Sie den Inhalt des `dist/`-Verzeichnisses auf Ihren Webserver
   - Per FTP: Verbinden Sie sich mit Ihrem Server und laden Sie die Dateien in das Webroot-Verzeichnis hoch
   - Per SSH: `scp -r dist/* benutzer@ihr-server:/pfad/zum/webroot/`

2. Konfigurieren Sie Ihren Webserver:
   - Apache: Stellen Sie sicher, dass `.htaccess` aktiviert ist
   - Nginx: Konfigurieren Sie URL-Rewriting für Single-Page-Applications

Beispiel Nginx-Konfiguration:
```nginx
server {
    listen 80;
    server_name ihre-domain.de www.ihre-domain.de;
    root /pfad/zum/webroot;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 2: Node.js-Server (für erweiterte Funktionen)

Wenn Sie serverseitige Funktionen benötigen (z.B. für das Kontaktformular):

1. Installieren Sie Node.js auf Ihrem Server
2. Kopieren Sie das gesamte Projektverzeichnis auf Ihren Server
3. Installieren Sie die Abhängigkeiten: `npm install`
4. Installieren Sie PM2 für die Prozessverwaltung: `npm install -g pm2`
5. Starten Sie den Server: `pm2 start npm -- start`

## Wartung und Updates

### Regelmäßige Backups

Erstellen Sie regelmäßig Backups Ihrer angepassten Website:

```bash
tar -czvf doering-website-backup-$(date +%Y%m%d).tar.gz /pfad/zum/webroot
```

### Updates und Sicherheit

- Halten Sie Ihren Webserver und Node.js aktuell
- Überprüfen Sie regelmäßig die Abhängigkeiten auf Sicherheitsupdates: `npm audit`
- Aktualisieren Sie bei Bedarf die Abhängigkeiten: `npm update`

## Häufige Anpassungen

### E-Mail-Adresse für das Kontaktformular ändern

1. Öffnen Sie die Datei `/src/pages/KontaktPage.tsx`
2. Suchen Sie nach `office@doering-consulting.eu`
3. Ersetzen Sie diese E-Mail-Adresse durch Ihre eigene

### Neue Karrierestation hinzufügen

1. Öffnen Sie die Datei `/src/data/careerData.ts`
2. Fügen Sie einen neuen Eintrag zum `careerData`-Array hinzu:

```typescript
{
  period: "01/2025 - Heute",
  title: "Neue Position",
  company: "Neues Unternehmen",
  industry: "Branche",
  description: "Beschreibung der Tätigkeit und Verantwortungsbereiche.",
  volume: "Beschaffungsvolumen"
}
```

### Neue Ausbildung oder Zertifizierung hinzufügen

1. Öffnen Sie die Datei `/src/data/careerData.ts`
2. Fügen Sie einen neuen Eintrag zum `educationData`- oder `certificationData`-Array hinzu

## Fehlerbehebung

### Problem: Website wird nicht korrekt angezeigt

- Überprüfen Sie die Browser-Konsole auf JavaScript-Fehler
- Stellen Sie sicher, dass alle Dateien korrekt hochgeladen wurden
- Überprüfen Sie die Webserver-Konfiguration für URL-Rewriting

### Problem: Kontaktformular funktioniert nicht

- Überprüfen Sie die E-Mail-Konfiguration auf Ihrem Server
- Stellen Sie sicher, dass der Webserver Zugriff auf den SMTP-Server hat

Bei weiteren Fragen oder Problemen können Sie sich an einen Webentwickler wenden oder die React-Dokumentation konsultieren.
