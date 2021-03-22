<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">Les modules</v-card-title>
        <v-card-text>
          <v-card-title class="subheading primary--text">Qu'est-ce qu'un module (au sens Node.js) ?</v-card-title>
          <p>
            En Node.js, chaque fichier représente un module :
            <ul>
              <li>chaque module a un scope : c'est à dire qu'une variable définie à l'intérieur d'un module n'est pas disponible en dehors, à moins d'être exportée ;</li>
              <li>un module peut exporter une ou plusieurs variables ;</li>
              <li>un module peut importer les variables d'autres modules (si elles sont exportées).</li>
            </ul>
            <v-alert :value="true" color="info" icon="info" outline>
              Il existe plusieurs manières de gérer les modules en JavaScript :
              <ul>
                <li>CommonJS : utilisé par les versions actuelles de Node.js ;</li>
                <li>import/export EcmaScript 6 : à partir de la version 14 de Node.js (<a href="https://nodejs.org/api/esm.html">documentation</a>) ;</li>
                <li>RequireJS : non supporté par Node.js.</li>
              </ul>
            </v-alert>
          </p>

          <v-card-title class="subheading primary--text">Comment exporter une variable ?</v-card-title>
          <p>
            Pour exporter une variable, il suffit d'ajouter un attribut à <code>exports</code>.
            <pre v-highlightjs><code language="js">
// fichier say-hello.js

exports.helloCount = 0;

exports.sayHello = (name) => {
  exports.helloCount ++;
  console.log(`hello ${name}`);
};
            </code></pre>
          </p>
          <p>
            Il est également possible d'exporter un unique objet en définissant la variable <code>module.exports</code>
            <pre v-highlightjs><code language="js">
// fichier say-goodbye.js

module.exports = (name) => {
  console.log(`Good Bye ${name}`);
};
            </code></pre>
          </p>

          <v-card-title class="subheading primary--text">Comment importer un module ?</v-card-title>
          <p>
            Pour importer un module, il faut utiliser la fonction <code>require()</code>.
            <pre v-highlightjs><code language="js">
const { sayHello } = require('./say-hello');
const sayGoodbye = require('./say-goodbye');

sayHello('Sylvain');
sayGoodbye('Julien');
            </code></pre>
          </p>
          <p>
            La fonction <code>require()</code> va chercher à charger par priorité :
            <ul>
              <li>un module "core", c'est à dire un module inclus par défaut dans Node.js (ils sont documentés sur le site de <a href="https://nodejs.org/api/">Node.js</a> : <code>path</code>, <code>http</code>...) ;</li>
              <li>un fichier local si le paramètre est un chemin (i.e. commence par <code>./</code>, <code>../</code> ou <code>/</code>) ;</li>
              <li>une librairie présente dans le dossier <code>node_modules</code> dans le dossier courant ou dans un dossier ascendant (par récursivité).</li>
            </ul>
            La chaîne de caractères passée en paramètre peut correspondre soit à :
            <ul>
              <li>un fichier (les extensions <code>.js</code> ou <code>.json</code> peuvent être omises) ;</li>
              <li>
                un dossier : dans ce cas-là, Node.js va chercher un fichier <code>package.json</code> à l'intérieur du dossier pour savoir quel fichier il faut charger (balise <code>main</code>).
                Par défaut, c'est le fichier <code>index.js</code> qui est chargé.
              </li>
            </ul>
          </p>

          <p>
            Exemples :
            <pre v-highlightjs><code language="js">
// Récupération de la fonction join exportée par le module path (module 'core' inclus dans Node.js)
const { join } = require('path');

// Chargement du fichier say-goodbye.js en relatif par rapport au dossier courant
const sayGoodbye = require('./say-goodbye');

// Chargement de la librairie express (présente dans dossier 'node_modules')
const express = require('express');

// Chargement du fichier 'lib/index.js' de la librairie vuetify (présente dans dossier 'node_modules') :
// Cette notation est souvent déconseillée car l'import devient dépendant de la structure interne de la librairie importée.
const Vuetify = require('vuetify/lib');
            </code></pre>
          </p>

          <p>
            <v-alert :value="true" color="info" icon="info" outline>
              A noter, <code>require()</code> a un cache, c'est à dire que chaque fichier n'est chargé qu'une seule fois (et donc executé qu'une seule fois).<br>
              Ainsi, le code à l'intérieur d'un module peut servir pour initialiser le module (chargement de la configuration par exemple),
              car il ne sera executé qu'une fois (souvent au démarrage de l'application).
            </v-alert>
          </p>


          <v-card-title class="subheading primary--text">Les objets globaux</v-card-title>
          <p>
            Des objets globaux sont disponibles dans tous les modules (sans qu'il soit nécessaire de les importer). Il y a notamment :
            <ul>
              <li><code>__dirname</code> qui est une chaîne de caractères qui correspond au chemin absolu du dossier dans lequel se situe le module ;</li>
              <li><code>__filename</code> qui est une chaîne de caractères qui correspond au chemin absolu du module ;</li>
              <li><code>console</code> ;</li>
              <li><code>exports</code>, <code>module</code> et <code>require</code> ;</li>
              <li><code>setTimeout</code>, <code>setInterval</code>, <code>setImmediate</code>, <code>clearTimeout</code>, <code>clearInterval</code> et <code>clearImmediate</code> ;</li>
              <li><code>process</code> qui représente le processus en cours d'exécution : variables d'environnement, pid... (<a href="https://nodejs.org/api/process.html#process_process">plus d'infos</a>) ;</li>
              <li>et plus encore : <a href="https://nodejs.org/api/globals.html">https://nodejs.org/api/globals.html</a>.</li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Les modules "core" de Node.js</v-card-title>
          <p>
            Node.js inclut des modules "core". La liste complète est disponible sur la <a href="https://nodejs.org/docs/latest/api/">documentation</a>. Les plus utilisés sont :
            <ul>
              <li><a href="https://nodejs.org/docs/latest/api/fs.html">fs</a> : qui permet de manipuler les fichiers (<code>readFile</code>, <code>stat</code>...) ;</li>
              <li><a href="https://nodejs.org/docs/latest/api/path.html">path</a> : qui permet de manipuler les chemins de fichier (par exemple, <code>join</code> permet de concaténer plusieurs chemins, en prenant soin de placer les bons séparateur et de résoudre les <code>..</code> et <code>.</code>) ;</li>
              <li><a href="https://nodejs.org/docs/latest/api/http.html">http</a> et <a href="https://nodejs.org/docs/latest/api/https.html">https</a> : qui permettent de créer des clients et serveurs http(s) ;</li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>