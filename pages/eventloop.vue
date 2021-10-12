<template>
  <v-container>
    
      <v-card>
        <v-card-title class="headline primary--text">Comment fonctionne l'asynchronisme en Node.js ?</v-card-title>

        <v-card-text>
          <v-card-title class="subheading primary--text">Rappel</v-card-title>
          <p>
            Node.js est composé :
            <ul>
              <li>de V8, qui un moteur JavaScript : c'est lui qui va s'occuper d'exécuter notre code JavaScript ;</li>
              <li>de libuv, qui est une librairie permettant de gérer les entrées / sorties via des évènements.</li>
            </ul>
          </p>

          <v-card-title class="subheading primary--text">Que se passe t'il quand on appelle une fonction asynchrone ?</v-card-title>
          <p>
            Pour expliquer le fonctionnement, le mieux est de partir d'un exemple :
            <pre v-highlightjs><code language="javascript">
  fs.readdir(__dirname, (err, dirs) => {
    console.log('le callback est appelé');
  });
  console.log('fin du fichier');</code></pre>
          </p>
          <p>
            Dans le code ci-dessus, dans l'ordre :
            <ol>
              <li>V8 exécute la ligne <code>fs.readdir</code> : Node.js va déléguer la lecture du dossier à libuv, en lui fournissant également le callback associé ;</li>
              <li>V8 continue l'exécution du code JavaScript et affiche "fin du fichier" ;</li>
              <li>quelques instants plus tard, quand le lecture fichier sera terminée, libuv va recevoir un évènement qui sera mis dans une file d'attente ;</li>
              <li>quand il n'y aura plus de code JS en cours d'exécution, libuv va dépiler les files d'attente et exécuter les callbacks présents associés.</li>
            </ol>
          </p>

          <p>
            La même explication en vidéo :
            <show-hide>
              <video controls>
                <source src="~/assets/event-loop.mp4" type="video/mp4">
              </video>
            </show-hide>
          </p>

          <v-card-title class="subheading primary--text">L'event loop</v-card-title>
          <p>
            Il faut noter que libuv ne dispose pas d'une, mais de plusieurs files d'attente (suivant le type d'opération asynchrone) qui sont dépilées dans un ordre bien défini. C'est ce qu'on appelle l'event loop.<pre>
   ┌───────────────────────┐
┌─>│        timers         │&lt;───── setTimeout, setInterval...
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │&lt;─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │&lt;───── setImmediate
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
</pre>
          </p>

          <v-alert outlined :value="true" color="info" icon="info" outline>
            De ce fonctionnement, il faut retenir que :
            <ul>
              <li>le code JavaScript en cours d'exécution ne sera jamais interrompu par un callback ;</li>
              <li>la pile d'exécution d'un callback repart de zéro, car le callback est appelé par libuv, pas par la fonction asynchrone ;</li>
              <li>une exception levée dans un callback ne peut-être catchée par un <code>try/catch</code> autour de la fonction asynchrone, et par défaut provoquera l'arrêt du processus Node.js ;</li>
              <li>deux évènements de types différents peuvent ne pas être traitées dans l'ordre où ils sont arrivés ;</li>
              <li>il est important de ne pas bloquer l'event loop (par un traitement synchrone par exemple), car cela bloquera l'exécution des autres évènements.</li>
            </ul>
          </v-alert>

          <p>
            Enfin, pour éviter de bloquer trop longtemps l'event loop avec une opération consommatrice en CPU, Node.JS propose deux méthodes permettant de différer un traitement à plus tard :
            <ul>
              <li><a href="https://nodejs.org/api/timers.html#timers_setimmediate_callback_args">setImmediate()</a> permet de reporter un traitement à l'étape "check" de l'event loop ;</li>
              <li><a href="https://nodejs.org/api/process.html#process_process_nexttick_callback_args">process.nextTick()</a> permet de reporter un traitement à la fin de la file d'attente en cours d'exécution.</li>
            </ul>
            Plus d'informations sur l'event loop : <a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/">https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/</a>.
          </p>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import ShowHide from '../components/show-hide'

export default {
  components: { ShowHide }
}
</script>