# Übersicht der Website-Dateien und Struktur

## Hauptverzeichnisse

- `src/`: Enthält den Quellcode der Website
  - `components/`: Wiederverwendbare UI-Komponenten
  - `pages/`: Alle Seiten der Website
  - `lib/`: Hilfsfunktionen und Konfigurationen
  - `i18n/`: Übersetzungsdateien für Mehrsprachigkeit
  - `data/`: Datendateien für die Website
  - `hooks/`: React Hooks für wiederverwendbare Logik
- `public/`: Statische Dateien wie Bilder, Logos und Downloads
- `dist/`: Kompilierte und optimierte Dateien für die Produktion (wird beim Build erstellt)

## Wichtige Dateien

### Konfigurationsdateien
- `package.json`: Projektabhängigkeiten und Skripte
- `tsconfig.json`: TypeScript-Konfiguration
- `vite.config.ts`: Vite-Bundler-Konfiguration

### Hauptdateien
- `src/index.tsx`: Einstiegspunkt der Anwendung
- `src/App.tsx`: Hauptkomponente mit Routing-Konfiguration
- `src/index.css`: Globale CSS-Stile

### Komponenten
- `src/components/Header.tsx`: Navigationsleiste mit Logo und Menü
- `src/components/Footer.tsx`: Fußzeile mit Links und Copyright
- `src/components/LanguageSwitcher.tsx`: Sprachumschalter für Deutsch/Englisch

### Seiten
- `src/pages/HomePage.tsx`: Startseite mit Hero-Bereich und Fachgebieten
- `src/pages/UeberMichPage.tsx`: Über-Mich-Seite mit Biografie und Karriere
- `src/pages/FachgebieteOverview.tsx`: Übersicht der Beratungsbereiche
- `src/pages/ErfolgsgeschichtenPage.tsx`: Erfolgsgeschichten und Fallstudien
- `src/pages/BlogPage.tsx`: Blog-Bereich für Fachbeiträge
- `src/pages/PartnerPage.tsx`: Partner- und Berater-Vorstellungen
- `src/pages/DownloadsPage.tsx`: Download-Bereich für CV und Materialien
- `src/pages/KontaktPage.tsx`: Kontaktformular und Kontaktdaten
- `src/pages/ImpressumPage.tsx`: Impressum mit rechtlichen Informationen
- `src/pages/DatenschutzPage.tsx`: Datenschutzerklärung

### Mehrsprachigkeit
- `src/i18n/i18n.ts`: Konfiguration der Mehrsprachigkeit
- `src/i18n/locales/de.json`: Deutsche Übersetzungen
- `src/i18n/locales/en.json`: Englische Übersetzungen

### Design und Theming
- `src/lib/colors.ts`: Farbdefinitionen
- `src/lib/theme.ts`: Theme-Konfiguration
- `src/lib/theme-context.tsx`: Theme-Context für die Anwendung

## Anpassung der Website

Die Website kann auf verschiedene Weise angepasst werden:

1. **Texte ändern**: Bearbeiten Sie die Übersetzungsdateien in `src/i18n/locales/`
2. **Bilder ersetzen**: Ersetzen Sie Dateien im `public/images/`-Verzeichnis
3. **Farben anpassen**: Ändern Sie die Farbdefinitionen in `src/lib/colors.ts`
4. **Neue Seiten hinzufügen**: Erstellen Sie neue Dateien in `src/pages/` und aktualisieren Sie die Routing-Konfiguration in `src/App.tsx`
5. **Partner hinzufügen**: Bearbeiten Sie die Partner-Daten in `src/pages/PartnerPage.tsx`

Weitere Details finden Sie in der INSTALLATION_GUIDE.md.
