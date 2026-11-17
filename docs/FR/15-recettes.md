# 15 · Recettes pas à pas

> **Objectif :** des mini-tutoriels à suivre dans l'ordre pour réaliser des choses concrètes. Chaque recette utilise les chapitres précédents.

⬅️ [Outils TOOLS](14-tools.md) · [Sommaire](../README.md) · ➡️ [Référence rapide](16-reference-rapide.md)

> [!NOTE]
> Les scripts ci-dessous sont des **exemples écrits pour cette documentation** à partir des blocs de Catlib. Ils sont donnés en pseudo-code : à toi de les assembler avec les vrais blocs.

---

## Recette 1 : Mon premier objet

**But :** une balle qui suit la souris en rebondissant, visible uniquement dans la scène `GAME`.

1. Clic droit sur `Frame` → **dupliquer**. Renomme la copie `Balle`.
2. Onglet *Costumes* : dessine un cercle (garde `Icon` et `_BLANK`).
3. **Supprime** le script d'exemple `quand je commence comme un clone / répéter indéfiniment` ([03 §7](03-frame.md#7-le-script-dexemple-dans-frame-à-supprimer-)).
4. Complète `〉SELF init` :

```text
DEFINE 〉SELF init
    〉MOVE set / xy [0] [0]
    〉SIZE set / val [40]
    〉SELF set layer / layer [100]
    〉FX ghost / val [100] speed [1]
    afficher
```

5. Complète `〉SELF on tick` :

```text
DEFINE 〉SELF on tick
    si pas < 〉SCENE = [GAME] > alors
        〉SELF kill
    〉FX ghost / val [0] speed [5]
    〉MOVE bounce / xy [〉CURSOR x] [〉CURSOR y] damp [6] bounciness [2]
    〉UPDATE normal
```

6. Ajoute la naissance :

```text
quand je reçois [SCENE GAME]
créer un clone de [moi-même]
```

7. 🏁 Lance le jeu, appuie sur `&` et tape `SCENE SET GAME`. La balle apparaît en fondu et suit la souris.

> [!WARNING]
> **La balle n'apparaît pas ?** Vérifie que ton costume n'est pas `Icon` ou `_BLANK`, que `〉FX ghost` va bien vers `0`, et que tu as supprimé le script d'exemple.

---

## Recette 2 : Un menu avec un bouton et un fondu

**But :** un bouton « JOUER » dans `MENU` qui emmène vers `GAME` avec un fondu.

1. Dans `ᗢ UI`, ajoute les costumes `PLAY_IDLE`, `PLAY_HOVER`, `PLAY_CLICK` (garde les sons `HOVER` et `CLICK`).
2. Dans `ᗢ UI` :

```text
quand je reçois [SCENE MENU]
〉UI new / name [play] / xy [0] [-40] start offset [0] [-80] / size [30] size offset [-20]
    / visible on scene [MENU] OR hide on scene []
    / idle sprite [PLAY_IDLE] hover sprite [PLAY_HOVER] click sprite [PLAY_CLICK]
    / hover sfx [HOVER] click sfx [CLICK]
    / type [BUTTON] action [FADE] value [GAME]

DEFINE 〉UI on click
    si < 〉UI action = [FADE] > alors
        〉CMD / name [FADE] option [〉UI value] args [20 20] [0.2] [] awaited? [NO]
```

3. Lance : le bouton arrive en rebondissant, réagit au survol, et un clic lance le fondu vers `GAME` ; le bouton disparaît car la scène n'est plus `MENU`.

Voir [07 · UI](07-ui.md) et [09 · Scènes et fondus](09-scenes-fondus.md).

---

## Recette 3 : Une caméra qui suit le joueur

**But :** une caméra qui suit le sprite `Joueur` avec un petit retard, et un décor qui bouge avec elle.

1. Dans `ᗢ Camera`, modifie `UPADTE CAM` :

```text
DEFINE UPADTE CAM
    〉SIZE set / val [100]
    〉MOVE bounce / xy [(x position) of [Joueur]] [(y position) of [Joueur]] damp [8] bounciness [2]
```

2. Dans ton **décor** (dupliqué de `Frame`), remplace dans `〉SELF on tick` :

```text
〉UPDATE normal   →   〉UPDATE camera / origine [] mirror [1]
```

3. Teste. Si le décor part dans le **mauvais sens**, passe `mirror` à `-1` (ou donne la position opposée à la caméra, voir [05](05-camera.md)).
4. Laisse l'**interface** (score, vies) en `〉UPDATE normal` pour qu'elle reste fixe.

---

## Recette 4 : Afficher un score avec des zéros

**But :** `SCORE 000042` en haut à gauche, qui se met à jour tout seul.

1. À la création du jeu, initialise : `〉DATA / source [SAVE] action [CREATE] var [SCORE] to [0]`.
2. Quand le joueur gagne des points : `〉DATA / source [SAVE] action [ADD] var [SCORE] to [10]`.
3. Dans `ᗢ Text` :

```text
quand je reçois [ᗢ CATLIB - tick]
si < 〉SCENE = [GAME] > alors
    〉DATA / source [SAVE] action [GET] var [SCORE] to []
    〉TOOL Text normalize / val [〉DATA get output] target len. [6]
    〉WRITE at [-230] [165] ALIGN [l] HSL [0] [0] [100] SIZE [2]
            TEXT [(join [SCORE ] 〉TOOL Text normalize output)]
            GROUP [] TYPE [] FONT [] SPACING ( 4 + [0] ) STAMP? [YES] SCREEN VFX? [NO]
```

Voir [08 · Texte](08-texte.md) et [14 · TOOLS](14-tools.md).

---

## Recette 5 : Sauvegarder et charger avec un code

**But :** deux boutons « SAUVEGARDER » et « CHARGER ».

**Sauvegarder** (dans un `〉UI on click`) :

```text
〉DATA / source [SAVE] action [SET] var [SN] to [Alex]       ← nom affiché dans l'en-tête du code
〉CMD / name [SAVE] option [EXPORT] args [] [] [] awaited? []
montrer la liste [〉SAVECODES]
```

Le joueur copie la première ligne de la liste (la plus récente).

**Charger** :

```text
〉CMD / name [SAVE] option [IMPORT] args [] [] [] awaited? []
```
Une boîte de saisie s'ouvre ; le joueur colle son code.

> [!WARNING]
> Vérifie le point **« SAVE IMPORT »** dans [17 · Limites connues](17-depannage.md) avant de t'appuyer sur le chargement, et pense aux **restrictions de caractères** ([11 §4](11-donnees-sauvegardes.md#4-les-codes-de-sauvegarde-safe-code)).

---

## Recette 6 : Créer sa propre commande

**But :** une commande `COIN ADD <n>` utilisable depuis n'importe quel sprite.

1. Duplique `Extension`, renomme-le `Module COIN`.
2. Remplace `〉MODULE set name / name [// CHANGE //]` par `〉MODULE set name / name [COIN]`.
3. Remplis `ᗢ MODULE actions` :

```text
DEFINE ᗢ MODULE actions
    〉MEMORY / get [2]
    si < ᗢ CORE memory = [ADD] > alors
        〉MEMORY / get [3]
        〉DATA / source [SAVE] action [ADD] var [COINS] to [ᗢ CORE memory]
```

4. Utilise-la partout : `〉CMD / name [COIN] option [ADD] args [5] [] [] awaited? [NO]`.
5. Vérifie dans le terminal : `COIN ADD 5` puis `SAVE FIND COINS`.

Voir [10 · Commandes et modules](10-commandes-modules.md#6-créer-tes-propres-commandes-avec-extension).

---

## Recette 7 : Un logo qui réagit à la souris

**But :** un logo qui flotte et se déplace légèrement à l'opposé de la souris.

```text
DEFINE 〉SELF init
    〉MOVE set / xy [0] [20]
    〉SIZE set / val [60]
    〉FX ghost / val [100] speed [1]
    afficher

DEFINE 〉SELF on tick
    〉FX ghost / val [0] speed [6]
    〉MOVE+ parallax / damp [30] for [XY]
    〉MOVE bounce / xy [0] [20] damp [3] bounciness [2]
    〉UPDATE normal
```

Plus `damp` est **grand**, moins l'objet bouge. Essaie `15` (fort) et `60` (discret). Pour que la **taille** ou l'**inclinaison** réagissent aussi, alimente d'abord la vitesse de la souris ([06 §5](06-curseur.md#5-alimenter-la-vitesse-de-la-souris)).

---

⬅️ [Outils TOOLS](14-tools.md) · [Sommaire](../README.md) · ➡️ [Référence rapide](16-reference-rapide.md)
