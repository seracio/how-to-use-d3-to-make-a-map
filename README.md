# how-to-use-d3-to-make-a-map

> Premier jet d'un petit tutoriel pour utiliser d3.js et le GeoJSON

## Partie 1 : installation de la stack et premier programme

Nous vous recommandons d'utiliser Visual Studio Code pour développer, il est gratuit et performant pour le JavaScript

Le JavaScript moderne s'appuie sur des outils en node.js. Cela peut rebuter le débutant mais il est important de les maîtriser, sous peine d'être rapidement limité.

Pour notre exercice, les outils sont les suivants :

* Yarn : qui va nous permettre de charger des librairies externes (typiquement d3)
* Babel : qui va nous permettre d'utiliser les dernières versions de JavaScript pour ensuite les transformer en une version compréhensible par les navigateurs.
* Parcel.js : lui va bundler (regrouper nos différents fichiers en un seul) notre code, y-compris les librairies externes.

* [Installation de node.js](https://nodejs.org/en/download/)
* [Installation de yarn](https://yarnpkg.com/en/docs/install)

Une fois ce repository installé, il faut ouvrir son terminal et se placer à la racine du repo :

* Installation des librairies

```bash
yarn
```

* Lancer le code `src/index.js`

```bash
yarn start
```

puis ouvrir son navigateur sur la page http://localhost:1234
