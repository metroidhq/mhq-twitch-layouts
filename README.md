# MHQthon 2018 Layouts

Layouts for MHQthon 2018.

## Getting Started
To get started, clone or download & unzip this repo onto your computer in a place that OBS Studio or your broadcasting software of choice can access local HTML files.

## OBS Studio Setup
### Prerequites
* This guide assumes that you know how to add and place your own game capture, camera, and audio sources. If you have trouble with any of this, contact Elias and he will walk you through it.
* In your Profile video settings, make sure that your canvas resolution is set to 1920x1080.

### Game Views
For each game your location is streaming, do the following steps.
1) Create a new scene. Call it `<Game Name> View`. 

2) Add a new Browser source to your new scene. Name it `Global Overlay`.

3) Set the following properties:
* URL `C:/path/to/the/downloaded/files/global.html`
* Width `1920`
* Height `1080`
* FPS `30`
  * Make sure Custom CSS is empty.

3) Click the lock icon next to the source to ensure it is not accidentally moved.

4) Add a new Browser source below the Global Overlay. Name it `<Game Name> Overlay`.

3) Set the following properties:
* URL `C:/path/to/the/downloaded/files/layout.html?layout=<Layout Name>`
* Width `1920`
* Height `1080`
* FPS `30`
* Custom CSS
```css
#game-title::after { content: '<Game Name>'; }
#next-game::after { content: '<Next Game in Schedule>'; }
ost-one::after { content: '<PlayerName>'; }
  ```

* If you are the last game on the schedule, remove the `#next-game` line of CSS.
* Valid Layout Names are `nes`, `snes`, `fullscreen`, `widescreen`, `gb`, `gba`, `ds`, `dstall`, `3ds`.
  * If you provide an invalid Layout Name, it should be immediately evident int he rendering of the layout.

5) Add and position your games capture, camera, and audio sources under the Overlays.
* For some of the older consoles like NES or SNES, you may have to skew the game capture, as the fullscreen output of the game is not the native resolution of the console.

### Other Views
TBD
