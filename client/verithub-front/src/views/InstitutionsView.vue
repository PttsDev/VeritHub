<template>
  <div id="principal">
    <label id="icon">
      <img :src="image" alt="imagen" class="imagen" />
      <div id="nombre">
        {{ institucion.name }}
      </div>
      <StarsComp id="stars" />
    </label>
    <label id="comments"> comentarios </label>
    <label id="courses">
        Courses
        <div id="buscar">
          <v-textarea
            id="areaBusqueda"
            name="searchUniversity"
            label="Search course"
            no-resize
            v-model="textoBusqueda"
            rows="1"
            columns="1"
          ></v-textarea>
          <v-btn variant="plain" @click="this.find()">
            <a>
              <img :src="lupa" alt="Lupa" class="lupa" />
            </a>
          </v-btn>
        </div>
        <div v-for="course in courses" :key="course" id="course">
          <img :src="course.photo" class="coursePhoto"/>
          <div id= "courseInfo">
            {{ course.name }} <StarsComp /> {{ course.price }} €/cts &nbsp;&nbsp;&nbsp; Nota de corte: {{ course.minGrade }}<br />
          </div> 
        </div>
    </label>
  </div>
</template>

<script>
import StarsComp from "../components/StarsComp.vue";
import { defineComponent } from "vue";
import findInstitutionService from "@/services/findInstitutionService.js";
import findCoursesService from "@/services/findCoursesService.js";

export default defineComponent({
  name: "InstitutionsView",

  data() {
    return {
      image: "/1.jpg",
      lupa: "/lupa.png",
      idInstitution: this.$route.params.id,
      institucion: [],
      courses: [],
    };
  },
  components: {
    StarsComp,
  },

  mounted() {
    this.find();
    this.findCourses();
  },

  methods: {
    find: async function () {
      await findInstitutionService
        .find({
          tipo: "id",
          atributo: this.idInstitution,
        })
        .then((res) => {
          let institutionExists = res.data.exists;
          if (institutionExists) {
            //leer lo que devuelve el servidor donde institutions es un array que tiene todas las universidades
            //que hay en la base de datos con esas caracteristicas
            let instituciones = res.data.institutions;
            this.institucion = instituciones[0];
          } else {
            alert("No existe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findCourses: async function () {
      await findCoursesService
        .findAll({
          institutionID: this.idInstitution,
        })
        .then((res) => {
          let courseExists = res.data.exists;
          if (courseExists) {
            //leer lo que devuelve el servidor donde courses es un array que tiene todos los cursos
            //que hay en la base de datos con esas caracteristicas
            this.courses = res.data.courses;
          } else {
            console.log("No existe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>


<style lang="css">
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
}

#courses {
  flex-direction: column;
  margin-top: 6%;
  margin-left: 7%;
  border: 1px solid black;
  width: 60%;
  height: 542px;
  
}

#course {
  display: flex;
  flex-direction: row;
  
}

#courseInfo {
  display: flex;
  flex-direction: row; 
  width: 550px;
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
  margin-left: 2%;
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
  margin-left: 65%;
  margin-top: -2%;
  width: 40%;
}

#nombre {
  text-align: center;
}

.coursePhoto{
  width: 100px;
  height: 80px;
  margin-left: 10px;
  margin-top: 10px;
}
</style>