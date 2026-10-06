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

Hinzugefügte Bilder bleiben nur bis zum Neuladen der Seite erhalten. Sie werden nirgendwohin
hochgeladen, sondern nur lokal im Browser angezeigt.

Kopierte Links zeigen auf den jeweiligen Beitrag (`index.html#post-…`) und springen beim
Öffnen direkt dorthin.
