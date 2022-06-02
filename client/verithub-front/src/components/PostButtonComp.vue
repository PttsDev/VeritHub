
<template>
  <div id="mainDiv">
    
    <div id="dataDiv">
      <p> {{postTitle}} </p>
      <a :href="postURL"> IR </a>
      <div id="creationData"> 
        <p> {{postDate}} </p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p> {{postAuthor }} </p>
      </div>

    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostButtonComp',

  data(){ 
    return {
      postTitle: this.postData.title,
      postURL: this.postData.url,
      postDate: new Date(this.postData.createdAt).toLocaleDateString("es-ES"),
      postAuthor: this.postData.username,
    }
  },
  methods: {
  },
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="css" scoped>

  /* Un cuadrado que va a albergar todos los datos */
  #mainDiv {
    display: flex;
    flex-direction: column;

    align-items: center;
    align-self: center;
    border-width: 1px;
    width: 80%;
  }

  #dataDiv {
    background-color: white;
    border-color: #000;
    border-style: solid;
    border-width: 1px;

    width: 100%;
  

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    padding: 0px 10vw;
  }

  #creationData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: center;
  }
</style>