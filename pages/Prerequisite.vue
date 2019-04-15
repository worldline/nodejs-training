<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline primary--text">Prérequis</v-card-title>
        <v-card-text>
          <p>Afin de pouvoir mener à bien cette formation, il est nécessaire d’avoir un environnement de travail bien configuré. Voici la liste des outils nécessaires :</p>
          <ul>
            <li><a target="_blank" href="https://nodejs.org/en/">Node.js &#8805; 10</a> : la version en LTS actuellement</li>
            <li><a target="_blank" href="https://www.npmjs.com/">npm &#8805; 6</a> : la version packagé avec Node.js 8</li>
            <li>un IDE de votre choix (nous vous conseillons l'excellent <a target="_blank" href="https://code.visualstudio.com/">vscode</a>)</li>
          </ul>
          <br>
          <v-alert :value="true" color="info" icon="info" outline>
            Afin d’éviter ce travail d’installation et de configuration nous vous conseillons d'utiliser une DevBox comme celle de <a href="https://github.com/jhipster/jhipster-devbox">JHipster devbox</a>.
            <br>Elle contient (entre autres) : Node.js, npm, vscode, Postman & Chromium.
          </v-alert>
          <br>
          <p>
            Il est également conseillé d'utiliser un formateur pour écrire du code facile à lire.
          </p>
          <p>
            Pour cela, vous pouvez :
            <ul>
              <li>activer le formatage automatique sur votre IDE (sur vscode : ce sont les paramètres <code>Format On Save</code> et / ou <code>Format On Type</code>) ;</li>
              <li>utiliser <a href="https://prettier.io/">Prettier</a>, qui fournit un ensemble de règles de formatage, des plugins pour les différents IDE et un outil en ligne de commande qui permet notamment de vérifier le format (utile pour l'intégration continue) ;</li>
              <li>utiliser <a href="https://eslint.org/">eslint</a>, qui permet de définir un ensemble de règles, notamment pour éviter certaines erreurs de programmation (par exemple pour interdire l'utilisation de <code>==</code>).</li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      sourceCode: 'const s = new Date().toString()'
    }
  }
}
</script>