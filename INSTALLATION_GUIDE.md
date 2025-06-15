# Anleitung zur Installation und Anpassung der DÖRING Consulting Website

## Inhaltsverzeichnis
1. [Voraussetzungen](#voraussetzungen)
2. [Installation](#installation)
3. [Anpassung der Website](#anpassung-der-website)
4. [Deployment](#deployment)
5. [Wartung und Updates](#wartung-und-updates)
6. [Fehlerbehebung](#fehlerbehebung)

## Voraussetzungen

Um die DÖRING Consulting Website zu installieren und zu betreiben, benötigen Sie:

- Node.js (Version 16.x oder höher)
- npm (wird mit Node.js installiert)
- Ein Webhosting mit FTP-Zugang oder ein Server mit SSH-Zugang
- Grundlegende Kenntnisse in HTML, CSS und JavaScript (für Anpassungen)

## Installation

### Lokale Installation für Entwicklung

1. Entpacken Sie die ZIP-Datei in ein Verzeichnis Ihrer Wahl
2. Öffnen Sie ein Terminal/Kommandozeile und navigieren Sie zum entpackten Verzeichnis
3. Führen Sie den folgenden Befehl aus, um alle Abhängigkeiten zu installieren:

```bash
npm install
```

4. Starten Sie den Entwicklungsserver:

```bash
npm run dev
```

5. Die Website ist nun unter http://localhost:5173 (oder einem anderen Port, falls 5173 bereits belegt ist) verfügbar

### Vorbereitung für Produktion

1. Führen Sie den Build-Prozess aus, um optimierte Dateien für die Produktion zu erstellen:

```bash
npm run build
```

2. Die fertigen Dateien befinden sich im `dist`-Verzeichnis und können auf Ihren Webserver hochgeladen werden

## Anpassung der Website

### Struktur der Website

Die Website ist in folgende Hauptkomponenten unterteilt:

- `src/pages/`: Enthält alle Seiten der Website
- `src/components/`: Enthält wiederverwendbare Komponenten
- `src/lib/`: Enthält Hilfsfunktionen und Konfigurationen
- `src/i18n/`: Enthält die Übersetzungsdateien für Deutsch und Englisch
- `public/`: Enthält statische Dateien wie Bilder, Logos und Downloads

### Anpassung der Texte

Alle Texte der Website sind in den Übersetzungsdateien gespeichert:

- Deutsch: `src/i18n/locales/de.json`
- Englisch: `src/i18n/locales/en.json`

Um Texte zu ändern, öffnen Sie die entsprechende Datei und bearbeiten Sie die Werte (nicht die Schlüssel).

Beispiel:
```json
{
  "home": {
    "hero": {
      "title": "Strategische Beratung für Einkauf und Supply Chain",
      "subtitle": "Optimieren Sie Ihre Beschaffungsprozesse und steigern Sie die Effizienz Ihrer Lieferkette mit maßgeschneiderten Lösungen.",
      "cta": "Kontakt aufnehmen"
    }
  }
}
```

### Anpassung der Bilder

Um Bilder zu ersetzen:

1. Platzieren Sie neue Bilder im `public/images/`-Verzeichnis
2. Verwenden Sie den gleichen Dateinamen wie das zu ersetzende Bild oder
3. Aktualisieren Sie die Verweise in den Komponenten, wenn Sie einen anderen Dateinamen verwenden

### Anpassung des Logos

Das Logo befindet sich unter `public/Color logo - no background.svg`. Um es zu ersetzen, laden Sie einfach eine neue Datei mit demselben Namen hoch oder ändern Sie den Verweis in der `Header.tsx`-Komponente.

### Anpassung der Farben

Die Farbdefinitionen befinden sich in `src/lib/colors.ts`. Hier können Sie die Hauptfarben der Website anpassen:

```typescript
export const colors = {
  primary: '#00A0B0',  // Türkis
  secondary: '#6A4A3C', // Braun
  gold: '#D4AF37',     // Gold
  text: '#333333',     // Dunkelgrau für Text
  lightGray: '#F5F5F5', // Hellgrau für Hintergründe
  white: '#FFFFFF',    // Weiß
  black: '#000000',    // Schwarz
  paleGold: '#F5F1E0'  // Helles Gold
};
```

### Hinzufügen neuer Seiten

Um eine neue Seite hinzuzufügen:

1. Erstellen Sie eine neue Datei in `src/pages/`, z.B. `NeuePage.tsx`
2. Fügen Sie die Komponente zur Routenkonfiguration in `src/App.tsx` hinzu
3. Fügen Sie einen Link zur neuen Seite in der Navigation hinzu (`src/components/Header.tsx`)

### Anpassung der Partner-/Berater-Seite

Die Partner-/Berater-Seite ist so konzipiert, dass sie leicht erweitert werden kann:

1. Öffnen Sie `src/pages/PartnerPage.tsx`
2. Fügen Sie neue Partner zur `partners`-Array hinzu oder bearbeiten Sie bestehende Einträge
3. Jeder Partner hat folgende Eigenschaften:
   - `id`: Eindeutige ID
   - `name`: Name des Partners
   - `title`: Position/Titel
   - `image`: Pfad zum Profilbild
   - `description`: Beschreibung/Biografie
   - `expertise`: Array mit Fachgebieten (für die Filterfunktion)
   - `contact`: Kontaktinformationen

## Deployment

### Deployment auf einem Standard-Webhosting

1. Führen Sie `npm run build` aus, um die optimierten Dateien zu erstellen
2. Laden Sie den Inhalt des `dist`-Verzeichnisses auf Ihren Webserver hoch
3. Stellen Sie sicher, dass alle Anfragen an die `index.html` weitergeleitet werden (für die clientseitige Routing)

Für Apache-Server erstellen Sie eine `.htaccess`-Datei im Root-Verzeichnis mit folgendem Inhalt:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Für Nginx-Server fügen Sie folgende Konfiguration hinzu:

```
location / {
  try_files $uri $uri/ /index.html;
}
```

### Deployment auf einem Node.js-Server

Wenn Sie einen Node.js-Server verwenden möchten:

1. Installieren Sie `express`:

```bash
npm install express --save
```

2. Erstellen Sie eine `server.js`-Datei im Root-Verzeichnis:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

3. Starten Sie den Server:

```bash
node server.js
```

## Wartung und Updates

### Aktualisierung der Abhängigkeiten

Um die Abhängigkeiten zu aktualisieren:

```bash
npm update
```

Für größere Updates:

```bash
npm outdated
npm install [package-name]@latest
```

### Hinzufügen neuer Funktionen

Wenn Sie neue Funktionen hinzufügen möchten, empfehlen wir:

1. Erstellen Sie einen neuen Branch für die Entwicklung
2. Implementieren und testen Sie die Funktion lokal
3. Führen Sie einen Build durch und testen Sie die Produktionsversion
4. Deployen Sie die aktualisierte Version

## Fehlerbehebung

### Häufige Probleme

#### Die Website wird nicht korrekt angezeigt

- Überprüfen Sie, ob alle Dateien korrekt hochgeladen wurden
- Stellen Sie sicher, dass die Server-Konfiguration für das clientseitige Routing eingerichtet ist
- Löschen Sie den Browser-Cache

#### Bilder werden nicht angezeigt

- Überprüfen Sie, ob die Bilder im richtigen Verzeichnis liegen
- Stellen Sie sicher, dass die Pfade in den Komponenten korrekt sind
- Überprüfen Sie die Dateiberechtigungen auf dem Server

#### Kontaktformular funktioniert nicht

- Überprüfen Sie, ob die E-Mail-Adresse in der Konfiguration korrekt ist
- Stellen Sie sicher, dass der Server E-Mails senden kann
- Überprüfen Sie die Server-Logs auf Fehler

Bei weiteren Fragen oder Problemen stehen wir Ihnen gerne zur Verfügung.

---

© 2025 DÖRING Consulting | Alle Rechte vorbehalten
