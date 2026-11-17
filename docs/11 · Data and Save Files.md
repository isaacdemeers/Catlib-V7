
# 11 · Data and Save Files

> **Objective:** store, read, and modify data using **a single block** (`〉DATA`), choose the right storage "space" (`GAME`, `SAVE`, `CACHE`, `CLOUD`), and generate **save codes** for your players.

⬅️ [Commands and Modules](<10 · Commands and Modules.md>) · [Table of Contents](../README.md) · ➡️ [Terminal](<12 · The Built-in Terminal.md>)

---

## 1. The 4 Storage Spaces

Catlib stores data in **four lists**, called "sources". Think of them as four drawers:

| Source | List | What to use it for | Lifetime |
|---|---|---|---|
| **`GAME`** | `ᗢ DATA game` | Game **settings**: volumes, keys, version, notes. | Kept during the session (see §6). |
| **`SAVE`** | `ᗢ DATA save` | The player's **progress**: level, money, items… This is the source exported as a **save code**. | Kept during the session, **exportable**. |
| **`CACHE`** | `ᗢ DATA cache` | **Temporary** data (calculations, interface information). | **Cleared every time** the green flag is clicked. |
| **`CLOUD`** | `ᗢ DATA cloud` | **Shared** data through the cloud variable. | See §5. |

### How is data stored?

Each data entry has a **name** and a **value**, stored one after the other in the list. The name is enclosed in **curly braces**:

```text
{PLAYER.NAME}  Alex
{PLAYER.HP}    80
{LEVEL}        3
```

→ The list contains `{PLAYER.NAME}`, `Alex`, `{PLAYER.HP}`, `80`, `{LEVEL}`, `3`. You never have to type the curly braces yourself: the `〉DATA` block adds them automatically.

> [!TIP]
> Use **organized names with dots** (`PLAYER.HP`, `OPTIONS.VOLUME`). This makes data easier to read and allows you to find related entries using `CLEAR` and `FIND`.

## 2. The `〉DATA` block

```text
〉DATA / source [SOURCE] action [ACTION] var [NAME] to [VAL]
```

| Input | Purpose |
|---|---|
| `source` | `GAME`, `SAVE`, `CACHE`, or `CLOUD`. |
| `action` | What to do (see the table below). |
| `var` | The data **name**. |
| `to` | The **value** (or the new name for `RENAME`). |

### Actions

| Action | Effect | Example |
|---|---|---|
| `SET` | **Creates or modifies** the data entry. | `source SAVE action SET var LEVEL to 3` |
| `GET` | **Reads** the data entry: the result is stored in the `〉DATA get output` variable (or `NULL` if it doesn't exist). | `source SAVE action GET var LEVEL` |
| `ADD` | **Adds** a number to the existing value (does nothing if the entry doesn't exist). | `source SAVE action ADD var COINS to 5` |
| `CREATE` | Creates the data entry **only if it doesn't already exist** (default value). | `source SAVE action CREATE var COINS to 0` |
| `UNSET` | **Deletes** the data entry. | `source SAVE action UNSET var COINS` |
| `RENAME` | **Renames** the data entry (`to` = new name). | `source SAVE action RENAME var HP to HEALTH` |
| `CLEAR` | Deletes **all** data entries whose names **contain** `var`. If `var` is empty, **the entire list is cleared**. | `source SAVE action CLEAR var PLAYER.` |

**Example: read a score and then display it**

```text
〉DATA / source [SAVE] action [GET] var [SCORE] to []
if < not ( 〉DATA get output = [NULL] ) > then
    … use 〉DATA get output …
```

> [!IMPORTANT]
> **Reading** always requires **two steps**: (1) execute `GET`, (2) read the **`〉DATA get output`** variable. If the data entry doesn't exist, `〉DATA get output` is set to **`NULL`**.

### Forbidden characters

The characters **`{`**, **`@`**, and **`}`** are **protected** (stored in the `ᗢ CORE pchars` list, configurable through `Config - PROTECTED CHARS`) because they are used to structure data and commands. If a name or value contains any of them, **the operation is ignored without displaying a message**.

### Two versions of the block

| | Inside **`ᗢ Core`** | Inside your sprites (copy of `Frame`) |
|---|---|---|
| Writes a message to the terminal | ✅ yes (`set {X} = 5`) | ❌ no |
| `ADD` on `GAME` | ✅ | ❌ unavailable |
| Other actions and sources | ✅ | ✅ |

When using the **terminal** or a `〉CMD`, the Core version handles the operation.

### Finding data: `FIND`

Using a command (or the terminal):

```text
〉CMD / name [SAVE] option [FIND] args [PLAYER] [] [] awaited? []
```

Displays all names **containing** `PLAYER` along with their values in the terminal, and stores them in the `〉FIND output` list (name, value, name, value…). Available for `GAME`, `SAVE`, `CACHE`, and `CLOUD`.

## 3. What goes where? Examples

| Data | Source | Why |
|---|---|---|
| Music volume | `GAME` | Game setting (`VOL.MUSIC` already exists). |
| Reached level, money, inventory | `SAVE` | Needs to be saved in the code. |
| Enemy position during a battle | `CACHE` | Temporary data. |
| Shared high score | `CLOUD` | Visible to everyone (see §5). |

### Data created by Catlib in `GAME`

| Name | Default value | Purpose |
|---|---|---|
| `TERM.KEY.TOGGLE` | `&` | Key used to open the terminal |
| `TERM.KEY.BACK` | `-` | Key used to delete text in the terminal |
| `TERM.TOGGLE` | `ON` / `OFF` | Terminal state |
| `VOL.MASTER`, `VOL.MUSIC`, `VOL.SFX` | `100` | Volume settings (see [13](<13 · Sound, Keyboard, Mouse, and Time.md>)) |
| `GAME_VERSION`, `CATLIB_VERSION` | e.g. `1.0`, `7` | Versions |
| `TERMINAL.HELP` | text | Text displayed by the `HELP` command |
| `NOTE.<name>` | text | Terminal notes |

> [!WARNING]
> **Clean up before publishing.** The provided project contains test data (notes, example values in `ᗢ DATA save`, old codes in `〉SAVECODES`). Clear anything you don't need.

## 4. Save Codes (Safe Code)

On Scratch, lists are **reset** when a player leaves the page. To let them keep their progress, you give them a **code** that they can copy and paste when they return. Catlib generates it with **a single call**.

### Generating a code

```text
〉CMD / name [SAVE] option [EXPORT] args [] [] [] awaited? []
```

The code is added **to the top** of the **`〉SAVECODES`** list (up to 10 codes are kept). Display this list (using the *show list* block) so the player can copy their code.

A code looks like this:

```text
[Alex 11/16/2026 01:28] 2073600092423855342742283654364236554042…
```

| Part | Meaning |
|---|---|
| `[Alex 11/16/2026 01:28]` | **Readable header**: save name, date, and time. The name comes from the `SN` entry in `SAVE` (otherwise `NULL`). |
| `2073600092` | The **key** (10 digits). |
| `4238553427…` | The **encrypted data**, 2 digits per character. |

To give the code a name: `〉DATA / source [SAVE] action [SET] var [SN] to [Alex]`.

> [!TIP]
> With the `RAW` option (`SAVE EXPORT RAW`), the code is added **unencrypted** (for example, `{4}10{10}7…`): useful for **debugging**.

### How encryption works (simplified version)

1. All `SAVE` data is joined together: `{LEVEL}3{COINS}50`.
2. A **10-digit key** is generated using your **Scratch username** and a random number.
3. Each character is replaced with its **index** in the `ᗢ CORE keys` list, **plus** one digit from the key (which changes for each character).
4. The final code = key + digits.

> [!NOTE]
> This is **obfuscation** (scrambling): it discourages manual modification of a code, but the underlying method is included in the project, so it is not protection against someone who is determined to tamper with it.

### Important restrictions on saved data

> [!WARNING]
> - Only **characters included in the `ᗢ CORE keys` list** are preserved: `a–z`, `0–9`, `& é # " ' { ( [ à è _ ç @ ) ] } < > ! : / ; . ? , % - * + $ = ~` and spaces.
> - Encryption does **not distinguish between uppercase and lowercase letters**: everything will be restored in **lowercase**.
> - Characters not included in the list (`ü`, `€`, `ê`…) will not be restored correctly.
> - Names and values must not contain `{`, `}`, or `@`.

### Loading a code

```text
〉CMD / name [SAVE] option [IMPORT] args [] [] [] awaited? []
```

An input box opens ("PLEASE, PASTE CODE HERE. Leave empty to cancel"). The player pastes their code. Catlib reads the key, decrypts the data, and rebuilds the entries.

> [!WARNING]
> In the provided project, the final step of `SAVE IMPORT` (copying the decrypted data into `ᗢ DATA save`) compares the source to `GAME` instead of `SAVE`: **loading appears to write nothing into `ᗢ DATA save`**. This should be checked and fixed before relying on it. Details and fix: [17 · Known Limitations](<17 · Troubleshooting and Known Limitations.md>).

## 5. The Cloud

The **`☁ 〉CLOUD global`** variable allows data to be shared between all players.

| Command | Effect |
|---|---|
| `CLOUD SEND` | Encrypts the `ᗢ DATA cloud` list and writes it to the cloud variable. |
| `CLOUD SYNC` | Reads the cloud variable and copies its contents into `ᗢ DATA cloud`. |
| `CLOUD SET/GET/ADD/CREATE/UNSET/RENAME/CLEAR/FIND` | Works like the other sources, but operates on `ᗢ DATA cloud`. |

> [!WARNING]
> - There is **only one** cloud variable: all cloud data must fit into **a single** shared value (Scratch cloud variables are limited to **numbers** and a small amount of data).
> - It only works on the **official Scratch website**, with a logged-in account.
> - Anything written by `CLOUD SEND` replaces what another player has previously sent.

## 6. What happens after closing the page?

| Situation | What happens to the data? |
|---|---|
| Player clicks the green flag again | `GAME`, `SAVE`, `CLOUD` **remain**; `CACHE` is **cleared**. |
| Player leaves and comes back later | Everything returns to the values saved **in the project file**. They must **paste their code again**. |
| You save the project | The current contents of the lists are saved **with the project** (which is why cleaning them up is important). |

The `Core - FACTORY RESET` block (factory reset) clears `GAME`, `SAVE`, and `CLOUD` and resets the terminal, but **no button calls it** in the project: connect it yourself if needed.

---

⬅️ [Commands and Modules](<10 · Commands and Modules.md>) · [Table of Contents](../README.md) · ➡️ [Terminal](<12 · The Built-in Terminal.md>)