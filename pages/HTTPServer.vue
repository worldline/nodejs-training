<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Serveur HTTP</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">Node.js et HTTP</v-card-title>
          <p>
            Node.js permet de créer "out-of-the-box" un serveur HTTP simple, grâce au module <code>http</code> compris dans son coeur.

            <pre v-highlightjs>
              <code language="js">
const http = require('http');

http.createServer(function (req, res) {
  res.write('Hello World!');
  res.end();
}).listen(8080);
            </code></pre><br>
            Le serveur ci-dessus :
            <ul>
              <li>écoute sur le port 8080</li>
              <li>renvoie la réponse "Hello World" aux requêtes entrantes</li>
            </ul>
            <br>
            <v-alert outlined :value="true" color="info" icon="info" outline>
              Bien qu'il soit tout à fait possible d'utiliser uniquement <code>http</code> pour créer des serveurs HTTP, la plupart des projets utilisent un framework comme <a href="https://expressjs.com/fr/">Express</a>, <a href="https://hapijs.com/">hapi</a> ou <a href="https://koajs.com/">koa</a>.
            </v-alert>
          </p>
        </v-card-text>
        <v-card-text>
          <v-card-title class="headline primary--text">Express</v-card-title>

          <BlockQuote quote="Express est une infrastructure d'applications Web Node.js minimaliste et flexible qui fournit un ensemble de fonctionnalités robuste pour les applications Web et mobiles." cite="https://expressjs.com/fr/" />
          <p>
            Concrètement, Express apporte les améliorations suivantes :
            <ul>
              <li>Routage des URL par chemin et verbe HTTP</li>
              <li>Parsage des paramètres d'entrée</li>
              <li>Gestion des fichiers statiques</li>
              <li>Templating HTML</li>
            </ul>
            <br>
            Il est également possible d'ajouter des fonctionnalités grâce au mécanisme de <code>middleware</code>.<br>

            <v-card-title class="subheading primary--text">Anatomie du serveur</v-card-title>
            <pre v-highlightjs><code language="js">
const express = require('express');
const app = express();

app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}!`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
            </code></pre><br>
          </p>
          <p>
            Dans l'exemple ci-dessus, on définit la fonction qui sera executée lorsque le serveur une recevra une requête <code>GET</code> avec une url de la forme <code>/hello/:name</code> avec <code>:name</code> qui est un paramètre qui peut-être récupéré dans la variable <code>req.params.name</code>.<br>
            Cette fonction est appelée <code>middleware</code> et peut être définie de la manière suivante :
            <ul>
              <li>si elle ne concerne qu'une méthode HTTP pour une URL donnée : on utilise <a href="http://expressjs.com/en/4x/api.html#app.get.method">app.get()</a>,  <a href="http://expressjs.com/en/4x/api.html#app.post.method">app.post()</a>...</li>
              <li>sinon : on utilise <a href="http://expressjs.com/en/4x/api.html#app.use.method">app.use()</a> qui permet de définir un middleware qui sera executé quelque soit la requête (ce qui est utile pour écrire des logs par exemple, compression de la réponse...).</li>
            </ul>
            <strong>A noter : les middlewares sont executés dans l'ordre dans lequel ils sont déclarés.</strong>
            <v-alert outlined :value="true" color="info" icon="info" outline>
              Il est possible d'utiliser des expressions régulières, des masques et / ou des gestionnaires de routage. Pour plus d'information se référer à la documentation officielle : <a href="https://expressjs.com/fr/guide/routing.html">Express routing</a>.
            </v-alert>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading primary--text">Ecrire un middleware</v-card-title>
          <p>
            Les paramètres d'une fonction <code>middleware</code> sont :
            <ul>
              <li>L'objet <a href="http://expressjs.com/fr/4x/api.html#req">Request</a> <code>req</code>, qui encapsule l'objet <a href="https://nodejs.org/api/http.html#http_class_http_incomingmessage">IncomingMessage</a> en ajoutant <a href="http://expressjs.com/en/4x/api.html#req">un ensemble de propriétés</a> correspondant à la requête HTTP parsée comme : <code>baseUrl</code>, <code>path</code>, <code>body</code>, <code>params</code> ou <code>method</code> ;</li>
              <li>L'objet <a href="http://expressjs.com/fr/4x/api.html#res">Response</a> <code>res</code> ;</li>
              <li><code>next</code> qui est la fonction à appeler pour passer au middleware suivant dans le cycle de l'application</li>
            </ul>
            <br>
            Par exemple :
            <pre v-highlightjs><code language="js">
(req, res, next) => { // Définition d'une fonction middleware
  // Traitement
  next(); // Appel du middleware suivant
};
            </code></pre><br>
            Ainsi, un middleware doit (au choix) :
            <ul>
              <li>Passer au middleware suivant en appelant <code>next()</code> (après avoir modifié la requête <code>req</code> et/ou la réponse <code>res</code> par exemple);</li>
              <li>Répondre immédiatement au client en appelant <code>res.send()</code>, ce qui stoppera le traitement de la requête et n'exécutera pas les middlewares suivants ;</li>
              <li>Emettre une erreur en appelant <code>next()</code> avec une erreur en paramètre, ce qui stoppera l'exécution des middlewares "normaux" et fera passer la requête dans les middlewares d'erreur (voir ci-dessous).</li>
            </ul>
          </p>

          <p>
            Les middlewares d'erreur sont appelés dans le cas où une erreur est passé en premier paramètre du callback <code>next(err);</code>.
            Par exemple :
            <pre v-highlightjs><code language="js">
(err, req, res, next) => { // Définition d'une fonction middleware d'erreur
  res.status(500).send({ error: 'something blew up' });
};
            </code></pre><br>
            <v-alert outlined :value="true" color="warning" icon="warning" outline>
              Le paramètre <code>next</code> est obligatoire même s'il n'est pas utilisé. En effet, c'est le nombre de paramètres qui permet à Express de différencier les middlewares d'erreur.
            </v-alert>

            <v-alert outlined :value="true" color="info" icon="info" outline>
              Il existe de nombreux middleware out-of-the-box pour Express : <a href="http://expressjs.com/en/resources/middleware.html">Middlewares</a>.
            </v-alert>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Créer et tester un serveur HTTP avec Express qui :
            <ol>
              <li>répond une erreur 404 sur un chemin qui n'existe pas ;</li>
              <li>répond un statut 200 sur une requête <code>GET /browse/foo</code> (avec <code>foo</code> qui est un paramètre) et répond avec le contenu du dossier correspondant au paramètre du chemin (le nom, le type et la taille au format JSON), le dossier <code>foo</code> étant à l'intérieur d'un répertoire <code>static</code> présent à la racine du projet) ;</li>
              <li>renvoie une erreur 404 si le dossier n'est pas trouvé (utiliser un middleware d'erreur) ;</li>
              <li>loggue les requêtes / réponses du serveur (utiliser <a href="https://www.npmjs.com/package/morgan">morgan</a>) ;</li>
              <li>répond au format HTML sur une requête <code>GET /browse/foo</code> si le header <code>accept</code> contient <code>html</code> : pour cela, utiliser un moteur de template pour générer du HTML, c.f. <a href="https://expressjs.com/en/guide/using-template-engines.html">Express template engines</a> (nous recommandons <a href="https://www.npmjs.com/package/express-handlebars">express-handlebars</a>).</li>
            </ol>
            <v-alert outlined :value="true" color="info" icon="info" outline>
              Il est possible d'obtenir des logs d'express pour debugguer plus facilement : <a href="https://expressjs.com/fr/guide/debugging.html">https://expressjs.com/fr/guide/debugging.html</a>.
            </v-alert>
            <v-alert outlined :value="true" color="warning" icon="warning" outline>
              Il faut bien traiter les questions dans l'ordre (tests compris) avant de passer à la question suivante.
            </v-alert>
          </p>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import BlockQuote from '../components/BlockQuote'
export default {
  components: { BlockQuote }
}
</script>