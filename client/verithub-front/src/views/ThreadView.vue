<template>
  <div id="mainDiv">

  <ThreadComp :threadData="threadData"> </ThreadComp>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ThreadComp from '../components/ThreadComp.vue';

export default defineComponent({
  name: 'ForumView',

  components: {
    ThreadComp
  },

  data() {
    return {
      idForum: this.$route.params.idForum,
      idThread: this.$route.params.idThread,

      // ARRAY DE EJEMPLO
      threadData: {
        threadBody: "Este es el hilo MAIN numero "+this.$route.params.idThread+" del foro numero "+this.$route.params.idForum,
        threadResponses: [
        {
          threadBody: "Respuesta 1 MAIN",
          threadResponses: [
            {
              threadBody: "Respuesta 1.1",
              threadResponses: [
                {
                  threadBody: "Respuesta 1.1.1",
                  threadResponses: []
                }
              ]
            }
          ]
        },
        {
          threadBody: "Respuesta 2 MAIN",
          threadResponses: []
        }
      ]
      },
      /////////////////////////////////
    }
  },
  methods: {
  },

});
</script>

<style lang="css">
</style>