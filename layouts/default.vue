<template>
  <v-app :dark="dark">
    <v-app-bar
      fixed
      app
      dense
      :clipped-left="clipped"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-if="miniVariant">chevron_right</v-icon>
        <v-icon v-if="!miniVariant">chevron_left</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="toggleTheme()"
      >
        <v-icon v-if="dark">brightness_high</v-icon>
        <v-icon v-if="!dark">brightness_low</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          router
          :to="item.to"
          exact
        >
          <v-list-item-icon>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <v-icon v-html="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <transition name="slide">
        <v-container>
          <nuxt />
        </v-container>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        dark: false,
        items: [
          { icon: 'home', title: 'Accueil', to: '/' },
          { icon: 'bubble_chart', title: 'Prérequis', to: '/prerequisite' },
          { icon: 'slideshow', title: 'Présentation', to: '/presentation' },
          { icon: 'directions_walk', title: 'Rappel JavaScript', to: '/jsreminder' },
          { icon: 'import_export', title: 'Modules', to: '/modules' },
          { icon: 'cloud_queue', title: 'NPM', to: '/npm' },
          { icon: 'call', title: 'Les callbacks (1)', to: '/callback' },
          { icon: 'bug_report', title: 'Les tests', to: '/tests' },
          { icon: 'loop', title: 'L\'event loop', to: '/eventloop' },
          { icon: 'phone_callback', title: 'Les callbacks (2)', to: '/callback-async' },
          { icon: 'record_voice_over', title: 'Les promesses', to: '/promises' },
          { icon: 'swap_horiz', title: 'async/await', to: '/async' },
          { icon: 'link', title: 'Client HTTP', to: '/got' },
          { icon: 'cloud', title: 'Serveur HTTP', to: '/httpserver' },
          { icon: 'cast', title: 'Les évènements', to: '/eventemitter' },
          { icon: 'waves', title: 'Les streams', to: '/streams' },
          { icon: 'format_align_left', title: 'Les logs', to: '/logger' },
          { icon: 'settings', title: 'La configuration', to: '/configuration' },
          { icon: 'directions_run', title: 'Node.js en production', to: '/production' },
          { icon: 'build', title: 'Librairies utiles', to: '/usefullibrary' }
        ],
        miniVariant: false,
        title: 'Formation Node.js'
      }
    },
    mounted() {
      const theme = localStorage.getItem("useDarkTheme");
        if (theme) {
          if (theme === "true") {
            this.$vuetify.theme.dark = true;
          } else this.$vuetify.theme.dark = false;
        }
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark=!this.$vuetify.theme.dark;
        localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
      }
    }
  }
</script>
