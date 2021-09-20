<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Node.js en production</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">La variable d'environnement NODE_ENV</v-card-title>
          <p>
            En production, il est important de définir la variable d'environnement <code>NODE_ENV=production</code>.
            En effet, certaines librairies modifient leur comportement lorsque <code>NODE_ENV=production</code>.
          </p>
          <p>
            Par exemple, Express va notamment :
            <ul>
              <li>mettre en cache les templates ;</li>
              <li>renvoyer des messages d'erreur moins verbeux.</li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Les fichiers statiques</v-card-title>
          <p>
            Node.js est capable de servir des fichiers statiques, mais n'est pas aussi performant qu'un serveur HTTP conçu pour ce besoin.
            Il est donc recommandé d'utiliser un serveur HTTP comme nginx ou Apache ou d'utiliser un reverse-proxy mettant en cache les fichiers statiques.
          </p>

          <v-card-title class="subheading primary--text">Cluster</v-card-title>
          <p>
            Aujourd'hui, la majorité des processeurs ont plusieurs coeurs, mais JavaScript étant monothreadé, seulement un coeur sera réellement utilisé.
            Pour répondre à ce besoin, Node.js fournit le module <a href="https://nodejs.org/docs/latest/api/cluster.html">cluster</a>, qui permet d'exécuter du code JavaScript dans un nouveau processus.
            A noter :
            <ul>
              <li>il s'agit de processus distincts, c'est-à-dire qu'ils n'utilisent pas la même mémoire ;</li>
              <li>depuis peu, Node.js permet de faire des <a href="https://nodejs.org/docs/latest/api/worker_threads.html">worker_threads</a> (c'est expérimental actuellement) ;</li>
              <li>Node.js est capable de répartir les requêtes entrantes entre les différentes processus fils d'un même processus parent.</li>
            </ul>
          </p>
          <p>
            Pour un serveur HTTP, il y aura souvent :
            <ul>
              <li>un processus parent, qui se chargera de créer et tuer les processus enfants ;</li>
              <li>n processus enfants, qui traiteront les requêtes entrantes (n étant le nombre de CPUs, récupéré grâce à <a href="https://nodejs.org/docs/latest/api/os.html#os_os_cpus">os.cpus()</a>)</li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Process manager</v-card-title>
          <p>
            Gérer nous même les processus Node.js est compliqué, notamment parce qu'il faut gérer les cas d'erreur (que se passe t'il si le processus plante pour une erreur inattendue ?).
            C'est pour cela qu'il est recommandé d'utiliser un outil pour gérer les processus :
            <ul>
              <li>soit en utilisant un outil d'orchestration, comme <a href="https://kubernetes.io/">kubernetes</a>, qui gérera lui-même le load-balancing de containeurs Docker et se chargera de redémarrer un processus s'il y en a un qui meurt ;</li>
              <li>soit en utilisant une librairie, comme <a href="https://www.npmjs.com/package/pm2">pm2</a>, qui va utiliser le module cluster pour gérer les processus Node.JS et le load-balancing.</li>
            </ul>
          </p>
        </v-card-text>


        <v-card-text>
          <v-card-title class="subheading secondary--text">TP Fil rouge</v-card-title>
          <p>
            Nous allons mettre en place un process-manager pour notre serveur HTTP :
            <ol>
              <li>rajouter un script <code>start-cluster</code> dans le fichier <code>package.json</code> qui lance plusieurs workers avec <a href="https://www.npmjs.com/package/pm2">pm2-runtime</a> ;</li>
              <li>lancer la commande <code>npm run start-cluster</code>, et vérifier qu'il y a bien plusieurs processus Node.js qui sont lancés ;</li>
              <li>killer un des processus enfants : que se passe-t-il ?</li>
            </ol>
          </p>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
</script>