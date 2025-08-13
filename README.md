# C🥖

## Le langage de programmation français pour les développeurs qui ont du goût !

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Licence](https://img.shields.io/badge/licence-CeCILL-green)

## Qu'est-ce que C🥖 ?

C🥖 est un transpilateur qui permet de programmer en C mais avec une syntaxe française savoureuse. Fini le temps où vous deviez apprendre l'anglais pour coder ! Avec C🥖, vous pouvez écrire du code dans la langue de Molière tout en profitant de la puissance du langage C.

## Fonctionnalités 🧑‍🍳

- **Traduction bidirectionnelle** : Traduisez du C vers C🥖 et vice-versa
- **Analyse lexicale intelligente** : Notre lexer comprend le contexte et ne traduit que les vrais mots-clés
- **Conservation du code source** : Les commentaires, chaînes et identifiants restent intacts
- **Interface en ligne de commande simple** : Facile à utiliser

## Installation 📦

```bash
# Cloner le dépôt
git clone https://github.com/votre-compte/cbaguette.git
cd cbaguette

# Installer les dépendances
npm install

# Compiler le projet
npm run build
```

## Utilisation 🚀

### Méthode 1 : Via npm start

```bash
# Traduire du C vers C🥖
npm start -- translate mon_programme.c mon_programme_baguette.cb

# Compiler du C🥖 vers C
npm start -- compile mon_programme_baguette.cb mon_programme.c
```

### Méthode 2 : Exécuter directement le CLI

```bash
# Traduire du C vers C🥖
node dist/main.js translate mon_programme.c mon_programme_baguette.cb

# Compiler du C🥖 vers C
node dist/main.js compile mon_programme_baguette.cb mon_programme.c
```

## Exemples savoureux 🍷

### Programme C standard

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

### Équivalent C🥖

```c
#include <stdio.h>

entier main() {
    printf("Hello, World!\n");
    retourner 0;
}
```

### Un exemple plus élaboré

**Version C :**
```c
#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int number = 5;
    printf("Factorial of %d is %d\n", number, factorial(number));
    return 0;
}
```

**Version C🥖 :**
```c
#include <stdio.h>

entier factorial(entier n) {
    si (n <= 1) retourner 1;
    retourner n * factorial(n - 1);
}

entier main() {
    entier number = 5;
    printf("Factorial of %d is %d\n", number, factorial(number));
    retourner 0;
}
```

## Tableau des mots-clés 📝

| Mot-clé C | Mot-clé C🥖 | Catégorie | Description |
|-----------|-------------------|-----------|-------------|
| `void` | `néant` | Type | Type vide |
| `char` | `caractère` | Type | Caractère |
| `int` | `entier` | Type | Entier |
| `float` | `flottant` | Type | Nombre à virgule flottante |
| `double` | `flottantprécis` | Type | Flottant double précision |
| `short` | `entiercourt` | Type | Entier court |
| `long` | `entierlong` | Type | Entier long |
| `signed` | `ouijeveuxlesigne` | Type | Avec signe |
| `unsigned` | `jmencarrelaracedusigne` | Type | Sans signe |
| `bool` | `boule` | Type | Booléen |
| `struct` | `classe` | Type | Structure |
| `union` | `union` | Type | Union |
| `enum` | `énumération` | Type | Énumération |
| `if` | `si` | Contrôle | Condition si |
| `else` | `sinon` | Contrôle | Condition sinon |
| `switch` | `enfonctionde` | Contrôle | Sélection multiple |
| `case` | `lorsque` | Contrôle | Cas dans un switch |
| `default` | `pardéfaut` | Contrôle | Cas par défaut |
| `for` | `pour` | Contrôle | Boucle pour |
| `while` | `tantque` | Contrôle | Boucle tant que |
| `do` | `faire` | Contrôle | Boucle faire... tant que |
| `break` | `arrêter` | Contrôle | Sortir d'une boucle |
| `continue` | `continuer` | Contrôle | Passer à l'itération suivante |
| `return` | `retourner` | Contrôle | Retourner une valeur |
| `goto` | `allerà` | Contrôle | Aller à un label |
| `const` | `constante` | Qualificateur | Valeur constante |
| `volatile` | `volatile` | Qualificateur | Variable volatile |
| `restrict` | `restreint` | Qualificateur | Pointeur non aliasé |
| `inline` | `linéarisé` | Qualificateur | Fonction en ligne |
| `sizeof` | `taillede` | Opérateur | Taille en octets |
| `true` | `vrai` | Constante | Vrai |
| `false` | `faux` | Constante | Faux |
| `nullptr` | `pointeurverslenéant` | Constante | Pointeur nul |
| `auto` | `automatique` | Stockage | Variable automatique |
| `static` | `statique` | Stockage | Variable statique |
| `extern` | `externe` | Stockage | Variable externe |
| `typedef` | `enregistrertype` | Stockage | Définition de type |
| `thread_local` | `fillocal` | Stockage | Variable locale au thread |

## Comment ça marche ? 🔍

C🥖 utilise un lexer sophistiqué qui analyse le code source et identifie correctement les mots-clés en fonction de leur contexte :

1. **Analyse lexicale** : Le code est décomposé en tokens (mots-clés, identifiants, chaînes, etc.)
2. **Identification contextuelle** : Le lexer distingue les mots-clés des identifiants
3. **Traduction sélective** : Seuls les vrais mots-clés sont traduits
4. **Reconstruction** : Le code est reconstruit avec les mots-clés traduits

## Contribution 🤝

Les contributions sont les bienvenues ! N'hésitez pas à :

- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Ajouter de nouveaux mots-clés français
- Améliorer la documentation

## Licence 📄

Ce projet est sous licence CeCILL. Voir le fichier LICENCE pour plus de détails.

## Auteurs et remerciements 👏

Créé avec amour par des développeurs français qui voulaient coder dans leur langue maternelle tout en restant compatibles avec le C.

---

*Ce README a été écrit en français. Si vous ne comprenez pas, utilisez C🥖 pour le traduire !* 😉

---

<sub>*Ce projet a été vibecodé à partir d'une spec. La puissance de la baguette combinée à la rigueur du code !*</sub>
