<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Client HTTP</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">La librairie got</v-card-title>
          <p>
            Node.js fournit un <a href="https://nodejs.org/api/http.html#http_http_request_options_callback">client HTTP</a> qui est assez bas-niveau.
            Il est donc préférable d'utiliser une librairie comme <a href="https://www.npmjs.com/package/got">got</a> qui ajoute notamment les fonctionnalités suivantes :
            <ul>
              <li>gestion du http et du https avec le même module ;</li>
              <li>envoi et réception de JSON ;</li>
              <li>gestion des redirections ;</li>
              <li>utilisation de promesses.</li>
            </ul>
          </p>

          <p>
            Pour faire une requête GET, il suffit de passer l'URL en premier paramètre de <code>got</code>
            <pre v-highlightjs><code language="js">const got = require('got');

const { body } = await got('http://www.google.com');</code></pre>
            <br>
            <ul>
              <li><code>response</code> : un objet <a href="https://nodejs.org/api/http.html#http_class_http_incomingmessage">IncomingMessage</a> qui représente la réponse HTTP (statusCode, headers...)</li>
              <li><code>body</code> : le body de la réponse (String, ou objet JSON en fonction des options passées à <code>got</code>)</li>
            </ul>
          </p>
          <p>
            Pour faire des requêtes plus complexes, il est aussi possible de passer un objet en deuxième paramètre :
            <pre v-highlightjs><code language="js">const res = await got('http://www.google.com/search', {
  method: 'GET',
  searchParams: {
    q: 'request'
  }
});</code></pre>
          </p>

          <p>
            La liste complète des options est disponible dans le <a href="https://www.npmjs.com/package/got">readme</a>. Les plus souvent utilisées sont :
            <ul>
              <li><code>method</code> : la méthode HTTP (GET, POST...) ;</li>
              <li><code>searchParams</code> : les paramètres en query-string ;</li>
              <li><code>body</code> : le corps de la requête ;</li>
              <li><code>responseType: 'json'</code> permet de parser automatiquement la réponse JSON ;</li>
              <li><code>agent</code> : permet de fournir un agent HTTP/HTTPS/HTTP2 (utile notamment pour utiliser un proxy).</li>
            </ul>
          </p>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            La librairie <a href="https://www.npmjs.com/package/request">request</a> est actuellement la plus utilisée comme client HTTP.
            Cependant, elle est dorénavant en <a href="https://github.com/request/request/issues/3142">maintenance</a> et n'aura plus de nouvelles fonctionnalités.
          </v-alert>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Dans un nouveau module <code>app/jokes.js</code> :
            <ol>
              <li>créer la fonction asynchrone <code>getJoke()</code> qui appelle l'API <a href="http://api.icndb.com/jokes/random">http://api.icndb.com/jokes/random</a> et qui retourne le champ <code>joke</code> de la réponse ;</li>
              <li>tester <code>getJoke()</code> (utiliser <a href="https://github.com/nock/nock">nock</a> pour bouchonner l'API) ;</li>
              <li>modifier <code>getJoke()</code> pour remplacer de la prénom de la joke par votre prénom (voir la <a href="http://www.icndb.com/api/">documentation de l'API</a>).</li>
            </ol>
          </p>
          <v-alert outlined :value="true" color="warning" icon="warning" outline>
            <ul>
              <li>Si vous utilisez un proxy, utilisez <a href="https://www.npmjs.com/package/caw">caw</a> comme agent HTTP (il gère automatiquement le proxy en fonction des variables d'environnement ;</li>
              <li><code>got</code> va en cas d'erreur automatiquement réessayer de faire la requête (voir le paramètre <a href="https://www.npmjs.com/package/got#retry">retry</a>) ;</li>
              <li>Pensez également à configurer un timeout.</li>
            </ul>
          </v-alert>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
</script>