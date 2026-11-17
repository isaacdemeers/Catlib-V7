# 11 · Données et sauvegardes

> **Objectif :** stocker, lire et modifier des données avec **un seul bloc** (`〉DATA`), choisir le bon « espace » de stockage (`GAME`, `SAVE`, `CACHE`, `CLOUD`) et générer des **codes de sauvegarde** pour tes joueurs.

⬅️ [Commandes et modules](10-commandes-modules.md) · [Sommaire](../README.md) · ➡️ [Terminal](12-terminal.md)

---

## 1. Les 4 espaces de stockage

Catlib range les données dans **quatre listes**, appelées « sources ». Pense à quatre tiroirs :

| Source | Liste | À utiliser pour | Durée de vie |
|---|---|---|---|
| **`GAME`** | `ᗢ DATA game` | Les **réglages** du jeu : volumes, touches, version, notes. | Conservée pendant la session (voir §6). |
| **`SAVE`** | `ᗢ DATA save` | La **progression du joueur** : niveau, argent, objets… C'est elle qui est exportée en **code de sauvegarde**. | Conservée pendant la session, **exportable**. |
| **`CACHE`** | `ᗢ DATA cache` | Les données **temporaires** (calculs, informations d'interface). | **Vidée à chaque lancement** du drapeau vert. |
| **`CLOUD`** | `ᗢ DATA cloud` | Des données **partagées** via la variable cloud. | Voir §5. |

### Comment sont rangées les données ?

Chaque donnée a un **nom** et une **valeur**, rangés l'un après l'autre dans la liste. Le nom est entouré d'**accolades** :

```text
{PLAYER.NAME}  Alex
{PLAYER.HP}    80
{LEVEL}        3
```
→ la liste contient `{PLAYER.NAME}`, `Alex`, `{PLAYER.HP}`, `80`, `{LEVEL}`, `3`. Tu n'as jamais à écrire les accolades : le bloc `〉DATA` les ajoute.

> [!TIP]
> Donne des noms **organisés avec un point** (`PLAYER.HP`, `OPTIONS.VOLUME`). Ça rend les données lisibles et permet de les retrouver en groupe avec `CLEAR` et `FIND`.

## 2. Le bloc `〉DATA`

```text
〉DATA / source [SOURCE] action [ACTION] var [NAME] to [VAL]
```

| Entrée | Rôle |
|---|---|
| `source` | `GAME`, `SAVE`, `CACHE` ou `CLOUD`. |
| `action` | Ce qu'on fait (tableau ci-dessous). |
| `var` | Le **nom** de la donnée. |
| `to` | La **valeur** (ou le nouveau nom pour `RENAME`). |

### Les actions

| Action | Effet | Exemple |
|---|---|---|
| `SET` | **Crée ou modifie** la donnée. | `source SAVE action SET var LEVEL to 3` |
| `GET` | **Lit** la donnée : le résultat est dans la variable `〉DATA get output` (ou `NULL` si elle n'existe pas). | `source SAVE action GET var LEVEL` |
| `ADD` | **Ajoute** un nombre à la valeur existante (rien si la donnée n'existe pas). | `source SAVE action ADD var COINS to 5` |
| `CREATE` | Crée la donnée **seulement si elle n'existe pas** (valeur par défaut). | `source SAVE action CREATE var COINS to 0` |
| `UNSET` | **Supprime** la donnée. | `source SAVE action UNSET var COINS` |
| `RENAME` | **Renomme** la donnée (`to` = nouveau nom). | `source SAVE action RENAME var HP to HEALTH` |
| `CLEAR` | Supprime **toutes** les données dont le nom **contient** `var` ; si `var` est vide, **vide toute la liste**. | `source SAVE action CLEAR var PLAYER.` |

**Exemple : lire un score puis l'afficher**

```text
〉DATA / source [SAVE] action [GET] var [SCORE] to []
si < pas ( 〉DATA get output = [NULL] ) > alors
    … utilise 〉DATA get output …
```

> [!IMPORTANT]
> **Lire**, c'est toujours **deux étapes** : (1) exécuter `GET`, (2) lire la variable **`〉DATA get output`**. Si la donnée n'existe pas, `〉DATA get output` vaut **`NULL`**.

### Caractères interdits

Les caractères **`{`**, **`@`** et **`}`** sont **protégés** (liste `ᗢ CORE pchars`, réglable avec `Config - PROTECTED CHARS`) car ils servent à structurer les données et les commandes. Si le nom ou la valeur en contient, **l'opération est ignorée sans message**.

### Deux versions du bloc

| | Dans **`ᗢ Core`** | Dans tes sprites (copie de `Frame`) |
|---|---|---|
| Écrit un message dans le terminal | ✅ oui (`set {X} = 5`) | ❌ non |
| `ADD` sur `GAME` | ✅ | ❌ absent |
| Autres actions et sources | ✅ | ✅ |

Depuis le **terminal** ou un `〉CMD`, c'est la version de Core qui travaille.

### Retrouver des données : `FIND`

Via une commande (ou le terminal) :

```text
〉CMD / name [SAVE] option [FIND] args [PLAYER] [] [] awaited? []
```
Affiche dans le terminal tous les noms **contenant** `PLAYER` avec leurs valeurs, et les range dans la liste `〉FIND output` (nom, valeur, nom, valeur…). Disponible pour `GAME`, `SAVE`, `CACHE` et `CLOUD`.

## 3. Quoi mettre où ? Exemples

| Donnée | Source | Pourquoi |
|---|---|---|
| Volume de la musique | `GAME` | Réglage du jeu (`VOL.MUSIC` existe déjà). |
| Niveau atteint, argent, inventaire | `SAVE` | À sauvegarder dans le code. |
| Position d'un ennemi pendant un combat | `CACHE` | Temporaire. |
| Meilleur score partagé | `CLOUD` | Visible par tous (voir §5). |

### Les données créées par Catlib dans `GAME`

| Nom | Valeur par défaut | Rôle |
|---|---|---|
| `TERM.KEY.TOGGLE` | `&` | Touche d'ouverture du terminal |
| `TERM.KEY.BACK` | `-` | Touche pour effacer dans le terminal |
| `TERM.TOGGLE` | `ON` / `OFF` | État du terminal |
| `VOL.MASTER`, `VOL.MUSIC`, `VOL.SFX` | `100` | Volumes (voir [13](13-son-clavier-temps.md)) |
| `GAME_VERSION`, `CATLIB_VERSION` | ex. `1.0`, `7` | Versions |
| `TERMINAL.HELP` | texte | Texte de la commande `HELP` |
| `NOTE.<nom>` | texte | Notes du terminal |

> [!WARNING]
> **Nettoie avant de publier.** Le fichier fourni contient des données de test (notes, valeurs d'exemple dans `ᗢ DATA save`, anciens codes dans `〉SAVECODES`). Vide ce dont tu n'as pas besoin.

## 4. Les codes de sauvegarde (Safe Code)

Sur Scratch, les listes sont **remises à zéro** quand un joueur quitte la page. Pour qu'il garde sa progression, tu lui donnes un **code** qu'il copie et colle à son prochain retour. Catlib le génère en **un seul appel**.

### Générer un code

```text
〉CMD / name [SAVE] option [EXPORT] args [] [] [] awaited? []
```

Le code est ajouté **en haut** de la liste **`〉SAVECODES`** (10 codes maximum gardés). Affiche cette liste (bloc *montrer la liste*) pour que le joueur le copie.

Un code ressemble à :
```text
[Alex 11/16/2026 01:28] 2073600092423855342742283654364236554042…
```

| Partie | Signification |
|---|---|
| `[Alex 11/16/2026 01:28]` | **En-tête lisible** : nom de sauvegarde, date, heure. Le nom vient de la donnée `SN` de `SAVE` (sinon `NULL`). |
| `2073600092` | La **clé** (10 chiffres). |
| `4238553427…` | Les données **chiffrées**, 2 chiffres par caractère. |

Pour donner un nom au code : `〉DATA / source [SAVE] action [SET] var [SN] to [Alex]`.

> [!TIP]
> Avec l'option `RAW` (`SAVE EXPORT RAW`), le code est ajouté **non chiffré** (par exemple `{4}10{10}7…`) : pratique pour **déboguer**.

### Comment le chiffrement fonctionne (version simple)

1. Toutes les données de `SAVE` sont mises bout à bout : `{LEVEL}3{COINS}50`.
2. Une **clé de 10 chiffres** est fabriquée à partir de ton **pseudo Scratch** et d'un nombre aléatoire.
3. Chaque caractère est remplacé par son **numéro** dans la liste `ᗢ CORE keys`, **plus** un chiffre de la clé (qui change à chaque caractère).
4. Le code final = clé + chiffres.

> [!NOTE]
> C'est de l'**obfuscation** (brouillage) : elle décourage la modification à la main d'un code, mais le principe est dans le projet, donc ce n'est pas une protection contre quelqu'un de déterminé.

### Restrictions importantes sur les données sauvegardées

> [!WARNING]
> - Seuls les **caractères de la liste `ᗢ CORE keys`** sont conservés : `a–z`, `0–9`, `& é # " ' { ( [ à è _ ç @ ) ] } < > ! : / ; . ? , % - * + $ = ~` et l'espace.
> - Le chiffrement ne distingue **pas les majuscules** : tout ressortira en **minuscules**.
> - Un caractère hors liste (`ü`, `€`, `ê`…) est mal restitué.
> - Les noms et valeurs ne doivent pas contenir `{`, `}` ni `@`.

### Charger un code

```text
〉CMD / name [SAVE] option [IMPORT] args [] [] [] awaited? []
```
Une boîte de saisie s'ouvre (« PLEASE, PASTE CODE HERE. Leave empty to cancel »). Le joueur colle son code. Catlib lit la clé, déchiffre, et reconstruit les données.

> [!WARNING]
> Dans le fichier fourni, l'étape finale de `SAVE IMPORT` (copier les données déchiffrées dans `ᗢ DATA save`) compare la source à `GAME` au lieu de `SAVE` : **le chargement semble ne rien écrire dans `ᗢ DATA save`**. À vérifier et corriger avant de t'appuyer dessus. Détails et correctif : [17 · Limites connues](17-depannage.md).

## 5. Le cloud

La variable **`☁ 〉CLOUD global`** permet de partager des données entre tous les joueurs.

| Commande | Effet |
|---|---|
| `CLOUD SEND` | Chiffre la liste `ᗢ DATA cloud` et l'écrit dans la variable cloud. |
| `CLOUD SYNC` | Lit la variable cloud et recopie le contenu dans `ᗢ DATA cloud`. |
| `CLOUD SET/GET/ADD/CREATE/UNSET/RENAME/CLEAR/FIND` | Comme les autres sources, mais sur `ᗢ DATA cloud`. |

> [!WARNING]
> - Il n'y a **qu'une seule** variable cloud : toutes les données cloud tiennent dans **une** valeur partagée (les variables cloud de Scratch sont limitées à des **chiffres** et à une petite longueur).
> - Elle ne marche que sur le **site officiel de Scratch**, avec un compte connecté.
> - Ce que `CLOUD SEND` écrit remplace ce qu'un autre joueur a envoyé.

## 6. Et après la fermeture de la page ?

| Situation | Que deviennent les données ? |
|---|---|
| Joueur qui relance le drapeau vert | `GAME`, `SAVE`, `CLOUD` **restent** ; `CACHE` est **vidée**. |
| Joueur qui quitte et revient plus tard | Tout revient aux valeurs enregistrées **dans le fichier du projet**. Il doit **recoller son code**. |
| Toi, qui enregistres le projet | Le contenu actuel des listes est enregistré **avec le projet** (d'où l'importance de nettoyer). |

Le bloc `Core - FACTORY RESET` (réinitialisation d'usine) vide `GAME`, `SAVE` et `CLOUD` et remet le terminal à zéro, mais **aucun bouton ne l'appelle** dans le projet : branche-le toi-même si besoin.

---

⬅️ [Commandes et modules](10-commandes-modules.md) · [Sommaire](../README.md) · ➡️ [Terminal](12-terminal.md)
