# 08 · Moteur de texte

> **Objectif :** afficher du texte à l'écran avec le bloc `〉WRITE` : alignement, taille, luminosité, effet d'écran courbé, et même tes propres polices.

⬅️ [UI Builder](07-ui.md) · [Sommaire](../README.md) · ➡️ [Scènes et fondus](09-scenes-fondus.md)

---

## 1. Le principe

Scratch n'affiche pas du texte « libre » à l'écran. Catlib le fait en **dessinant chaque lettre** : une lettre = un **costume** du sprite `ᗢ Text`. Le bloc `〉WRITE` place les lettres une par une, côte à côte.

Ce sprite contient **102 costumes** : 99 caractères de la police `default` et 3 costumes techniques (`Icon`, `_BLANK`, `_BLACK`).

> [!IMPORTANT]
> `〉WRITE` est défini **dans le sprite `ᗢ Text`**. Écris donc tes scripts d'affichage de texte **dans ce sprite**.

## 2. Le bloc `〉WRITE`

```text
〉WRITE at [X] [Y] ALIGN [ALIGN] HSL [COLOR] [OPACITY] [BRIGHT] SIZE [SIZE]
        TEXT [TEXT] GROUP [GROUP] TYPE [TYPE] FONT [FONT]
        SPACING ( 4 + [SPACING] ) STAMP? [STAMP] SCREEN VFX? [SCREENVFX]
```

| Entrée | Rôle | Valeurs |
|---|---|---|
| `X`, `Y` | Position du texte. | coordonnées de la scène |
| `ALIGN` | Alignement par rapport à `X`. | `l` (gauche), `c` (centre), `r` (droite) |
| `COLOR` | Effet **couleur** (teinte). | `0` à `200` |
| `OPACITY` | Effet **fantôme** : attention, `0` = **opaque**, `100` = invisible. | `0` à `100` |
| `BRIGHT` | Effet **luminosité**. | `-100` à `100` |
| `SIZE` | Taille de la police (la taille du sprite est `10 × SIZE` %). | `2` = titre, `1.6` = petit texte |
| `TEXT` | Le texte à afficher. | texte ou nombre |
| `GROUP` | Option de groupe. `AUTOSIZE` réduit la taille quand le texte dépasse 4 caractères. | vide ou `AUTOSIZE` |
| `TYPE` | Étiquette libre, stockée dans la variable `ᗢ TEXT type`. | libre |
| `FONT` | Nom de la police. **Vide** = `default`. | voir §5 |
| `SPACING ( 4 + n )` | Espace entre lettres : largeur d'une lettre = `(4 + n) × SIZE`. | `0` = normal |
| `STAMP?` | `YES` : tamponné avec le stylo (rapide, **recommandé**). Autre : un clone par lettre. | `YES` / `NO` |
| `SCREEN VFX?` | `YES` : applique l'**effet d'écran courbé** (voir §4). | `YES` / `NO` |

> [!NOTE]
> Le groupe d'entrées s'appelle `HSL` dans le bloc, mais ce sont en réalité les effets Scratch **couleur**, **fantôme** et **luminosité**. La police `default` est dessinée en **blanc** : l'effet couleur ne teinte pas du blanc pur, utilise plutôt `BRIGHT` pour griser (valeur négative) ou `OPACITY` pour rendre transparent.

## 3. Afficher du texte : la règle d'or

Comme **Core efface le stylo à chaque image**, le texte tamponné doit être **réécrit à chaque image**. On met donc `〉WRITE` dans un script qui tourne à chaque `tick`, **dans `ᗢ Text`** :

```text
quand je reçois [ᗢ CATLIB - tick]
si < 〉SCENE = [MENU] > alors
    〉WRITE at [0] [100] ALIGN [c] HSL [0] [0] [100] SIZE [3] TEXT [MON JEU]
            GROUP [] TYPE [] FONT [] SPACING ( 4 + [0] ) STAMP? [YES] SCREEN VFX? [NO]
```

> [!WARNING]
> Si tu n'appelles `〉WRITE` qu'**une seule fois**, le texte n'apparaîtra qu'une image avant d'être effacé. Dans le fichier fourni, le texte `[ see inside ]` clignotant est un exemple : il écrit pendant 20 images, puis attend 0,5 s.

### Exemple : un score avec des zéros devant

```text
〉TOOL Text normalize / val [score] target len. [6]
〉WRITE at [-230] [165] ALIGN [l] … TEXT [〉TOOL Text normalize output] … STAMP? [YES]
```
Résultat : `000042`. Voir [14 · TOOLS](14-tools.md).

## 4. L'effet d'écran courbé (`SCREEN VFX?`)

Avec `YES`, chaque lettre est **déplacée en hauteur et inclinée** selon sa distance au centre de l'écran : le texte semble posé sur un écran bombé de vieille télévision. Plus le texte est près des bords, plus l'effet est visible. (Le journal des versions mentionne une correction de la rotation des lettres pour cet effet.)

## 5. Les caractères et les polices

### Caractères disponibles dans la police `default`

```text
espace ! " # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @
A–Z a–z [ ] ^ _ { } £ à â ç è é € ᗢ
```

> [!WARNING]
> - Les **majuscules et minuscules utilisent le même dessin**.
> - **Absents** : `\`, `|`, `~`, accent grave seul, et les lettres `ê î ô ù û ë ï œ`. Une lettre absente n'affiche rien.

### Ajouter une police

Le bloc cherche le costume nommé **`<FONT>_<caractère>`**. Avec `FONT` vide, il cherche `default_a`, `default_b`… Pour créer la police `comic` :

1. Dans `ᗢ Text`, ajoute des costumes nommés `comic_a`, `comic_b`, `comic_1`, `comic_!`…
2. Appelle `〉WRITE` avec `FONT [comic]`.

> [!NOTE]
> Seule la police `default` est fournie dans ce fichier. Les autres polices sont à créer.

## 6. Suivre la caméra

Dans le fichier fourni, `ᗢ Text` applique `〉UPDATE self` (sans caméra) dans son bloc `〉SELF update function` : le texte **reste fixe à l'écran** même si la caméra bouge (idéal pour une interface). Un bloc `〉UPDATE camera` est disponible dans le sprite : pour un texte qui **suit le monde**, remplace `〉UPDATE self` par `〉UPDATE camera` dans `〉SELF update function` (voir [05 · Caméra](05-camera.md)).

## 7. Le terminal utilise ce moteur

Quand tu ouvres le terminal (`&`), c'est `ᗢ Text` qui dessine les lignes (`ᗢ CORE print terminal`), l'heure et le titre `terminal v2.0`. Voir [12 · Terminal](12-terminal.md).

## 8. Aide-mémoire

| Je veux… | Je fais… |
|---|---|
| Centrer | `ALIGN [c]` avec `X = 0` |
| Aligner à droite | `ALIGN [r]` |
| Texte semi-transparent | `OPACITY [50]` |
| Texte plus sombre | `BRIGHT [-50]` |
| Lettres plus espacées | `SPACING ( 4 + [2] )` |
| Réduire automatiquement les longs textes | `GROUP [AUTOSIZE]` |
| Séparer les milliers | `〉TOOL Text space` ([14](14-tools.md)) |

---

⬅️ [UI Builder](07-ui.md) · [Sommaire](../README.md) · ➡️ [Scènes et fondus](09-scenes-fondus.md)
