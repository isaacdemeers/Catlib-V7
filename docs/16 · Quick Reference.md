

# 16 · Quick Reference

> The list of **all Catlib blocks**, organized by sprite, with their purpose. For explanations, follow the chapter link.

⬅️ [Recipes](<15 · Step-by-Step Recipes.md>) · [Table of Contents](../README.md) · ➡️ [Troubleshooting](<17 · Troubleshooting and Known Limitations.md>)

---

## Blocks available in all `Frame` sprites

### Lifecycle and rendering — [03](<03 · Frame.md>)

| Block | Purpose |
|---|---|
| `〉SELF init` | **To be filled in:** prepare the object when it is created. |
| `〉SELF on tick` | **To be filled in:** logic executed every frame. |
| `〉SELF kill` | Properly delete the clone. |
| `〉SELF stamp` | Render the object as a stamp (pen). |
| `〉SELF set layer / layer [LAYER]` | Layer: number, `TOP`, or `BOTTOM`. |
| `〉UPDATE normal` | Apply position/size/rotation to the screen. |
| `〉UPDATE camera / origine [ORIGINE] mirror [SIDE]` | Same, linked to the camera. |

### Movement, size, rotation — [04](<04 · Movement Effects.md>)

| Block | Purpose |
|---|---|
| `〉MOVE set / xy [X] [Y]` | Set position immediately. |
| `〉MOVE smooth / xy [X] [Y] damp [DAMP]` | Smooth movement. |
| `〉MOVE bounce / xy [X] [Y] damp [DAMP] bounciness [BOUNCE]` | Spring movement. |
| `〉MOVE add / xy [X] [Y]` | Add to position. |
| `〉MOVE+ parallax / damp [DAMP] for [X/Y]` | Offset based on mouse movement. |
| `〉SIZE set / val [VALUE]` | Set size immediately. |
| `〉SIZE smooth / val [VALUE] damp [DAMP]` | Smooth size transition. |
| `〉SIZE bounce / val [VALUE] damp [DAMP] bounce [BOUNCE]` | Spring size transition. |
| `〉SIZE add / val [VAL]` | Add to size. |
| `〉SIZE+ mouse speed / damp [DAMP]` | Size based on mouse speed. |
| `〉ROTATE set / val [VAL]` | Set rotation immediately. |
| `〉ROTATE smooth / val [VALUE] damp [DAMP]` | Smooth rotation. |
| `〉ROTATE bounce / val [VALUE] damp [DAMP] bounce [BOUNCE]` | Spring rotation. |
| `〉ROTATE add / val [VALUE]` | Add degrees. |
| `〉ROTATE+ mouse speed / damp [DAMP] mirror [MIRROR]` | Rotation based on mouse speed. |

### Effects — [04](<04 · Movement Effects.md>)

| Block | Purpose |
|---|---|
| `〉FX ghost / val [VALUE] speed [SPEED]` | Transparency (0 visible, 100 invisible). |
| `〉FX bright / …` | Brightness. |
| `〉FX color / …` | Color. |
| `〉FX fisheye / …` | Fisheye effect. |
| `〉FX pixalate / …` | Pixelation. |
| `〉FX whirl / …` | Swirl. |

### Data, commands, sound

| Block | Purpose | Chapter |
|---|---|---|
| `〉DATA / source [SOURCE] action [ACTION] var [NAME] to [VAL]` | Read / write data. | [11](<11 · Data and Save Files.md>) |
| `〉CMD / name [CMD] option [OPTION] args [ARG1] [ARG2] [ARG3] awaited? [AWAIT]` | Send a command. | [10](<10 · Commands and Modules.md>) |
| `〉SOUND play / name [NAME] loop? [LOOP?] ( volume ) [VOL]` | Play a sound. | [13](<13 · Sound, Keyboard, Mouse, and Time.md>) |
| `〉SOUND stop / name [NAME]` | Stop a sound (`ALL` = all). | [13](<13 · Sound, Keyboard, Mouse, and Time.md>) |

### Tools — [14](<14 · The TOOLS Blocks.md>)

| Block | Output |
|---|---|
| `〉TOOL num/text / val` | `〉TOOL num/text` |
| `〉TOOL normalize / val … range of val … target range …` | `〉TOOL normalized` |
| `〉TOOL get speed / xy` | `〉TOOL speed` |
| `〉TOOL get rotate / from … to …` | `〉TOOL rotate` |
| `〉TOOL get distance / from … to …` | `〉TOOL distance` |
| `〉TOOL check collide / point … in box w/h … at …` | `〉TOOL collide?` |
| `〉TOOL get size of sprite` | `CACHE`: `<ID>.SIZEX` / `.SIZEY` |
| `〉TOOL Text split / split index … keep 1/2 … text …` | `〉TOOL Text split output` |
| `〉TOOL Text replace / val to replace … replace by … text …` | `〉TOOL Text replace output` |
| `〉TOOL Text normalize / val … target len. …` | `〉TOOL Text normalize output` |
| `〉TOOL Text space / space size … text …` | `〉TOOL Text space output` |

### Internal (do not use)

`ᗢ CORE init`, `ᗢ CORE create uuid`, `ᗢ CORE update plan`, `ᗢ CORE size instant / val … current sprite …`.

---

## Specific to each engine

### `ᗢ Core` — [02](<02 · How it works.md>), [09](<09 · Scenes and Fades.md>), [10](<10 · Commands and Modules.md>), [12](<12 · The Built-in Terminal.md>)

| Block | Purpose |
|---|---|
| `Config - CATLIB / game version [GAME VERSION]` | **Starting point:** prepares everything, sets the game version, sends `ready`. |
| `Config - GAME VERSION [VERSION]` / `Config - CATLIB VERSION [VERSION]` | Stores the versions in `GAME`. |
| `Config - PROTECTED CHARS [CHARS]` | Characters forbidden in data (`{@}` by default). |
| `Config - CHECK USER [USER] / If first start, SET SCENE [SCENEFIRST] else [SCENENORMAL]` | Detects a new user. |
| `Config - WHEN READY COMMANDS` | Commands sent at startup. |
| `Config - ON STOP` | Broadcasts `ᗢ CATLIB - stopped`. |
| `Core - FACTORY RESET` | Resets `GAME`, `SAVE`, `CLOUD` to zero. |
| `〉DEVLOG / new entry [TEXT] new version? [VERSION]` | Adds an entry to the `〉DEVLOGS` log. |
| `〉TERMINAL write / type [TYPE] prefix [PREFIX] text [TEXT]` | Writes a line to the terminal. |
| `〉CMD / name … source [SOURCE]` | Core version of `〉CMD` (with `source`). |
| `Lib - TERMINAL / KEY / LOG / SCENE / SAVE / CLOUD / CACHE / DATA / NOTES / HELP / CUSTOM` | Built-in command libraries. |
| `Func - …` and `Core - …` | Internal functions (data, encryption, terminal…). |

### `ᗢ Camera` — [05](<05 · Camera.md>)

| Block | Purpose |
|---|---|
| `UPADTE CAM` | **To be filled in:** camera logic. |
| `〉UPDATE self` | Copies position/zoom/rotation to `〉CAM …`. |
| `〉PLAN set / layer [LAYER]`, `〉STAMP`, `〉KILL` | Equivalents of `set layer`, `stamp`, `kill`. |

### `ᗢ Cursor` — [06](<06 · Cursor.md>)

`〉CURSOR always`, `〉CURSOR idle`, `〉CURSOR on hover`, `〉CURSOR while hover`, `〉CURSOR on click`, `〉CURSOR while click`.

### `ᗢ UI` — [07](<07 · UI.md>)

| Block | Purpose |
|---|---|
| `〉UI new / name … / xy … / size … / visible on scene … / idle sprite … / hover sfx … / type … action … value …` | Create an element. |
| `〉UI on create`, `〉UI always`, `〉UI idle`, `〉UI on hover`, `〉UI while hover`, `〉UI on click`, `〉UI while click`, `〉UI delete` | Element events. |

### `ᗢ Text` — [08](<08 · Text.md>)

| Block | Purpose |
|---|---|
| `〉WRITE at [X] [Y] ALIGN … HSL … SIZE … TEXT … GROUP … TYPE … FONT … SPACING ( 4 + … ) STAMP? … SCREEN VFX? …` | Write text. |
| `ᗢ CORE print terminal`, `〉SELF update function` | Internal (terminal display) / text rendering. |

### `ᗢ Fader +` and `Extension` — [09](<09 · Scenes and Fades.md>), [10](<10 · Commands and Modules.md>)

| Block | Purpose |
|---|---|
| `〉MODULE set name / name [NAME]` | Sets the module command's name. |
| `ᗢ MODULE actions` | **To be filled in:** what the command does. |
| `〉MEMORY / get [INDEX] ( to [TO] )` | Reads a word from the received command (`INDEX` 1 = name, 2 = option, 3+ = arguments). |
| `ᗢ MODULE init`, `ᗢ MODULE half fade actions` | Internal (`Fader +`). |

---

## All commands (`〉CMD` / terminal)

| Command | Syntax |
|---|---|
| Scenes | `SCENE SET <n>` · `SCENE BACK` · `SCENE MAIN` · `SCENE SETMAIN <n>` · `SCENE RESET` |
| Data | `GAME / CACHE / SAVE / CLOUD` + `SET <n> [val]` · `GET <n>` · `ADD <n> <val>` · `CREATE <n> [val]` · `UNSET <n>` · `RENAME <n> <new>` · `CLEAR [chars]` · `FIND [chars]` |
| Save files | `SAVE EXPORT [RAW]` · `SAVE IMPORT` |
| Cloud | `CLOUD SEND` · `CLOUD SYNC` |
| Notes | `NOTE NEW <n> <content>` · `NOTE OPEN <n>` · `NOTE LIST` · `NOTE DEL <n>` · `HELP` |
| System | `TERMINAL START` · `KEY START` · `LOG <TYPE> <text>` |
| Fade | `FADE <scene> <speed in> <speed out> [delay before] [delay after]` |

## All useful global variables

`〉SCENE` · `〉TIME clock` · `〉TIME date` · `〉CAM x/y/z/rotation` · `〉CURSOR x/y/speed/speed x/speed y/clicked ?/hovering ?/text x/text y` · `〉USER` · `☁ 〉CLOUD global` · `〉DATA get output` · `〉PRESSED KEY` (list) · `〉SAVECODES` (list) · `〉FIND output` (list) · `〉LOGS` (list)

---

⬅️ [Recipes](<15 · Step-by-Step Recipes.md>) · [Table of Contents](../README.md) · ➡️ [Troubleshooting](<17 · Troubleshooting and Known Limitations.md>)

