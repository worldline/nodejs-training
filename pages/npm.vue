<template>
  <v-container>
    
      <div class="text-center">
        <img src="~/assets/npm.svg" alt="Vuetify.js" style="max-width: 200px" class="mb-5">
      </div>
      <v-card>
        <v-card-title class="headline primary--text">NPM : the Node Package Manager</v-card-title>
        <!-- Présentation NPM -->
        <v-card-text>
          <v-card-title class="subheading primary--text">Qu'est-ce que NPM ?</v-card-title>
          <p>
            NPM est le gestionnaire de paquets offciel de Node.js et se décompose en 2 outils :
            <ul>
              <li>un registre en ligne <a http="https://www.npmjs.com/">npmjs.com</a> qui héberge de nombreuses librairies</li>
              <li>un outil en ligne de commande (<code>npm</code>) qui permet de gérer les dépendances de notre projet</li>
            </ul>
            <br>
            Dans l'écosystème JavaScript, la tendance est plutôt d'avoir des librairies simples, qui répondent à un besoin précis. Par exemple :
            <ul>
              <li><a href="https://momentjs.com/docs/">moment</a> : permet de manipuler des dates</li>
              <li><a href="https://lodash.com/docs">lodash</a> : permet de manipuler des objets, tableaux...</li>
              <li><a href="https://www.npmjs.com/package/got">got</a> : permet d'effectuer des requêtes HTTP</li>
              <li>et pleins d'autres</li>
            </ul>

            <v-alert outlined :value="true" color="info" icon="info" outline>
              Il existe plus de 700 000 librairies sur NPM, et parmi elles, beaucoup ne sont plus maintenues.
              Le site NPM affiche le nombre de téléchargements et la date de dernière publication, ce qui permet de choisir entre plusieurs librairies.
            </v-alert>
          </p>
        </v-card-text>

        <!-- package.json, package-lock.json -->
        <v-card-text>
          <v-card-title class="subheading primary--text">Le fichier package.json</v-card-title>
          <p>Le fichier <code>package.json</code> se situe à la racine du projet et décrit le module.</p>
          <pre v-highlightjs><code language="json">{
  "name": "nom-du-projet",
  "version": "0.3.1",
  "description": "Elle sera publiée",
  "author": "You ",
  "license": "MIT",
  "repository": "https://github.com/you/nom-du-projet.git",
  "private": true,
  "dependencies": {
    "lodash": "~4.17.11"
  },
  "devDependencies": {
    "mocha": "~5.2.0"
  },
  "bundledDependencies": ["lodash"],
  "main": "./lib/entry_point.js",
  "bin": {
    "start-project": "./bin/start"
  },
  "scripts": {
    "test": "mocha test"
  },
  "engines": {"node": ">=6.0.0"}
}</code></pre>
          <ul>
            <li><code>name</code> et <code>version</code> sont obligatoires</li>
            <li><code>description</code>, <code>author</code>, <code>license</code> et <code>repository</code> sont présents à titre d'information</li>
            <li><code>private</code> permet de définir le module comme étant privé, c'est à dire que NPM refusera de le publier</li>
            <li>
              les dépendances sont déclarées à l'aide des champs
              <ul>
                <li><code>dependencies</code> : ce sont les librairies dont le code a besoin pour fonctionner en production</li>
                <li><code>devDependencies</code> : ce sont les librairies qui ne sont utiles que pour le développement (pour les tests, pour le packaging...)</li>
                <li><code>peerDependencies</code> : ce sont les librairies dont le code a besoin, mais qui doivent être déclarées par les applications utilisant notre projet (par exemple, le plugin d'une librairie qui a besoin que cette librairie soit présente)</li>
                <li><code>bundledDependencies</code> : c'est la liste des librairies qui doivent être embarquées dans notre package lors qu'il est publié sur le registre NPM</li>
                <li><code>optionalDependencies</code> : ce sont les librairies dont l'installation peut échouer (par exemple : l'installation d'une librairie nécessaire uniquement pour Linux peut échouer sur Windows)</li>
              </ul>
            </li>
            <li><code>main</code> : fichier qui est chargé par <code>require('npm-du-projet')</code></li>
            <li><code>bin</code> : permet de déclarer une application exécutable en ligne de commande</li>
            <li><code>scripts</code> : permet de définir une commande qui sera executée via <code>npm run &lt;command&gt;</code></li>
            <li><code>engines</code> : permet de définir les versions de Node.js compatibles avec ce projet</li>
            <li><code>type</code> : permet de spécifier le type format de module utilisé par Node.js pour les fichiers <code>.js</code> : <code>commonjs</code> (valeur par défaut) ou <code>module</code></li>
          </ul>
        </v-card-text>

        <!-- Présentation package-lock.json -->
        <v-card-text>
          <v-card-title class="subheading primary--text">Le fichier package-lock.json</v-card-title>
          <p>Ce fichier a été introduit à partir de la version 5 de NPM. Il contient l'arbre complet des dépendances (avec la version exacte des librairies).</p>
          <p>
            Lors d'un <code>npm install</code>:
            <ul>
              <li>si le fichier est présent : les dépendances sont installées, en respectant les versions définies dans ce fichier ;</li>
              <li>sinon : les dépendances sont installées en se basant sur le fichier <code>package.json</code>, et ce fichier est créé.</li>
            </ul>
          </p>
          <p>Ce fichier doit être committé car il permet de reproduire à l'identique un <code>npm install</code>.</p>
          <p>Ce fichier a aussi l'avantage d'accélerer le <code>npm install</code></p>
        </v-card-text>

        <!-- Dépendances -->
        <v-card-text>
          <v-card-title class="subheading primary--text">Déclarer ses dépendances</v-card-title>
          <p>Au sein du fichier <code>package.json</code>, chaque dépendance est définie par un nom de package ainsi qu'une contrainte sur la version.</p>
          <p>
            Pour la contrainte sur la version, NPM respecte le <a href="https://semver.org/">Semantic Versioning</a> (a.k.a. SemVer) : c'est-à-dire que chaque version s'écrit sour la forme X.Y.Z avec
            <ul>
              <li>
                X correspond à une version majeure : ce chiffre est incrémenté quand la nouvelle version contient une incompatibilité par rapport à la version précédente.
                Il peut donc être nécessaire d'adapater notre code pour qu'il continue de fonctionner avec cette nouvelle version.
              </li>
              <li>
                Y correspond à une version mineure : ce chiffre est incrémenté quand la nouvelle version contient de nouvelles fonctionnalités,
                sans qu'il soit nécessaire pour nous de modifier notre code.
              </li>
              <li>Z correspond à une version patch : ce chiffre est incrémenté quand la nouvelle version contient uniquement des corrections de bugs.</li>
            </ul>
          </p>
          <p>
            NPM offre plusieurs syntaxes pour déclarer la version d'une dépendance :
            <ul>
              <li>La syntaxe <code>x.y.z</code> permet de fixer une version précise de la dépendance</li>
              <li>
                La syntaxe <code>^x.y.z</code> permet de fixer le premier chiffre différent de 0 (les chiffres suivants sont au minimum):
                <ul>
                  <li><code>^1.2.3</code> équivaut à <code>&gt;= 1.2.3 &lt;2.0.0</code></li>
                  <li><code>^0.1.2</code> équivaut à <code>&gt;= 0.1.2 &lt;0.2.0</code></li>
                  <li><code>^0.0.1</code> équivaut à <code>0.0.1</code></li>
                </ul>
              </li>
              <li>
                La syntaxe <code>~x.y.z</code> permet de fixer x et y (z est au minimum):
                <ul>
                  <li><code>~1.2.3</code> équivaut à <code>&gt;= 1.2.3 &lt;1.3.0</code></li>
                  <li><code>~0.1.2</code> équivaut à <code>&gt;= 0.1.2 &lt;0.2.0</code></li>
                </ul>
              </li>
              <li>Un dépôt git : <code>git://github.com/user/project.git#commit</code></li>
              <li>Un fichier tar.gz : <code>http://bitbucket.org/user/repo?format=tar.gz</code></li>
              <li>Il existe d'autres syntaxes moins courantes : <a href="https://docs.npmjs.com/files/package.json#dependencies">https://docs.npmjs.com/files/package.json#dependencies</a></li>
            </ul>
          </p>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            Il est recommandé d'utiliser la syntaxe <code>^1.2.3</code> afin d'utiliser automatiquement les dernières versions mineures des librairies.
            La mise à jour vers une nouvelle version majeure restera manuelle car elle peut nécessiter de modifier le code.
          </v-alert>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            Il est recommandé d'utiliser la commande <code>npm install &lt;la-librairie&gt;</code> pour ajouter une librairie :
            NPM installera le nouveau package et se chargera de mettre à jour les fichiers <code>package.json</code> et <code>package-lock.json</code>.
          </v-alert>

          <v-card-text>
            <v-card-title class="subheading secondary--text">Exercice</v-card-title>
            <p>
              Une librairie est disponible dans les versions suivantes :
              <code>0.0.1, 0.0.2, 0.14.0, 0.14.1, 1.0.0, 1.0.1, 1.0.2, 2.0.0, 2.1.0, 2.1.1, 2.2.0, 2.2.1, 2.2.2, 2.3.0, 2.3.1, 3.0.0</code>
            </p>
            <p>
              Quelle version de la librairie sera installée dans les cas suivants :
              <ul>
                <li v-for="(range, index) in ['^2.1.0', '~2.1.0', '^0.14.0', '~0.14.0', '^0.0.1', '~0.0.1']" :key="index">
                  <code>{{ range }}</code> ?
                  <!-- eslint-disable -->
                  <code-snippet>
const {toComparators, maxSatisfying} = require('semver');
const versions = ['0.0.1', '0.0.2', '0.14.0','0.14.1','1.0.0','1.0.1','2.0.0','2.1.0','2.1.1','2.2.0','2.2.1','2.3.0','2.3.1','3.0.0'];

console.log('{{ range }} is equivalent to ' + toComparators('{{ range }}') + '. Max version is ' + maxSatisfying(versions, '{{ range }} '));
                  </code-snippet>
                  <!-- eslint-enable -->
                </li>
              </ul>
            </p>
          </v-card-text>
        </v-card-text>

        <!-- Présentation package-lock.json -->
        <v-card-text>
          <v-card-title class="subheading primary--text">NPM en ligne de commande</v-card-title>
          <p>NPM fournit un outil en ligne de commande qui permet de gérer le cycle de vie d'un module :</p>
          <ul>
            <li><code>npm init</code> : permet d'initialiser un module NPM (création du fichier <code>package.json</code>)</li>
            <li><code>npm install</code> : permet d'installer les dépendances dans le dossier <code>node_modules</code></li>
            <li>
              <code>npm install &lt;nom-d-une-librairie&gt;</code> : permet d'ajouter le module <code>nom-d-une-librairie</code>
              comme dépendance du projet (ajoute le module dans le dossier <code>node_modules</code> et met à jour les fichiers<code>package.json</code> et <code>package-lock.json</code>)
            </li>
            <li><code>npm install -D &lt;nom-d-une-librairie&gt;</code> : permet d'ajouter le module <code>nom-d-une-librairie</code> dans les <code>devDependencies</code></li>
            <li><code>npm test</code> : permet de lancer les tests (commande définie dans le fichier <code>package.json</code>)</li>
            <li><code>npm start</code> : permet de lancer l'application (commande définie dans le fichier <code>package.json</code>)</li>
            <li><code>npm run &lt;script&gt;</code> : permet de lancer le script défini dans le fichier <code>package.json</code></li>
            <li><code>npm publish</code>: permet de publier le module sur le registry NPM</li>
          </ul>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            La commande <code>npm install</code> installe de manière récursive les dépendances des dépendances.
            C'est pour cela que le dossier <code>node_modules</code> contient souvent plusieurs centaines de modules.
          </v-alert>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            Il est possible de définir des <code>scripts</code> qui vont se lancer avant ou après le lancement des scripts.
            Par exemple, la commande <code>npm install</code> va lancer dans l'ordre les scripts:
            <ul>
              <li>preinstall</li>
              <li>install</li>
              <li>postinstall</li>
            </ul>
            Ces scripts sont décrits ici : <a href="https://docs.npmjs.com/misc/scripts">https://docs.npmjs.com/misc/scripts</a>
          </v-alert>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            Certains modules sont utilisables en ligne de commande. Pour les utiliser :
            <ul>
              <li>si le module est présent dans le dossier <code>node_modules</code>, la commande peut-être appelée dans une balise <code>scripts</code> du package.json ou en utilisant la commande <code>npx</code></li>
              <li>sinon, il est possible de l'installer de manière globale à l'OS : <code>npm install -g &lt;nom-d-une-librairie&gt;</code></li>
            </ul>
          </v-alert>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Initialiser une application Node.js :
            <ul>
              <li>Initialiser le module avec NPM</li>
              <li>Ajouter <code>express</code> comme dépendance</li>
              <li>Faire en sorte que <code>npm start</code> execute le fichier <code>index.js</code></li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import CodeSnippet from '../components/code-snippet'
export default {
  components: { CodeSnippet }
}
</script>