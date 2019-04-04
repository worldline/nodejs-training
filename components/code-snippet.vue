<template>
  <div>
    <a v-show="isVisible" @click="isVisible = false">Masquer la réponse</a>
    <a v-show="!isVisible" @click="isVisible = true">Afficher la réponse</a>
    <runkit-embedded v-show="isVisible"><slot /></runkit-embedded>
  </div>
</template>

<script>
import RunkitEmbedded from './runkit-embedded'

export default {
  components: { RunkitEmbedded },
  data: () => ({
    isVisible: false
  })
}
</script>
