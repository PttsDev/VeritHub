<template>
  <div>
    Este es el hilo numero {{ idThread }} del foro numero {{ idForum }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ForumView',

  components: {
  },
  data() {
    return {
      idForum: this.$route.params.idForum,
      idThread: this.$route.params.idThread,
    }
  },
  methods: {
  },

});
</script>

<style lang="css">
</style>