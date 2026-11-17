
# 12 · The Built-in Terminal

> **Objective:** use Catlib's hidden console to **test and debug** your game while it is running: change scenes, read or modify data, write notes…

⬅️ [Data and Save Files](<11 · Data and Save Files.md>) · [Table of Contents](../README.md) · ➡️ [Sound, Keyboard, Time](<13 · Sound, Keyboard, Mouse, and Time.md>)

---

## 1. Opening and Closing

| Action | Key |
|---|---|
| Open / close the terminal | **`&`** (the `1` key on an AZERTY keyboard) |
| Execute a command | `Enter` |
| Delete a character | **`-`** (not the Backspace key) |

When open, the cursor becomes a **text cursor** and the screen displays: the title `terminal v2.0`, the time in the top-right corner, 21 lines of history, and the input line with a suggestion.

> [!NOTE]
> The terminal is launched at startup using the `TERMINAL START` command. The `&` and `-` keys are **data entries** (`TERM.KEY.TOGGLE` and `TERM.KEY.BACK` in `GAME`): you can change them.

## 2. Terminal Keys

| Key | Action |
|---|---|
| `↑` / `↓` | Browse command **suggestions** (and scroll through the history). |
| `→` | **Accept** the displayed suggestion. |
| `←` | **Recall** the last command. |
| `-` | Delete. |
| `&` | Open / close. |

> [!NOTE]
> You can only type characters from the `ᗢ CORE keys` list (**lowercase** letters, numbers, common symbols, and spaces). This is the same list used for save codes.

## 3. Commands

A command name followed by its options. `<n>` = required name, `[val]` = optional value.

### Scenes ([chapter 09](<09 · Scenes and Fades.md>))

| Command | Effect |
|---|---|
| `SCENE SET <n>` | Switches to scene `<n>` |
| `SCENE BACK` | Returns to the previous scene |
| `SCENE MAIN` | Returns to the main scene |
| `SCENE RESET` | Clears the scene history |

### Data ([chapter 11](<11 · Data and Save Files.md>))

Valid for **`GAME`**, **`CACHE`**, **`SAVE`**, and **`CLOUD`**:

| Command | Effect |
|---|---|
| `<SOURCE> SET <n> [val]` | Creates or modifies an entry |
| `<SOURCE> GET <n>` | Reads an entry (the value is stored in `〉DATA get output`) |
| `<SOURCE> ADD <n> <val>` | Adds a number |
| `<SOURCE> CREATE <n> [val]` | Creates an entry if it doesn't exist |
| `<SOURCE> UNSET <n>` | Deletes an entry |
| `<SOURCE> RENAME <n> <newname>` | Renames an entry |
| `<SOURCE> CLEAR [chars]` | Deletes names containing `chars` (everything if empty) |
| `<SOURCE> FIND [chars]` | Displays data entries whose names contain `chars` |

Additionally: `SAVE IMPORT`, `SAVE EXPORT [RAW]`, `CLOUD SYNC`, `CLOUD SEND`.

Example: `GAME SET test hello` → the terminal responds with `create {test} = hello`.

> [!NOTE]
> `GET` only stores the value in `〉DATA get output`: it **does not display anything**. To **view** data, use `FIND`.

### Notes

| Command | Effect |
|---|---|
| `NOTE NEW <n> <content>` | Creates a note (the content can contain spaces) |
| `NOTE OPEN <n>` | Displays the note |
| `NOTE LIST` | Lists all notes |
| `NOTE DEL <n>` | Deletes a note |
| `HELP` | Displays terminal help |

Notes are stored in `GAME` under the name `NOTE.<name>`, along with their last modification date (`NOTE.<name>.LAST_EDIT`). Inside a note's content, the **`>`** character represents a **line break**.

### Other Commands

| Command | Effect |
|---|---|
| `FADE <scene> <speed1> <speed2> …` | Fades into a scene ([09](<09 · Scenes and Fades.md>)) |
| Any command from **your module** | See [10](<10 · Commands and Modules.md>) |

> [!WARNING]
> Autocomplete also suggests `SCENE GET <n>`, `ALERT NEW …`, and (depending on the project) `SOUND` commands, but **nothing is connected to them** in this project file. Therefore, they do nothing. See [17](<17 · Troubleshooting and Known Limitations.md>).

## 4. Changing the Terminal Keys

```text
〉DATA / source [GAME] action [SET] var [TERM.KEY.TOGGLE] to [t]
〉DATA / source [GAME] action [SET] var [TERM.KEY.BACK] to [<]
```

Or directly in the terminal: `GAME SET TERM.KEY.TOGGLE t`.

## 5. Writing to the Terminal and Log

- `ᗢ Core` contains the `〉TERMINAL write / type [TYPE] prefix [PREFIX] text [TEXT]` block, with the types `FEEDBACK` (indented feedback line), `COMMENT`, `CODE`, or empty. This block **only exists in Core**.
- From another sprite, use the **`LOG`** command ([chapter 10](<10 · Commands and Modules.md#the-log-command>)): it writes to the `〉LOGS` list.
- `〉DEVLOG / new entry [TEXT] new version? [VERSION]` adds a dated entry to the **development log** `〉DEVLOGS` (Core list).

## 6. How It Works (For the Curious)

- `Lib - TERMINAL` runs in a loop: it reads the **first key** in the `〉PRESSED KEY` list ([13](<13 · Sound, Keyboard, Mouse, and Time.md>)), adds it to the input text, and handles special keys.
- `ᗢ Text` draws the lines using the text engine ([08](<08 · Text.md>)).
- When a command is entered, the terminal checks the first word: `CACHE`, `GAME`, `SAVE`, or `CLOUD` (except `SEND`, `SYNC`, `EXPORT`, `IMPORT`, and `FIND`) directly calls `〉DATA`; everything else goes through `〉CMD`.

---

⬅️ [Data and Save Files](<11 · Data and Save Files.md>) · [Table of Contents](../README.md) · ➡️ [Sound, Keyboard, Time](<13 · Sound, Keyboard, Mouse, and Time.md>)