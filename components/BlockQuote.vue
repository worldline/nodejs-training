<template>
  <div>
    <blockquote>
      <p>{{ quote }}</p>
    </blockquote>
    <cite v-if="cite">-- {{ cite }}</cite>
  </div>
</template>

<script>
export default {
  props: {
    'quote': {
      type: String,
      default: ''
    },
    'cite': {
      type: String,
      default: ''
    }
  }
}
</script>


<style scoped>
blockquote {
  background: #eee;
  border-radius: 5px;
}
blockquote p {
  padding: 15px;
}
blockquote p::before {
  content: '\201C';
}
blockquote p::after {
  content: '\201D';
}
cite {
  float: right;
  padding-right: 50px;
}
</style>


