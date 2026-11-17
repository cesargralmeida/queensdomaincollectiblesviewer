# Queen's Domain – Missing Collectibles Finder

A static web page that reads a Queen's Domain `World0.sav` in the browser and shows which
Orbewa Eggs (50), Silver Skulls (69) and Data Modules (10) haven't been collected yet,
pinned on top-down maps of each level and on an isometric overview of the whole world.

The save file never leaves the browser; there is no server code.

## Publish on GitHub Pages

1. Create a new GitHub repository and upload everything in this folder
   (`index.html`, `qd.js`, `.nojekyll`, `README.md` and the `maps/` folder).
2. In the repository go to **Settings → Pages**, set **Source** to *Deploy from a branch*,
   pick the `main` branch and the `/ (root)` folder, and save.
3. After a minute the page is live at `https://<your-user>.github.io/<repo-name>/`.

You can also just open `index.html` locally in a browser; it works without a server.

## How it works

Every collectible placed in the game has a unique save ID (GUID). When you pick one up,
the game records that ID in `World0.sav`'s `SavableActorStates` map. The page searches the
save for all 129 IDs; IDs that aren't recorded are items you still need. It also reads a few
counters (eggs delivered to Erma, skulls turned in or carried, data modules given to Ossi).

The IDs, positions and maps were extracted from the game's level files. Maps show only
floors and ledges, coloured by height; where floors overlap, the higher one is drawn on top.

`qd.js` holds the save-reading logic and also works in Node:
`const QD = require('./qd.js'); QD.analyze(bytes, items)`.

Fan-made tool, not affiliated with the developers of Queen's Domain.
