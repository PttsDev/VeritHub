<template>
  <div id="mainDiv">

    <h1 style="text-align: center; margin-top:20px;"> FOROS </h1>

    <div id="institutionData">
      <a :href="insRef"><img id="instImg" :src="insImg" /></a>
      <h1 id="instName">{{ insName }}</h1>
    </div>

    <div id="postBtns">
      <v-dialog v-model="createPostDialog" v-if="loggedIn">
        <!--eslint-disable-next-line vue/no-unused-vars-->
        <template v-slot:activator="{ props }">
          <v-btn :="props" target="_blank" class="white--text" dark>
            Crear nuevo post
          </v-btn>
        </template>
        <v-card elevation="7" style="width:150%;">
          <v-card-title>
            <span class="text-h5">Crear un nuevo post</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>

              <v-text-field 
              class="card-form-input" 
              v-model="this.title" 
              label="Titulo"
              type="text" autofocus required 
              placeholder="Titulo del post..."
              ></v-text-field>
              <v-textarea
              lass="card-form-input" 
              v-model="this.body" 
              label="Escribe lo que piensas (máx. 255)"
              type="text" autofocus required 
              placeholder="Tu texto..."
              maxlength="255"
              >
              </v-textarea>
            </v-form>
          </v-card-text>

         <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              @click="this.createPostDialog=false"
            >
              Cancelar
            </v-btn>
            <v-btn
              variant="text"
              @click="createPost()"
            >
              Postear
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>

    </div>

    <div id="forumBody">
      <div id="posts">
        <PostButtonComp class="post" v-for="post in posts" :postData="post" :key="post"></PostButtonComp>
      </div>
      <div id="about">
        <div id="aboutH"> Acerca de {{ insName }} </div>
        <div id="aboutB"> Únete a esta universidad para obtener más información! </div>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import postService from '@/services/postService';
import findSubjectsService from '@/services/findSubjectsService';
import findCoursesService from '@/services/findCoursesService';
import PostButtonComp from '../components/PostButtonComp.vue';

export default defineComponent({
  name: 'ForumView',

  components: {
    PostButtonComp,
  },

  data() {
    return {

      // Con este id se obtienen los datos del foro, incluidos los hilos y se forman los componentes necesarios
      idInst: this.$route.params.id,

      // Datos de la institucion
      insImg: "https://us.123rf.com/450wm/abscent/abscent1807/abscent180700103/104882689-edificio-de-la-escuela-cl%C3%A1sica-y-paisaje-urbano-fachada-de-ladrillo-con-relojes-instituci%C3%B3n-educativ.jpg?ver=6",
      insName: "",
      insRef: "",

      createPostDialog: false,
      loggedIn: this.$store.state.user.isLogged,
      // Datos para crear un nuevo post 
      postCreatorName: this.$store.state.user.email,
      postCreatorPw: this.$store.state.user.password,
      instOrSubjId: this.$route.params.id,
      title: "",
      body: "", //Body sería crear un comentario, el raiz del post
      type: this.$route.params.type === "c" ? "courseID": "subjectID",




      // Rellenar el array con datos reales de database
      posts: [],
    }
  },
  methods: {

    getInstitutionData: async function ()  {
      // Obtener datos de la institucion
      // this.insImg = "";
      let id = this.$route.params.id;
      if(this.$route.params.type === "c"){
        this.insName = "CURSO - ";
        this.insRef="/course/" + id;

        await findCoursesService.findAll({tipo: "id", institutionID: id}).then(res => {
          this.insName += res.data.courses[0].name;
          this.insImg = res.data.courses[0].photo;
        }).catch(err => {
          console.log(err);
        });

      } else  {
        this.insName = "ASIGNATURA - ";
        this.insRef="/subject/" + id;
        await findSubjectsService.findById({subjectID: id}).then(res => {
          this.insName += res.data.name;

        }).catch(err => {
          console.log(err);
        });

      }

  
      
    },

    createPost: async function() {
      await postService.createPost({
        creator: this.postCreatorName,
        pw: this.postCreatorPw,
        instOrSubjId: this.instOrSubjId,
        type: this.type,
        title: this.title,
        body: this.body
      }).then(
        
        (response) => {
          this.$router.go();
          console.log(response);

          this.posts.push(response.data);
          this.createPostDialog = false;
          this.title = "";
          this.body = "";
        }

      ).catch(
        (error) => {
          console.log(error);
        }
      );
    },

    getPosts: async function() {

      await postService.findPosts({
        type: this.type,
        instOrSubjId: this.instOrSubjId
      }).then(response => {
        // /forum/:type([s|c])/:idForum/:idThread',
        this.posts = response.data.posts;
        for(let post in this.posts){
          let id =  this.posts[post].courseID;
          if(id == null){
            id = this.posts[post].subjectID;
          }
          this.posts[post] = {
            ...this.posts[post], 
            username: response.data.usernames[post],
            url: '/' +this.$route.params.type+ '/forum/' + id + '/' + this.posts[post].id,
            };
        }
        console.log(response)
      }).catch(error => {
        console.log(error);
      });

    }
  },

  mounted: async function() {
    this.getInstitutionData();
    this.getPosts();
  }

});
</script>

<style lang="css" scoped>
/* fuente Palatino Linotype */
@font-face {
  font-family: 'Palatino Linotype';
  font-style: normal;
  font-weight: 400;
  src: local('Palatino Linotype'), local('PalatinoLTStd-Roman'), url(https://fonts.gstatic.com/s/palatinolinotype/v9/lJwE-pIzkQ5ey4VjC7t6Gc7KZdw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

/* Todo el texto en esa fuente */
body {
  font-family: 'Palatino Linotype', 'Times New Roman', serif;
  
}

#mainDiv {
  background-color: rgb(241, 241, 239);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

#instImg {
  width: 90px;
  height: 80px;
  border-radius: 100%;
}

#instName {
  margin-top: 20px;
}

#institutionData {
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
}

#forumBody {
  display: flex;
  flex-direction: row;
  width:100%;
  margin-top: 15px;
  justify-content: center;
  
}

#about {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  align-self: right;
  justify-self: right;
  width: 15%
}

#aboutH {
  font-size: 15px;
  background-color: brown;
  border-style: solid;
  border-width: 2px;
  color: white;
  border-color: black;
  text-align: center;

}

#aboutB {
  font-size: 15px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  color: black;
  text-align: center;
}

#posts {
  display: flex;
  justify-self: flex-start;
  flex-direction: column;
  width: 80%;
  flex-grow: 0;
  overflow-y: auto;
  overflow-x: hidden;

}

.post{
  margin-bottom: 10px;
  
}
</style>