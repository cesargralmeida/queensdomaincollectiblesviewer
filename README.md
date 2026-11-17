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

## Map gallery

Static maps with **every** collectible marked (not just missing ones), for browsing without a save file.
Each level has a top-down map and an isometric view at true heights. Labels match between the two:
`E` = Orbewa Egg, `S` = Silver Skull, `#` = Data Module number, followed by the item's height.
Teleporters and save points are marked too.

- [`gallery/top-down`](gallery/top-down): 28 level maps plus the stacked world view
- [`gallery/isometric`](gallery/isometric): 28 isometric level views
- [`gallery/thumbnails`](gallery/thumbnails): 400 px previews of the top-down set

| Preview | Map | Full size |
|---|---|---|
| <img src="gallery/thumbnails/00%20World%20-%20isometric%20-%20thumb.png" width="160" alt="World – isometric"> | World – isometric | [Top-down](gallery/top-down/00%20World%20-%20isometric.png) |
| <img src="gallery/thumbnails/01%20Isle%20of%20Neasied%20-%20Main%20island%20-%20thumb.png" width="160" alt="Isle of Neasied – Main island"> | Isle of Neasied – Main island | [Top-down](gallery/top-down/01%20Isle%20of%20Neasied%20-%20Main%20island.png) · [Isometric](gallery/isometric/01%20Isle%20of%20Neasied%20-%20Main%20island%20-%20isometric.png) |
| <img src="gallery/thumbnails/02%20Isle%20of%20Neasied%20-%20Outer%20isles%20-%20thumb.png" width="160" alt="Isle of Neasied – Outer isles"> | Isle of Neasied – Outer isles | [Top-down](gallery/top-down/02%20Isle%20of%20Neasied%20-%20Outer%20isles.png) · [Isometric](gallery/isometric/02%20Isle%20of%20Neasied%20-%20Outer%20isles%20-%20isometric.png) |
| <img src="gallery/thumbnails/03%20Isle%20of%20Neasied%20-%20Shop%20isle%20-%20thumb.png" width="160" alt="Isle of Neasied – Shop isle"> | Isle of Neasied – Shop isle | [Top-down](gallery/top-down/03%20Isle%20of%20Neasied%20-%20Shop%20isle.png) · [Isometric](gallery/isometric/03%20Isle%20of%20Neasied%20-%20Shop%20isle%20-%20isometric.png) |
| <img src="gallery/thumbnails/04%20Obmuer%20Temple%20-%20Temple%20-%20thumb.png" width="160" alt="Obmuer Temple – Temple"> | Obmuer Temple – Temple | [Top-down](gallery/top-down/04%20Obmuer%20Temple%20-%20Temple.png) · [Isometric](gallery/isometric/04%20Obmuer%20Temple%20-%20Temple%20-%20isometric.png) |
| <img src="gallery/thumbnails/05%20Obmuer%20Temple%20-%20Underground%20-%20thumb.png" width="160" alt="Obmuer Temple – Underground"> | Obmuer Temple – Underground | [Top-down](gallery/top-down/05%20Obmuer%20Temple%20-%20Underground.png) · [Isometric](gallery/isometric/05%20Obmuer%20Temple%20-%20Underground%20-%20isometric.png) |
| <img src="gallery/thumbnails/06%20Tower%20of%20Knowledge%20-%20Interior%20-%20thumb.png" width="160" alt="Tower of Knowledge – Interior"> | Tower of Knowledge – Interior | [Top-down](gallery/top-down/06%20Tower%20of%20Knowledge%20-%20Interior.png) · [Isometric](gallery/isometric/06%20Tower%20of%20Knowledge%20-%20Interior%20-%20isometric.png) |
| <img src="gallery/thumbnails/07%20Tower%20of%20Knowledge%20-%20Exterior%20-%20thumb.png" width="160" alt="Tower of Knowledge – Exterior"> | Tower of Knowledge – Exterior | [Top-down](gallery/top-down/07%20Tower%20of%20Knowledge%20-%20Exterior.png) · [Isometric](gallery/isometric/07%20Tower%20of%20Knowledge%20-%20Exterior%20-%20isometric.png) |
| <img src="gallery/thumbnails/08%20Tower%20of%20Knowledge%20-%20Basement%20-%20thumb.png" width="160" alt="Tower of Knowledge – Basement"> | Tower of Knowledge – Basement | [Top-down](gallery/top-down/08%20Tower%20of%20Knowledge%20-%20Basement.png) · [Isometric](gallery/isometric/08%20Tower%20of%20Knowledge%20-%20Basement%20-%20isometric.png) |
| <img src="gallery/thumbnails/09%20Deimpo%20Mausoleum%20-%20Entrance%20-%20thumb.png" width="160" alt="Deimpo Mausoleum – Entrance"> | Deimpo Mausoleum – Entrance | [Top-down](gallery/top-down/09%20Deimpo%20Mausoleum%20-%20Entrance.png) · [Isometric](gallery/isometric/09%20Deimpo%20Mausoleum%20-%20Entrance%20-%20isometric.png) |
| <img src="gallery/thumbnails/10%20Deimpo%20Mausoleum%20-%20Middle%20-%20thumb.png" width="160" alt="Deimpo Mausoleum – Middle"> | Deimpo Mausoleum – Middle | [Top-down](gallery/top-down/10%20Deimpo%20Mausoleum%20-%20Middle.png) · [Isometric](gallery/isometric/10%20Deimpo%20Mausoleum%20-%20Middle%20-%20isometric.png) |
| <img src="gallery/thumbnails/11%20Deimpo%20Mausoleum%20-%20Dark%20maze%20-%20thumb.png" width="160" alt="Deimpo Mausoleum – Dark maze"> | Deimpo Mausoleum – Dark maze | [Top-down](gallery/top-down/11%20Deimpo%20Mausoleum%20-%20Dark%20maze.png) · [Isometric](gallery/isometric/11%20Deimpo%20Mausoleum%20-%20Dark%20maze%20-%20isometric.png) |
| <img src="gallery/thumbnails/12%20Hidden%20zones%20-%20Below%20the%20Isle%20-%20thumb.png" width="160" alt="Hidden zones – Below the Isle"> | Hidden zones – Below the Isle | [Top-down](gallery/top-down/12%20Hidden%20zones%20-%20Below%20the%20Isle.png) · [Isometric](gallery/isometric/12%20Hidden%20zones%20-%20Below%20the%20Isle%20-%20isometric.png) |
| <img src="gallery/thumbnails/13%20Hidden%20zones%20-%20Off%20Obmuer%20Temple%20-%20thumb.png" width="160" alt="Hidden zones – Off Obmuer Temple"> | Hidden zones – Off Obmuer Temple | [Top-down](gallery/top-down/13%20Hidden%20zones%20-%20Off%20Obmuer%20Temple.png) · [Isometric](gallery/isometric/13%20Hidden%20zones%20-%20Off%20Obmuer%20Temple%20-%20isometric.png) |
| <img src="gallery/thumbnails/14%20Hidden%20zones%20-%20Off%20the%20Tower%20-%20thumb.png" width="160" alt="Hidden zones – Off the Tower"> | Hidden zones – Off the Tower | [Top-down](gallery/top-down/14%20Hidden%20zones%20-%20Off%20the%20Tower.png) · [Isometric](gallery/isometric/14%20Hidden%20zones%20-%20Off%20the%20Tower%20-%20isometric.png) |
| <img src="gallery/thumbnails/15%20Hidden%20zones%20-%20Shrine%20hall%20-%20thumb.png" width="160" alt="Hidden zones – Shrine hall"> | Hidden zones – Shrine hall | [Top-down](gallery/top-down/15%20Hidden%20zones%20-%20Shrine%20hall.png) · [Isometric](gallery/isometric/15%20Hidden%20zones%20-%20Shrine%20hall%20-%20isometric.png) |
| <img src="gallery/thumbnails/16%20Hidden%20zones%20-%20Off%20the%20Mausoleum%20-%20thumb.png" width="160" alt="Hidden zones – Off the Mausoleum"> | Hidden zones – Off the Mausoleum | [Top-down](gallery/top-down/16%20Hidden%20zones%20-%20Off%20the%20Mausoleum.png) · [Isometric](gallery/isometric/16%20Hidden%20zones%20-%20Off%20the%20Mausoleum%20-%20isometric.png) |
| <img src="gallery/thumbnails/17%20Forgotten%20Dungeon%20-%20Dungeon%20-%20thumb.png" width="160" alt="Forgotten Dungeon – Dungeon"> | Forgotten Dungeon – Dungeon | [Top-down](gallery/top-down/17%20Forgotten%20Dungeon%20-%20Dungeon.png) · [Isometric](gallery/isometric/17%20Forgotten%20Dungeon%20-%20Dungeon%20-%20isometric.png) |
| <img src="gallery/thumbnails/18%20Verdant%20Hollow%20-%20Jigeki%20Temple%20-%20thumb.png" width="160" alt="Verdant Hollow – Jigeki Temple"> | Verdant Hollow – Jigeki Temple | [Top-down](gallery/top-down/18%20Verdant%20Hollow%20-%20Jigeki%20Temple.png) · [Isometric](gallery/isometric/18%20Verdant%20Hollow%20-%20Jigeki%20Temple%20-%20isometric.png) |
| <img src="gallery/thumbnails/19%20Verdant%20Hollow%20-%20Hollow%20-%20thumb.png" width="160" alt="Verdant Hollow – Hollow"> | Verdant Hollow – Hollow | [Top-down](gallery/top-down/19%20Verdant%20Hollow%20-%20Hollow.png) · [Isometric](gallery/isometric/19%20Verdant%20Hollow%20-%20Hollow%20-%20isometric.png) |
| <img src="gallery/thumbnails/20%20Rotting%20Cavern%20-%20Cavern%20-%20thumb.png" width="160" alt="Rotting Cavern – Cavern"> | Rotting Cavern – Cavern | [Top-down](gallery/top-down/20%20Rotting%20Cavern%20-%20Cavern.png) · [Isometric](gallery/isometric/20%20Rotting%20Cavern%20-%20Cavern%20-%20isometric.png) |
| <img src="gallery/thumbnails/21%20Petrified%20Garden%20-%20Garden%20-%20thumb.png" width="160" alt="Petrified Garden – Garden"> | Petrified Garden – Garden | [Top-down](gallery/top-down/21%20Petrified%20Garden%20-%20Garden.png) · [Isometric](gallery/isometric/21%20Petrified%20Garden%20-%20Garden%20-%20isometric.png) |
| <img src="gallery/thumbnails/22%20Record%20of%20Sin%20-%20Dekanima%20-%20thumb.png" width="160" alt="Record of Sin – Dekanima"> | Record of Sin – Dekanima | [Top-down](gallery/top-down/22%20Record%20of%20Sin%20-%20Dekanima.png) · [Isometric](gallery/isometric/22%20Record%20of%20Sin%20-%20Dekanima%20-%20isometric.png) |
| <img src="gallery/thumbnails/23%20Record%20of%20Sin%20-%20Record%20of%20Sin%20-%20thumb.png" width="160" alt="Record of Sin – Record of Sin"> | Record of Sin – Record of Sin | [Top-down](gallery/top-down/23%20Record%20of%20Sin%20-%20Record%20of%20Sin.png) · [Isometric](gallery/isometric/23%20Record%20of%20Sin%20-%20Record%20of%20Sin%20-%20isometric.png) |
| <img src="gallery/thumbnails/24%20Ancient%20World%20-%20Main%20-%20thumb.png" width="160" alt="Ancient World – Main"> | Ancient World – Main | [Top-down](gallery/top-down/24%20Ancient%20World%20-%20Main.png) · [Isometric](gallery/isometric/24%20Ancient%20World%20-%20Main%20-%20isometric.png) |
| <img src="gallery/thumbnails/25%20Ancient%20World%20-%20Drop%20tunnel%20-%20thumb.png" width="160" alt="Ancient World – Drop tunnel"> | Ancient World – Drop tunnel | [Top-down](gallery/top-down/25%20Ancient%20World%20-%20Drop%20tunnel.png) · [Isometric](gallery/isometric/25%20Ancient%20World%20-%20Drop%20tunnel%20-%20isometric.png) |
| <img src="gallery/thumbnails/26%20Siraatsu%20Castle%20-%20Interior%20-%20thumb.png" width="160" alt="Siraatsu Castle – Interior"> | Siraatsu Castle – Interior | [Top-down](gallery/top-down/26%20Siraatsu%20Castle%20-%20Interior.png) · [Isometric](gallery/isometric/26%20Siraatsu%20Castle%20-%20Interior%20-%20isometric.png) |
| <img src="gallery/thumbnails/27%20Siraatsu%20Castle%20-%20Exterior%20-%20thumb.png" width="160" alt="Siraatsu Castle – Exterior"> | Siraatsu Castle – Exterior | [Top-down](gallery/top-down/27%20Siraatsu%20Castle%20-%20Exterior.png) · [Isometric](gallery/isometric/27%20Siraatsu%20Castle%20-%20Exterior%20-%20isometric.png) |
| <img src="gallery/thumbnails/28%20Final%20zone%20-%20Skull%20door%20-%20thumb.png" width="160" alt="Final zone – Skull door"> | Final zone – Skull door | [Top-down](gallery/top-down/28%20Final%20zone%20-%20Skull%20door.png) · [Isometric](gallery/isometric/28%20Final%20zone%20-%20Skull%20door%20-%20isometric.png) |

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
