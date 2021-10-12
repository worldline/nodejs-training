<template>
  <div />
</template>

<script>
export default {
  mounted () {
    window.RunKit.createNotebook({
      element: this.$el,
      source: this.$slots.default[0].text,
      nodeVersion: 'lts'
    })
  }
}
</script>

<style scoped>
  div {
    padding: 0 0 0 30px;
  }
</style>