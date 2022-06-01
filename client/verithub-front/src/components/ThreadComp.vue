<template>
  <div id="mainDiv">

    <div id="threadBody">
      {{ this.threadBody }}
    </div>
    <!-- Respuestas -->
    <div id="responses">
      &Tab; <ThreadComp v-for="resp in threadResponses" :key="resp" :threadData="resp"></ThreadComp>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostButtonComp',

  data(){ 
    return {
      threadBody: this.threadData.threadBody,
      /// LO DEMAS ///

      /// RESPUESTAS ///
      //obtener de la base de datos
      // Aqui tendríamos los datos que incluirian si este thread tiene más respuestas con su respectivo enlace
      threadResponses: this.threadData.threadResponses,
    }
  },
  methods: {
  },
  props: {
    threadData: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="css" scoped>
#mainDiv{
  margin-left: 50px;
  background-color: orange;
}

#responses{
  width: 200px;
  margin: 0 auto;
  background-color: yellow;
}

</style>