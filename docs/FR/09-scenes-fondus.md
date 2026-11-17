# 09 · Scènes et fondus

> **Objectif :** organiser ton jeu en « écrans » (menu, jeu, options…) et passer de l'un à l'autre, avec un fondu si tu veux.

⬅️ [Texte](08-texte.md) · [Sommaire](../README.md) · ➡️ [Commandes et modules](10-commandes-modules.md)

---

## 1. Qu'est-ce qu'une scène ?

Une **scène** est un « écran » de ton jeu : `MENU`, `GAME`, `OPTIONS`, `GAMEOVER`… Chacune a son **nom** (un mot, **sans espace**). Catlib retient la scène actuelle dans la variable **`〉SCENE`** et diffuse un message à chaque changement.

Le système t'évite le « bazar » : chaque écran réagit à **son** message et ne s'occupe que de ses propres objets.

## 2. Changer de scène

On utilise une **commande** (voir [10 · Commandes](10-commandes-modules.md)) :

```text
〉CMD / name [SCENE] option [SET] args [GAME] [] [] awaited? [NO]
```

Ou, dans le terminal : `SCENE SET GAME`.

| Commande | Effet |
|---|---|
| `SCENE SET <nom>` | Va à la scène `<nom>`. La scène précédente est mémorisée. |
| `SCENE BACK` | Retourne à la scène **précédente**. |
| `SCENE MAIN` | Retourne à la scène **principale** et efface l'historique. |
| `SCENE SETMAIN <nom>` | Définit la scène principale. |
| `SCENE RESET` | Efface l'historique mais garde la scène actuelle. |

Un changement de scène :
1. mémorise l'ancienne scène dans la liste `ᗢ CORE scenes` ;
2. met à jour `〉SCENE` ;
3. écrit un message dans le terminal ;
4. diffuse `ᗢ SCENE new` ;
5. diffuse **`SCENE <nom>`** (sauf si tu ajoutes `NO` juste après le nom : `SCENE SET GAME NO`).

> [!NOTE]
> Si tu demandes une scène **identique à la scène actuelle**, ou une scène **vide**, rien ne se passe.

## 3. Construire une scène

Pour chaque scène, tes objets réagissent au message **`SCENE <nom>`** pour **naître**, et **se suppriment** quand la scène change :

```text
quand je reçois [SCENE GAME]
créer un clone de [moi-même]

〉SELF on tick :
    si pas < 〉SCENE = [GAME] > alors
        〉SELF kill
    … ta logique …
    〉UPDATE normal
```

> [!TIP]
> Ce test « si la scène n'est plus la mienne, je disparais » est la façon la plus sûre de nettoyer. Pour l'UI, c'est automatique grâce à `visible on scene` ([07](07-ui.md)).

### Attention : le message STOP

Catlib diffuse aussi `SCENE <nom> STOP` à chaque changement. D'après le code, ce message contient le nom de la **nouvelle** scène (et non de l'ancienne). Pour détecter le départ d'une scène, **compare `〉SCENE` à chaque tick** comme ci-dessus plutôt que d'utiliser ce message.

## 4. Les fondus : le module `FADE`

Le sprite **`ᗢ Fader +`** ajoute la commande `FADE`, qui assombrit l'écran, **change de scène au moment le plus noir**, puis éclaircit.

```text
FADE <SCENE_NAME> [FADE_IN_SPD] [FADE_OUT_SPD] [WAIT_IN] [WAIT_OUT]
```

| Paramètre | Rôle |
|---|---|
| `SCENE_NAME` | Scène vers laquelle aller. |
| `FADE_IN_SPD` | Vitesse de l'assombrissement (ex. `20`). Plus grand = plus rapide. |
| `FADE_OUT_SPD` | Vitesse de l'éclaircissement (ex. `20`). |
| `WAIT_IN` | Secondes d'attente **avant** le changement de scène (écran noir). |
| `WAIT_OUT` | Secondes d'attente **avant** de lancer l'éclaircissement. |

**Exemple :**
```text
〉CMD / name [FADE] option [GAME] args [20 20] [0.5] [] awaited? [NO]
```
(`name` = `FADE`, `option` = nom de la scène, puis les valeurs séparées par des espaces.)

Déroulement : écran qui noircit par pas de 20 % → attente `WAIT_IN` → **`SCENE SET GAME`** → attente `WAIT_OUT` → écran qui s'éclaircit → fini.

> [!NOTE]
> Le commentaire du bloc dans `ᗢ Fader +` indique des valeurs par défaut de `-20` et `20`, mais le code ne les applique pas tout seul : **donne toujours des valeurs**, par exemple `20 20`. L'autocomplétion du terminal écrit la même commande ainsi : `FADE <n> <showtime> <hidetime> [actiondelay] [fadedelay]`.

Le fondu utilise le costume `BLACK` du sprite, recouvrant tout l'écran.

## 5. Premier démarrage et logo

Au démarrage, `Config - CHECK USER` compare ton nom d'utilisateur Scratch à la variable `〉USER` :

- **Différent** (nouvel utilisateur) : `〉USER` est mis à jour, le message `ᗢ CATLIB - first start` est diffusé, et la scène demandée est le **premier démarrage** (`LOGO`).
- **Identique** : la scène `MENU` est demandée.

Le sprite `INTRO V12` joue ensuite son animation de logo et demande `SCENE SET MENU`. Pour utiliser ton propre logo, supprime `INTRO V12` et envoie toi-même la commande `SCENE SET MENU` à la fin.

> [!TIP]
> Le message `ᗢ CATLIB - first start` est parfait pour déclencher un **tutoriel** réservé aux nouveaux joueurs.

## 6. Pense-bête

| ✅ À faire | ❌ À éviter |
|---|---|
| Noms de scènes en **un mot** (`GAME`, `OPTIONS`) | Espaces dans le nom (les mots sont séparés par des espaces dans les commandes) |
| Noms **distincts** qui ne se contiennent pas | `GAME` et `GAME2` ensemble |
| Nettoyer ses objets en changeant de scène | Laisser des clones d'une scène dans la suivante |
| `FADE` avec des vitesses explicites | `FADE` sans vitesses |

---

⬅️ [Texte](08-texte.md) · [Sommaire](../README.md) · ➡️ [Commandes et modules](10-commandes-modules.md)
