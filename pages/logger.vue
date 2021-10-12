<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Logging</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">Logguer avec winston</v-card-title>
          <p>
            Node.js ne fournit pas de module pour logguer, nous allons donc utiliser la librairie <a href="https://www.npmjs.com/package/winston">winston</a> pour logguer.
            Winston est personnalisable, et repose sur deux concepts :
            <ul>
              <li>le <a href="https://www.npmjs.com/package/winston#formats">format</a> qui correspond aux différentes étapes qui vont permettre de générer le log (par exemple, appliquer la <a href="https://www.npmjs.com/package/winston#string-interpolation">string interpolation</a> et générer le log en json)</li>
              <li>le <a href="https://www.npmjs.com/package/winston#transports">transport</a> qui correspond aux sorties de log (console, fichier...)</li>
            </ul>
          </p>
          <p>
            Pour créer un logger, il faut utiliser la méthode <code>createLogger()</code> comme dans l'exemple ci-dessous :
            <pre v-highlightjs><code language="js">
const { createLogger, format, transports } = require('winston');
const { combine, splat, json } = format;

const logger = createLogger({
    format: combine(splat(), json()),
    transports: [new transports.Console()]
});

logger.info('Hello %s !', 'World');</code></pre>
          </p>
          <p>
            Ce code génère le log suivant en console :
            <code>{"level":"info","message":"Hello World !"}</code>
          </p>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            La méthodologie <a href="https://12factor.net/fr/logs">twelve-factor</a> recommande de logguer sur la sortie standard.
          </v-alert>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Mettre en place des logs en console sur le projet :
            <ol>
              <li>logguer en <code>DEBUG</code> les paramètres d'entrées des fonctions présentes dans le fichier <code>app/fs-utils</code> ;</li>
              <li>afin de gérer tous les logs avec la même librairie, utiliser <a href="https://www.npmjs.com/package/express-winston">express-winston</a> pour générer les logs access.</li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
</script>