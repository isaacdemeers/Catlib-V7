# 16 · Référence rapide

> La liste de **tous les blocs** de Catlib, par sprite, avec leur rôle. Pour les explications, suis le lien du chapitre.

⬅️ [Recettes](15-recettes.md) · [Sommaire](../README.md) · ➡️ [Dépannage](17-depannage.md)

---

## Blocs disponibles dans tous les sprites `Frame`

### Cycle de vie et rendu — [03](03-frame.md)

| Bloc | Rôle |
|---|---|
| `〉SELF init` | **À remplir** : préparer l'objet à sa naissance. |
| `〉SELF on tick` | **À remplir** : logique à chaque image. |
| `〉SELF kill` | Supprimer proprement le clone. |
| `〉SELF stamp` | Rendre l'objet par tampon (stylo). |
| `〉SELF set layer / layer [LAYER]` | Calque : nombre, `TOP` ou `BOTTOM`. |
| `〉UPDATE normal` | Appliquer position/taille/rotation à l'écran. |
| `〉UPDATE camera / origine [ORIGINE] mirror [SIDE]` | Pareil, lié à la caméra. |

### Mouvement, taille, rotation — [04](04-mouvements-effets.md)

| Bloc | Rôle |
|---|---|
| `〉MOVE set / xy [X] [Y]` | Position immédiate. |
| `〉MOVE smooth / xy [X] [Y] damp [DAMP]` | Glisse. |
| `〉MOVE bounce / xy [X] [Y] damp [DAMP] bounciness [BOUNCE]` | Ressort. |
| `〉MOVE add / xy [X] [Y]` | Ajoute. |
| `〉MOVE+ parallax / damp [DAMP] for [X/Y]` | Décalage selon la souris. |
| `〉SIZE set / val [VALUE]` | Taille immédiate. |
| `〉SIZE smooth / val [VALUE] damp [DAMP]` | Taille douce. |
| `〉SIZE bounce / val [VALUE] damp [DAMP] bounce [BOUNCE]` | Taille ressort. |
| `〉SIZE add / val [VAL]` | Ajoute à la taille. |
| `〉SIZE+ mouse speed / damp [DAMP]` | Taille selon la vitesse de la souris. |
| `〉ROTATE set / val [VAL]` | Rotation immédiate. |
| `〉ROTATE smooth / val [VALUE] damp [DAMP]` | Rotation douce. |
| `〉ROTATE bounce / val [VALUE] damp [DAMP] bounce [BOUNCE]` | Rotation ressort. |
| `〉ROTATE add / val [VALUE]` | Ajoute des degrés. |
| `〉ROTATE+ mouse speed / damp [DAMP] mirror [MIRROR]` | Rotation selon la vitesse de la souris. |

### Effets — [04](04-mouvements-effets.md)

| Bloc | Rôle |
|---|---|
| `〉FX ghost / val [VALUE] speed [SPEED]` | Transparence (0 visible, 100 invisible). |
| `〉FX bright / …` | Luminosité. |
| `〉FX color / …` | Couleur. |
| `〉FX fisheye / …` | Œil de poisson. |
| `〉FX pixalate / …` | Pixellisation. |
| `〉FX whirl / …` | Tourbillon. |

### Données, commandes, son

| Bloc | Rôle | Chapitre |
|---|---|---|
| `〉DATA / source [SOURCE] action [ACTION] var [NAME] to [VAL]` | Lire / écrire des données. | [11](11-donnees-sauvegardes.md) |
| `〉CMD / name [CMD] option [OPTION] args [ARG1] [ARG2] [ARG3] awaited? [AWAIT]` | Envoyer une commande. | [10](10-commandes-modules.md) |
| `〉SOUND play / name [NAME] loop? [LOOP?] ( volume ) [VOL]` | Jouer un son. | [13](13-son-clavier-temps.md) |
| `〉SOUND stop / name [NAME]` | Arrêter (`ALL` = tous). | [13](13-son-clavier-temps.md) |

### Outils — [14](14-tools.md)

| Bloc | Sortie |
|---|---|
| `〉TOOL num/text / val` | `〉TOOL num/text` |
| `〉TOOL normalize / val … range of val … target range …` | `〉TOOL normalized` |
| `〉TOOL get speed / xy` | `〉TOOL speed` |
| `〉TOOL get rotate / from … to …` | `〉TOOL rotate` |
| `〉TOOL get distance / from … to …` | `〉TOOL distance` |
| `〉TOOL check collide / point … in box w/h … at …` | `〉TOOL collide?` |
| `〉TOOL get size of sprite` | `CACHE` : `<ID>.SIZEX` / `.SIZEY` |
| `〉TOOL Text split / split index … keep 1/2 … text …` | `〉TOOL Text split output` |
| `〉TOOL Text replace / val to replace … replace by … text …` | `〉TOOL Text replace output` |
| `〉TOOL Text normalize / val … target len. …` | `〉TOOL Text normalize output` |
| `〉TOOL Text space / space size … text …` | `〉TOOL Text space output` |

### Internes (ne pas utiliser)

`ᗢ CORE init`, `ᗢ CORE create uuid`, `ᗢ CORE update plan`, `ᗢ CORE size instant / val … current sprite …`.

---

## Spécifique à chaque moteur

### `ᗢ Core` — [02](02-fonctionnement.md), [09](09-scenes-fondus.md), [10](10-commandes-modules.md), [12](12-terminal.md)

| Bloc | Rôle |
|---|---|
| `Config - CATLIB / game version [GAME VERSION]` | **Point de départ** : prépare tout, règle la version du jeu, envoie `ready`. |
| `Config - GAME VERSION [VERSION]` / `Config - CATLIB VERSION [VERSION]` | Enregistre les versions dans `GAME`. |
| `Config - PROTECTED CHARS [CHARS]` | Caractères interdits dans les données (`{@}` par défaut). |
| `Config - CHECK USER [USER] / If first start, SET SCENE [SCENEFIRST] else [SCENENORMAL]` | Détecte un nouvel utilisateur. |
| `Config - WHEN READY COMMANDS` | Commandes envoyées au démarrage. |
| `Config - ON STOP` | Diffuse `ᗢ CATLIB - stopped`. |
| `Core - FACTORY RESET` | Remet `GAME`, `SAVE`, `CLOUD` à zéro. |
| `〉DEVLOG / new entry [TEXT] new version? [VERSION]` | Ajoute une entrée au journal `〉DEVLOGS`. |
| `〉TERMINAL write / type [TYPE] prefix [PREFIX] text [TEXT]` | Écrit une ligne dans le terminal. |
| `〉CMD / name … source [SOURCE]` | Version de Core de `〉CMD` (avec `source`). |
| `Lib - TERMINAL / KEY / LOG / SCENE / SAVE / CLOUD / CACHE / DATA / NOTES / HELP / CUSTOM` | Bibliothèques des commandes intégrées. |
| `Func - …` et `Core - …` | Fonctions internes (données, chiffrement, terminal…). |

### `ᗢ Camera` — [05](05-camera.md)

| Bloc | Rôle |
|---|---|
| `UPADTE CAM` | **À remplir** : logique de la caméra. |
| `〉UPDATE self` | Copie la position/zoom/rotation vers `〉CAM …`. |
| `〉PLAN set / layer [LAYER]`, `〉STAMP`, `〉KILL` | Équivalents de `set layer`, `stamp`, `kill`. |

### `ᗢ Cursor` — [06](06-curseur.md)

`〉CURSOR always`, `〉CURSOR idle`, `〉CURSOR on hover`, `〉CURSOR while hover`, `〉CURSOR on click`, `〉CURSOR while click`.

### `ᗢ UI` — [07](07-ui.md)

| Bloc | Rôle |
|---|---|
| `〉UI new / name … / xy … / size … / visible on scene … / idle sprite … / hover sfx … / type … action … value …` | Créer un élément. |
| `〉UI on create`, `〉UI always`, `〉UI idle`, `〉UI on hover`, `〉UI while hover`, `〉UI on click`, `〉UI while click`, `〉UI delete` | Événements de l'élément. |

### `ᗢ Text` — [08](08-texte.md)

| Bloc | Rôle |
|---|---|
| `〉WRITE at [X] [Y] ALIGN … HSL … SIZE … TEXT … GROUP … TYPE … FONT … SPACING ( 4 + … ) STAMP? … SCREEN VFX? …` | Écrire du texte. |
| `ᗢ CORE print terminal`, `〉SELF update function` | Interne (affichage du terminal) / rendu du texte. |

### `ᗢ Fader +` et `Extension` — [09](09-scenes-fondus.md), [10](10-commandes-modules.md)

| Bloc | Rôle |
|---|---|
| `〉MODULE set name / name [NAME]` | Donne son nom à la commande du module. |
| `ᗢ MODULE actions` | **À remplir** : ce que fait la commande. |
| `〉MEMORY / get [INDEX] ( to [TO] )` | Lit un mot de la commande reçue (`INDEX` 1 = nom, 2 = option, 3+ = arguments). |
| `ᗢ MODULE init`, `ᗢ MODULE half fade actions` | Interne (`Fader +`). |

---

## Toutes les commandes (`〉CMD` / terminal)

| Commande | Syntaxe |
|---|---|
| Scènes | `SCENE SET <n>` · `SCENE BACK` · `SCENE MAIN` · `SCENE SETMAIN <n>` · `SCENE RESET` |
| Données | `GAME / CACHE / SAVE / CLOUD` + `SET <n> [val]` · `GET <n>` · `ADD <n> <val>` · `CREATE <n> [val]` · `UNSET <n>` · `RENAME <n> <new>` · `CLEAR [chars]` · `FIND [chars]` |
| Sauvegarde | `SAVE EXPORT [RAW]` · `SAVE IMPORT` |
| Cloud | `CLOUD SEND` · `CLOUD SYNC` |
| Notes | `NOTE NEW <n> <contenu>` · `NOTE OPEN <n>` · `NOTE LIST` · `NOTE DEL <n>` · `HELP` |
| Système | `TERMINAL START` · `KEY START` · `LOG <TYPE> <texte>` |
| Fondu | `FADE <scène> <vitesse in> <vitesse out> [attente avant] [attente après]` |

## Toutes les variables globales utiles

`〉SCENE` · `〉TIME clock` · `〉TIME date` · `〉CAM x/y/z/rotation` · `〉CURSOR x/y/speed/speed x/speed y/clicked ?/hovering ?/text x/text y` · `〉USER` · `☁ 〉CLOUD global` · `〉DATA get output` · `〉PRESSED KEY` (liste) · `〉SAVECODES` (liste) · `〉FIND output` (liste) · `〉LOGS` (liste)

---

⬅️ [Recettes](15-recettes.md) · [Sommaire](../README.md) · ➡️ [Dépannage](17-depannage.md)
