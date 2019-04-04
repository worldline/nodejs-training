<template>
  <div>
    <div>
      <a v-show="isVisible" @click="isVisible = false">Masquer</a>
      <a v-show="!isVisible" @click="isVisible = true">Afficher</a>
    </div>
    <slot v-if="isVisible" />
  </div>
</template>

<script>
export default {
  data: () => ({
    isVisible: false
  })
}
</script>
