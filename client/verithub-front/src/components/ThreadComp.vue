<template>
  <div id="mainDiv">

    <div id="threadBody">
      <div id="author">
        &nbsp; &nbsp;{{ threadAuthor }}
      </div>
      <div id="bodyAndVotes">
        <div class="votes">
          <button id="upvoteBtn" class="voteBtn"><img class="upvote" src="/vote.png" /></button>
          <p id="upvotesCount"> {{upvotes}} </p>
          <button id="downvoteBtn" class="voteBtn"><img class="downvote" src="/vote.png" /></button>
        </div>
        {{ this.threadBody }}

        <div class="rspBtn" v-if="this.$store.state.user.isLogged">

          <v-dialog v-model="responseDialog">
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <template v-slot:activator="{ props }">
              <v-btn :="props" target="_blank" variant="plain">
                Responder
              </v-btn>
            </template>
            <v-card elevation="7" style="width:150%;">
              <v-card-title>
                <span class="text-h5">Respuesta</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-textarea lass="card-form-input" v-model="this.response" label="Tu respuesta" type="text"
                    autofocus required placeholder="Escribe lo que piensas...">
                  </v-textarea>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="this.responseDialog = false">
                  Cancelar
                </v-btn>
                <v-btn variant="text" @click="responsePost()">
                  Postear
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
        </div>
      </div>
    </div>
    <!-- Respuestas -->
    <div id="responses">
      <ThreadComp v-for="resp in threadResponses" :key="resp" :threadData="resp"></ThreadComp>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import commentService from '@/services/commentService';

export default defineComponent({
  name: 'ThreadComp',

  data() {
    return {

      responseDialog: false,
      response: "",

      threadBody: this.threadData.text,
      threadId: this.threadData.postID,
      threadAuthor: this.threadData.username,
      upvotes: this.threadData.likeNum - this.threadData.dislikeNum,
     
      //Con el id obtenemos los comentarios que tengan como el padre este id
      commentID: this.threadData.id,
      threadResponses: [],
    }
  },
  methods: {

    responsePost: async function() {
      this.responseDialog = false;
      this.getResponses();

      // Se crea un comentario con padre como commentID y en el postID dado
      await commentService.createComment({
        creator: this.$store.state.user.email,
        pw: this.$store.state.user.password,
        text: this.response,
        commentID: this.commentID,
        postID: this.threadId,

      }).then( () => {
        
        this.$router.go()

      }).catch( err => {

        console.log(err);
      });
    },

    getResponses: async function() {


      await commentService.findComments({
        postID: this.threadId,
        previousCommentID: this.commentID,
      }).then( (res) => {
        console.log(res.data)
        this.threadResponses = res.data.comments;

        // Añado los nombres de usuario a los datos de su comentario
        for(let i in res.data.usernames){
          this.threadResponses[i] = {...this.threadResponses[i], username: res.data.usernames[i]}
        }
        

      }).catch( err => {
        console.log(err);
      });

    }

  },

  created(){
    this.getResponses();
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
#mainDiv {
  display: flex;
  flex-direction: column;
  margin-left: 50px;


}

#threadBody {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  column-gap: 10px;
}

#responses {

  border-left: 1px solid #ccc;
  margin-left: 20px;
}

.upvote {
  width: 20px;
  height: 20px;
}

.downvote {
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
}

.votes {
  display: flex;
  flex-direction: column;
}

#upvotesCount {
  width: 20px;
  height: 20px;
  text-align: center;
}

#upvoteBtn {
  width: 20px;
  height: 20px;
}

#downvoteBtn {
  width: 20px;
  height: 20px;
}

.voteBtn:hover {
  box-shadow: 0 0 5px rgba(33, 33, 33, .2);
}

/* Mover a la esquina inferior derecha del div */
#responderBtn,
.rspBtn {
  margin-left: auto;
  margin-top: auto;
}

#bodyAndVotes {
  display: flex;
  align-items: center;
  justify-content: left;
  column-gap: 10px;
}

#author {
  margin-left: 25px;
  padding-bottom: 10px;
  font-size: 13px;
}
</style>