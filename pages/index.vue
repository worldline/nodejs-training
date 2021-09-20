<template>
  <v-container>
    
      <div class="text-center">
        <img src="~/assets/nodejs.svg" alt="Node.js" class="mb-5">
      </div>
      <v-card>
        <v-card-title class="headline primary--text">Bienvenue</v-card-title>
        <v-card-text>
          <p>Cette formation a pour but de vous faire découvrir l'écosystème Node.js.</p>
          <br>
          <p>Elle peut s’appréhender comme une <b>suite de travaux dirigés</b> dont l’objectif final est de développer un backend en respectant les bonnes pratiques, tout en restant pragmatique. C’est aussi l’occasion de présenter les points d’attention et les liens ou compléments si vous souhaitez <i>"aller plus loin"</i> dans la compréhension.</p>
          <br>
          <p>Pour y arriver, le support est organisé de la manière suivante :</p>
          <ul>
            <li>une <b>description générale</b> du concept avec les liens sur les documentations officielles pour trouver les informations complémentaires;</li>
            <li>au besoin un <b>focus</b> sur les points d’attention et éléments pour aller plus loin et introduire des concepts plus avancés;</li>
            <li>une <b>mise en pratique</b> du concept afin de progressivement arrivée à l’application finale.</li>
          </ul>
          <br>
          <p>Une <b>solution</b> d’implémentation de l’application est proposée (<a target="_blank" href="https://github.com/worldline/nodejs-training/tree/master/correction">correction</a> pour chaque étape). Bien entendu, il est vivement recommandé de tenter l’exercice par soi-même avant de recourir à la solution.</p>
          <br>
          <p>Ce support sert également pour le déroulement de <b>formations présentielles</b> et certains aspects théoriques mais aussi certains exercices pratiques sont, d’un point de vue pédagogique, plus efficaces s’ils sont accompagnés par des explications d’un formateur. Néanmoins, ce support peut aussi être utilisé en <b>autonomie</b>.</p>
        </v-card-text>
      </v-card>
  </v-container>
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