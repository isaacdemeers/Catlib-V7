
# 01 · Getting started

> **Goal of this chapter:** understand what Catlib is, open the project, do a first launch and know how to start **your own game** from it.

⬅️ [Back to index](../README.md) · ➡️ [Next chapter: How it works](02-how-it-works.md)

---

## 1. What is Catlib?

Imagine you're building a hut. You can:

- 🪓 cut every plank and make every nail yourself, **or**
- 📦 buy a **kit** with the planks, screws and the plan.

**Catlib is the kit.** In a Scratch game you almost always need the same things: a camera, buttons, text, menus, saving… Catlib already contains all of that, written once and for all. You focus on **your** game.

A project like this is called a **framework**.

## 2. What you should already know

No need to be an expert, but you should know these Scratch notions:

| Notion | One-sentence reminder |
|---|---|
| **Variable** | A box that holds a value (a score, a name…). |
| **List** | A series of numbered values (1, 2, 3…). |
| **Message** ("broadcast") | A shout every sprite hears: "game scene finished!" |
| **Clone** | A copy of a sprite that lives its own life. |
| **Custom block** | A block you invent (*My Blocks* category). |

> [!TIP]
> **Clones** are everywhere in Catlib. If that word scares you, just remember: *the original sprite is a "factory", clones are the "objects" it makes.* More in [chapter 02](02-how-it-works.md).

## 3. How to read blocks in this documentation

Catlib blocks almost all start with a small symbol **`〉`**. In this documentation they're written like this:

```text
〉MOVE smooth / xy [X] [Y] damp [DAMP]
```

| What you see | What it means |
|---|---|
| `〉MOVE smooth / xy …` | The **block name**, as shown in *My Blocks*. |
| `[X]`, `[Y]`, `[DAMP]` | The **slots to fill in** (the block's inputs). |
| `〉CAM x`, `〉SCENE` | A global Catlib **variable**. |
| `ᗢ DATA save` | A global Catlib **list**. |
| `ᗢ CORE …` | An **internal** block: it makes Catlib work, **don't use it** directly. |
| `〉〉UNIQUE_ID` | A per-sprite variable created by Frame. |

The little boxes:

> [!TIP]
> A practical tip.

> [!WARNING]
> A classic mistake to avoid.

> [!NOTE]
> Extra information.

## 4. Opening the project

1. Go to [turbowarp.org](https://turbowarp.org/) (recommended) or the Scratch editor.
2. **File → Load from your computer** and choose `Catlib_v7.sb3`.

> [!NOTE]
> **Why TurboWarp?** Catlib uses a huge number of clones and loops. TurboWarp is much faster and can remove Scratch's 300-clone limit. The file was also saved with TurboWarp.

> [!WARNING]
> The project contains a **cloud variable**. It only works on the **official Scratch website** with a logged-in account. In TurboWarp or offline, the "cloud" part of [11 · Data and saves](11-data-saves.md) won't work.

## 5. Guided tour: the project's sprites

When you open the project you see **11 sprites** and the *Stage*. Sprites whose name starts with **ᗢ** are Catlib's **engines**.

| Sprite | Role | Do you touch it? |
|---|---|---|
| **ᗢ Core** | **The brain.** Starts everything, sends the "heartbeat" (`tick`), handles commands, scenes, data, the terminal. | A little (startup settings) |
| **ᗢ Camera** | The camera. | Yes (one block to edit) |
| **ᗢ Cursor** | The custom cursor (hover, click). | Yes (events) |
| **ᗢ UI** | Menu and button factory. | Yes |
| **ᗢ Text** | The text engine and font. | Yes, to write text |
| **ᗢ Fader +** | **Fade** module between two scenes (`FADE` command). | Rarely |
| **ᗢ Thumbnail** | Shows the project thumbnail when the game is stopped. | No |
| **INTRO V12** | The logo animation at startup. | You can delete it |
| **Frame** | **The base template** for all your objects. You **duplicate** it. | You duplicate it |
| **Extension** | **The template** to create your own commands. You **duplicate** it. | You duplicate it |
| **DEMO** | A copy of `Frame` full of **comments** explaining each block. | You read it |

> [!TIP]
> The **DEMO** sprite is your best friend at the start: hover the comments attached to the blocks, they explain what each one does.

The Stage has no scripts. It **stores the global variables and lists** all sprites share (see [02 · How it works](02-how-it-works.md#6-global-variables-and-lists)). It has two backdrops: `CATLIB` and `BLACK`.

## 6. First launch

Click the **green flag** 🏁. Here's what happens, in order:

1. `ᗢ Core` wakes up and prepares everything (lists cleared, default data created, terminal ready).
2. Catlib checks your **Scratch username**. If it's not the same person as last time (variable `〉USER`), it's a **first start**: the message `ᗢ CATLIB - first start` is sent. Otherwise we go straight to the `MENU` scene.
3. `INTRO V12` plays its logo animation, then asks for the `MENU` scene.
4. A blinking text **`[ see inside ]`** appears in the center: it's an example of the text engine.
5. Press the **`&`** key: the **terminal** opens (and the cursor becomes a text cursor). Type `HELP` + `Enter`. Press `&` again to close it.

> [!NOTE]
> On an **AZERTY** keyboard, `&` is on the `1` key. You can change the opening key, see [12 · Terminal](12-terminal.md#4-changing-the-terminal-keys).

## 7. Starting your own game

The simplest way: **use Catlib_v7.sb3 as a template** and build your game *inside* it.

1. **Keep the original intact.** Open the project then *File → Save to your computer* under a **new name** (e.g. `MyGame.sb3`).
2. **Choose your game version.** In `ᗢ Core`, find the block `Config - CATLIB / game version [1.0]` (under the hat *when I receive `ᗢ CATLIB - start`*) and put your version number.
3. **Decide what you keep.** You can delete `INTRO V12` (or replace it with your own logo), `DEMO` and, later, `Extension` if you don't create commands.
4. **Clean the test data.** The lists `ᗢ DATA game`, `ᗢ DATA save`, `〉SAVECODES` contain sample values (notes, codes…). Clear what you don't need before publishing (see [11 · Data](11-data-saves.md)).
5. **Create your objects** by duplicating `Frame` ([03 · Frame](03-frame.md)).
6. **Create your scenes**: `MENU`, `GAME`, `OPTIONS`… ([09 · Scenes](09-scenes-fades.md)).

### What if I want to copy Catlib's sprites into another project?

It's possible but **riskier**, because Catlib works with **global variables and lists** stored on the Stage. If they're missing, scripts won't find their data. In that case, make sure your project contains:

<details>
<summary>📋 Global variables to have (click to expand)</summary>

`〉SCENE`, `〉TIME clock`, `〉TIME date`, `☁ 〉CLOUD global` (cloud), `〉CAM x`, `〉CAM y`, `〉CAM z`, `〉CAM rotation`, `〉CURSOR x`, `〉CURSOR y`, `〉CURSOR speed`, `〉CURSOR speed x`, `〉CURSOR speed y`, `〉CURSOR clicked ?`, `〉CURSOR hovering ?`, `〉CURSOR text x`, `〉CURSOR text y`, `〉USER`
</details>

<details>
<summary>📋 Global lists to have (click to expand)</summary>

`ᗢ DATA game`, `ᗢ DATA save`, `ᗢ DATA cache`, `ᗢ DATA cloud`, `〉SAVECODES`, `〉FIND output`, `〉LOGS`, `〉PRESSED KEY`, `ᗢ CORE cmd`, `ᗢ CORE stack`, `ᗢ CORE modules`, `ᗢ CORE scenes`, `ᗢ CORE keys`, `ᗢ CORE pchars`, `ᗢ CORE sounds`, `ᗢ CORE layers`, `ᗢ CORE layers order`, `ᗢ CORE terminal`, `ᗢ CORE autocompletes`, `ᗢ CORE imported data`
</details>

## 8. The 5 golden rules

> [!IMPORTANT]
> 1. **Every object in your game is a clone of a sprite duplicated from `Frame`.** The original sprite stays hidden.
> 2. **Don't touch `ᗢ CORE …` blocks.** They're the internal gears.
> 3. **Your logic goes in two blocks: `〉SELF init` (prepare) and `〉SELF on tick` (every frame).**
> 4. **To remove an object, use `〉SELF kill`**, never *delete this clone* directly.
> 5. **Catlib clears the pen every frame.** Don't use the pen for permanent drawings.

---

⬅️ [Back to index](../README.md) · ➡️ [Next chapter: How it works](02-how-it-works.md)
