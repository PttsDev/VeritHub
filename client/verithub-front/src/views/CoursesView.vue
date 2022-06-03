<template>
  <div id="principal">
    <label id="icon">
      <img :src="courses.photo" alt="imagen" class="imagen" />
      <div id="nombre">
        {{ courses.name }}
      </div>
      <StarsComp id="stars" />
    </label>
    <label id="comments"> comentarios </label>
    <label id="courses">
        
             
        <div id="buscar">
          <v-textarea
            id="areaBusqueda"
            name="searchUniversity"
            label="Search subject"
            no-resize
            v-model="textoBusqueda"
            rows="1"
            columns="1"
          ></v-textarea>
          <v-btn variant="plain" @click="this.findSubject()">
            <a>
              <img :src="lupa" alt="Lupa" class="lupa" />
            </a>
          </v-btn>
        </div>
        <div v-for="subject in subjectsResult" :key="subject" id="subject">
          <div id= "subjectInfo">
            <v-hover
        v-slot="{ hover }"
      >
        <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }" 
          height="50"
            >
            <a :href="'/s/forum/'+subject.id"> {{ subject.name }}</a> <StarsComp /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Creditos totales: {{ subject.credits }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Año: {{ subject.year }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
            <a :href="'/s/forum/'+subject.id"> IR</a>
            </v-card>
        </v-hover>
          </div> 
        </div>
        
        
        
    </label>
  </div>
</template>

<script>
import StarsComp from "../components/StarsComp.vue";
import { defineComponent } from "vue";
import findCoursesService from "@/services/findCoursesService.js";
import findSubjectsService from "@/services/findSubjectsService.js";

export default defineComponent({
  name: "CoursesView",

  data() {
    return {
      image: "/1.jpg",
      lupa: "/lupa.png",
      IDcourse: this.$route.params.id,
      subjects: [],
      subjectsResult: [],
      coursesNew: [],
      busqueda: "",
      textoBusqueda: "",
      courses: [],
    };
  },
  components: {
    StarsComp,
  },

  mounted() {
    this.find();
    this.findSubjects();
  },

  methods: {
    find: async function () {
      await findCoursesService
        .findAll({
          institutionID: this.$route.params.id,
        })
        .then((res) => {
          let courseExists = res.data.exists;
          if (courseExists) {
            //leer lo que devuelve el servidor donde courses es un array que tiene todos los cursos
            //que hay en la base de datos con esas caracteristicas
            this.courses = res.data.courses;
            this.courses = this.courses[0];            
          } else {
            console.log("No existe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findSubjects: async function () {
      await findSubjectsService
        .findAll({
          courseID: this.IDcourse,
        })
        .then((res) => {
          let subjectExists = res.data.exists;
          if (subjectExists) {
            //leer lo que devuelve el servidor donde courses es un array que tiene todos los cursos
            //que hay en la base de datos con esas caracteristicas
            this.subjects = res.data.subjects;
            this.subjectsResult = res.data.subjects;
            
          } else {
            console.log("No existe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findSubject: function () {
      this.subjectsResult = this.subjects.filter((subject) => {
        return subject.name.includes(this.textoBusqueda);
      });
      console.log(this.subjectsResult);
    },

  },

});
</script>


<style lang="css">

h1{
  font-size: 1.5em;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 0;
}

#principal {
  display: flex;
  flex-direction: row;
}

#icon {
  flex-direction: column;
  margin-top: 5%;
  margin-left: 5%;
}

#comments {
  flex-direction: column;
  margin-top: 23%;
  margin-left: -13%;
  border: 1px solid black;
  width: 16%;
  height: 300px;
  overflow: auto;
}

#courses {
  flex-direction: column;
  margin-top: 60px;
  margin-left: 7%;
  
  width: 60%;
  height: 572px;
  overflow-y: auto;
  overflow-x: hidden;
}

#subject {
  display: flex;
  flex-direction: row;
  
}

#subjectInfo {
  display: flex;
  flex-direction: row; 
  width: 750px;
  flex-wrap: wrap;
  justify-content: space-around; 
  margin-top:4%;
}

.imagen {
  /* cambia estos dos valores para definir el tamaño de tu círculo */
  height: 160px;
  width: 160px;
  /* los siguientes valores son independientes del tamaño del círculo */
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
  background-size: 100% auto;
}

.lupa {
  width: 55px;
  height: 20px;
  margin-left: 18px;
}

.v-btn {
  margin-top: 4%;
  right: 25%;
  z-index: 5;
}

#buscar {
  z-index: 3;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  

  width: 400px;
}

#nombre {
  text-align: center;
}

.v-card {
    display: flex;
    flex-direction: row;
    width: 600px;
    margin-left: -150px;
    transition: opacity .4s ease-in-out;
}

.v-card.on-hover.theme--dark{
  background-color: rgba(#FFF, 0.8);
}

.v-card__text{
    color: red;
}
</style>