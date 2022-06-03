<template>
  <div id="mainDiv">
  <div id="threadHead">
    <a id="backBtn" :href="forumUrl"> ← </a>
    <h1 id="threadTitle"> {{threadTitle}} </h1>
  </div>
  <ThreadComp :threadData="threadData[0]"> </ThreadComp>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ThreadComp from '../components/ThreadComp.vue';
import commentService from '@/services/commentService';

export default defineComponent({
  name: 'ForumView',

  components: {
    ThreadComp
  },

  data() {
    return {
      idForum: this.$route.params.idForum,
      idThread: this.$route.params.idThread,
      type: this.$route.params.type,

      
      forumUrl: "/"+this.$route.params.type+"/forum/"+this.$route.params.idForum,
      // ARRAY DE EJEMPLO

      threadTitle: "",
      threadData: [],

      /////////////////////////////////
    }
  },
  methods: {

    getThreadData: async function() {

      //Encontrar el post con id = idThread, idForum = postID que no tenga padre
      // (previous commentId = null)
      await commentService.findComments({
        postID: this.idThread,
        previousCommentID: null
      }).then( (res) => {
        this.threadData = res.data.comments;
        this.threadTitle = res.data.postTitle;
        
        // Añado los nombres de usuario a los datos de su comentario
        for(let i in res.data.usernames){
          this.threadData[i] = {...this.threadData[i], username: res.data.usernames[i]}
        }
        
      }).catch( err => {
        console.log(err);
      });

    }

  },

  created() {
    this.getThreadData();
  },

});
</script>

<style lang="css">

#mainDiv{
  margin-bottom: 5px;
}
#threadHead{
display:flex;
flex-direction:row;
justify-content:center;
}

#threadTitle{
  justify-self: center;
  align-self: center;
}

#backBtn{
  margin:10px;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
}

#backBtn:hover {
  background-color: #ddd;
  color: black;
}
</style>