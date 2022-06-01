
<template>
  <div id="mainDiv">
    
    <div id="dataDiv">
      <p> {{postTitle}} </p>
      <a :href="postURL"> IR </a>
      <p> {{postDescription }} </p>
      <div id="creationData"> 
        <p> {{postDate}} </p>
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
      postTitle: this.postData.postTitle,
      postURL: this.postData.postURL,
      postDescription: this.postData.postDescription,
      postDate: this.postData.postDate,
      postAuthor: this.postData.postAuthor,
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
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;

    margin-top: 10px;
    border-width: 1px;
  }

  #dataDiv {
    background-color: #f2f2f2;
    border-color: #000;
    border-style: solid;
    border-width: 1px;

    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
  }

  #creationData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: center;
  }
</style>