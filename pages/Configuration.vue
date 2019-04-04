<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">Gérer la configuration</v-card-title>
        <v-card-text>
          <p>
            La gestion de la configuration par environnement (développement, qualification, production, etc.) est une problématique classique.<br><br>

            Quelques bonnes pratiques pour la configuration :
            <ul>
              <li>Grouper ses fichers de configuration, par exemple sous un répertoire <code>conf</code> ;</li>
              <li>Utiliser la variable d'environnement <code>NODE_ENV</code> pour différencier les environnements ;</li>
              <li>Utiliser des variables d'environnement personnalisées pour stocker des secrets (mot de passe, token, etc.) <code>process.env.API_KEY</code>.</li>
            </ul><br>
            <!-- eslint-disable -->
            <runkit-embedded>
const env = process.env.NODE_ENV; // production

const config = {
  production: { hello: 'production' },
  qualification: { hello: 'qualification' }
};

console.log(config[env]);
            </runkit-embedded>
            <!-- eslint-enable -->
            <br>
            Gérer sa configuration "à la main" peut s'avérer complexe et peu maintenable. Il existe heureusement de nombreuses librairies permetant les gestions des configurations, voir : <a href="https://www.npmjs.com/search?q=keywords:config">NPM ~config</a>.<br>
          </p>
          <v-card-title class="subheading primary--text">La librarie node-config</v-card-title>
          <p>
            La librarie <a href="https://github.com/lorenwest/node-config">node-config</a> permet notamment :
            <ul>
              <li>d'avoir un fichier de configuration par défaut, e.g. <code>config/default.json</code> ;</li>
              <li>de surcharger certaines valeurs par environnement, e.g. <code>config/production.json</code> ;</li>
              <li>de surcharger certaines valeurs grâce aux variables d'environnement, e.g. <code>config/custom-environment-variables.json</code>.</li>
            </ul><br>

            <v-alert :value="true" color="info" icon="info" outline>
              <code>node-config</code> gère également les fichiers <code>.yaml</code>, <code>.js</code>, <code>.coffee</code>
            </v-alert>
            <br>
          </p>
        </v-card-text>

        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Utiliser la librairie <code>node-config</code> pour :
            <ol>
              <li>passer le port du serveur en configuration ;</li>
              <li>passer la configuration du logger en fichier de configuration.</li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import RunkitEmbedded from '../components/runkit-embedded'
export default {
  components: { RunkitEmbedded }
}
</script>