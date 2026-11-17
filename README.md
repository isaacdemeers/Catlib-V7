# 🐱 Catlib v7

> **A huge toolbox to build Scratch games much faster, without recoding everything from scratch every time.**

Catlib is a **framework** for **Scratch 3 / TurboWarp**: a big project already full of code that you reuse as a starting point. Instead of rebuilding a camera, buttons, a save system or text display again and again, you get ready-made blocks.

It is the exact tool used to build **Again V3** and **Deadzone**.

> [!NOTE]
> At first, Catlib can feel a bit overwhelming and takes some time to get used to. But once you understand the principle (and that is the goal of this documentation 😉), it really changes how you code and animate in Scratch.

---

## 🧰 What's in the box

| Feature | What it's for | Chapter |
|---|---|---|
| 🎬 **Camera** | A camera that follows your sprites, zooms and rotates | [05 · Camera](docs/05-camera.md) |
| 🏃 **Smooth movement** | `smooth` and `bounce` blocks, animations that react to the mouse | [04 · Movement and effects](docs/04-movement-effects.md) |
| 🖱️ **Cursor** | A custom cursor with hover / click events | [06 · Cursor](docs/06-cursor.md) |
| 🧱 **UI Builder** | Build menus and interactive buttons | [07 · UI](docs/07-ui.md) |
| 🔤 **Text engine** | Display text with a built-in font, alignment, screen effects | [08 · Text](docs/08-text.md) |
| 🎞️ **Scene system** | Organize menus and game screens cleanly, with fades | [09 · Scenes and fades](docs/09-scenes-fades.md) |
| 📡 **Inter-sprite commands** | All sprites talk to each other with a single `〉CMD` block | [10 · Commands and modules](docs/10-commands-modules.md) |
| 💾 **Data and saves** | A `〉DATA` block to store / read / save | [11 · Data and saves](docs/11-data-saves.md) |
| 🔐 **Save code generator** | Generate save codes for your players in one call | [11 · Data and saves](docs/11-data-saves.md#4-save-codes-safe-code) |
| 💻 **Built-in terminal** | A debug console inside your game (`&` key) | [12 · Terminal](docs/12-terminal.md) |
| ⌨️ **Keyboard, mouse, sound** | Pressed keys, music / effects volumes | [13 · Sound, keyboard, time](docs/13-sound-keyboard-time.md) |
| 🛠️ **TOOLS blocks** | Handy utilities: distance, angle, collisions, text… | [14 · TOOLS](docs/14-tools.md) |

---

## ⚡ Quick start (5 minutes)

1. **Open** `Catlib_v7.sb3` in [TurboWarp](https://turbowarp.org/) (recommended) or in Scratch.
2. **Click the green flag** 🏁. You'll see the intro, then the `MENU` scene.
3. **Press the `&` key**: the terminal opens. Type `HELP` then `Enter`.
4. **Make your first object**: right-click the **`Frame`** sprite → *duplicate*, then follow the recipe ["My first object"](docs/15-recipes.md#recipe-1--my-first-object).
5. Then read [02 · How it works](docs/02-how-it-works.md): it's the chapter that makes everything else easy.

---

## 📚 Documentation index

### 🟢 Getting started
- [01 · Getting started](docs/01-getting-started.md) — install, discover the project, first launch
- [02 · How it works](docs/02-how-it-works.md) — the brain of Catlib explained simply
- [15 · Step-by-step recipes](docs/15-recipes.md) — mini-tutorials to copy

### 🟡 The tools, one by one
- [03 · The Frame sprite](docs/03-frame.md) — the base of all your objects
- [04 · Movement and effects](docs/04-movement-effects.md) — `MOVE`, `SIZE`, `ROTATE`, `FX`
- [05 · Camera](docs/05-camera.md)
- [06 · Cursor](docs/06-cursor.md)
- [07 · UI Builder](docs/07-ui.md)
- [08 · Text engine](docs/08-text.md)
- [09 · Scenes and fades](docs/09-scenes-fades.md)
- [10 · Commands and modules](docs/10-commands-modules.md) — including how to create **your own commands**
- [11 · Data and saves](docs/11-data-saves.md)
- [12 · Terminal](docs/12-terminal.md)
- [13 · Sound, keyboard, time](docs/13-sound-keyboard-time.md)
- [14 · TOOLS](docs/14-tools.md)

### 🔴 Reference and help
- [16 · Quick reference](docs/16-quick-reference.md) — the list of all blocks
- [17 · Troubleshooting and known limitations](docs/17-troubleshooting.md)
- [18 · Glossary and version history](docs/18-glossary-versions.md)

---

## 🗺️ The project in one picture

```mermaid
flowchart LR
    subgraph Engines["The engines (ᗢ sprites)"]
        Core["ᗢ Core<br/>the brain"]
        Camera["ᗢ Camera"]
        Cursor["ᗢ Cursor"]
        UI["ᗢ UI"]
        Text["ᗢ Text"]
        Fader["ᗢ Fader +"]
    end
    subgraph Templates["Templates to duplicate"]
        Frame["Frame<br/>(base of your objects)"]
        Ext["Extension<br/>(base of your commands)"]
    end
    Core -- "messages (tick, ready...)" --> Engines
    Core -- "messages" --> Templates
    Yours["Your game<br/>(sprites duplicated from Frame)"] -- "〉CMD" --> Core
    Frame -. "duplicate" .-> Yours
```

---

## ✅ Compatibility

- The project was saved with **TurboWarp** (visible from its `_twconfig_` configuration comment). It is the safest place to use it.
- It uses the Scratch **Pen** extension.
- The cloud variable (`☁ 〉CLOUD global`) only works on the official Scratch website, with a logged-in account.

> [!IMPORTANT]
> This documentation was written by **reading the project's code** (sprites, custom blocks, lists, comments). Points that looked surprising are gathered in [17 · Troubleshooting and known limitations](docs/17-troubleshooting.md).

## 👤 Credits

Catlib v7 — *author: to be completed*.
