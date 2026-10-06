# Feed-Simulation

Eigenständiges Mockup eines mobilen Social-Media-Feeds mit den vier Motiven der Kampagne zur
Mehrfachverplanung im Zivil- und Katastrophenschutz. Reines HTML, CSS und JavaScript, ohne
Framework und ohne Build-Schritt. Die Seite ist eine visuelle Simulation und keine echte
Instagram-Seite.

## Starten

`index.html` direkt im Browser öffnen. Ein lokaler Server ist nicht nötig.

## Dateien

```
index.html   Grundgerüst, Kopfzeile, Navigation, Templates für Beitrag und Kommentar
styles.css   Layout (Smartphone-Rahmen ab 520 px, Vollbild darunter) und Komponenten
script.js    Inhalte (Accountname, Begleittext, Beiträge, Kommentare) und Interaktionen
images/      Die Kampagnenmotive, unverändert übernommen
```

Accountname, Begleittext, Like-Zahlen und Beispielkommentare stehen oben in `script.js` und
lassen sich dort anpassen.

## Interaktionen

- Herz oder Doppeltippen auf das Bild: Gefällt mir, Zähler ändert sich
- Lesezeichen: Speichern, erscheint im Profil-Panel
- Sprechblase: springt zum Kommentarfeld, eigene Kommentare lassen sich posten
- Papierflieger: Teilen-Panel mit Kontaktauswahl und „Link kopieren“
- Drei Punkte: Beitrag melden, Link kopieren, Weniger Beiträge wie diesen (mit Rückgängig)
- Kopfzeile: Suche nach Accounts und Hashtags im Feed, Benachrichtigungen, Profil
- Plus in der unteren Navigation: neue Bilder auswählen oder hineinziehen, optional mit
  Bildbeschreibung und eigenem Text statt des Kampagnen-Begleittexts. Jedes Bild wird ein eigener
  Beitrag oben im Feed, mit Like, Kommentaren, Speichern, Teilen und Menü wie die übrigen.
- Untere Navigation: Home scrollt nach oben, Suche und Profil öffnen die Panels

- Drei Punkte bei eigenen Beiträgen: Beitrag löschen (statt „Beitrag melden“)
- Profil-Panel: eigene Beiträge als JSON-Datei exportieren und wieder importieren

## Speicherung

Eigene Beiträge (mit Bild, Text und Bildbeschreibung) sowie Likes, Speichern-Markierungen und
Kommentare aller Beiträge werden im Browser gespeichert (IndexedDB, Datenbank `feed-simulation`)
und sind nach dem Neuladen wieder da. Es wird nichts an einen Server übertragen.

- Die Daten gelten nur für diesen Browser auf diesem Gerät. Wer die Browserdaten löscht oder in
  einem privaten Fenster arbeitet, verliert sie.
- Über Export und Import im Profil-Panel lassen sich eigene Beiträge sichern oder auf einen
  anderen Rechner übertragen. Die Exportdatei enthält die Bilder eingebettet.
- Bietet der Browser kein IndexedDB, funktioniert die Seite weiter, eigene Beiträge gehen dann
  aber beim Neuladen verloren. Das Profil-Panel weist darauf hin.

Kopierte Links zeigen auf den jeweiligen Beitrag (`index.html#post-…`) und springen beim
Öffnen direkt dorthin.
