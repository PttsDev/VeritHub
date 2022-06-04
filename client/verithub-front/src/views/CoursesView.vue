<template>
  <div id="principal">
    <label id="icon">
      <img :src="courses.photo" alt="imagen" class="imagen" />
      <div id="nombre">
        <p>
          <b
            >{{ courses.name }}</b
          >
        </p>
        
      </div>
      
      <StarsComp :stars=3 id="stars" />
    </label>
    <label id="comments">
      <div v-if="this.$store.state.user.isAdmin">
        <v-dialog v-model="createSubjectDialog">
          <!--eslint-disable-next-line vue/no-unused-vars-->
          <template v-slot:activator="{ props }">
            <v-btn :="props" target="_blank"> Crear asignatura </v-btn>
          </template>

          <v-card elevation="7" style="width: 150%">
            <v-card-title>
              <span class="text-h5">Datos de la asignatura</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  lass="card-form-input"
                  v-model="this.subjectData.name"
                  label="Nombre de la asignatura"
                  type="text"
                  autofocus
                  required
                  placeholder="Calculo"
                ></v-text-field>
                <v-text-field
                  lass="card-form-input"
                  v-model="this.subjectData.credits"
                  label="Creditos"
                  type="number"
                  autofocus
                  required
                  placeholder="6"
                ></v-text-field>
                <v-text-field
                  lass="card-form-input"
                  v-model="this.subjectData.year"
                  label="Año de cursado"
                  type="number"
                  autofocus
                  required
                  placeholder="1"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" @click="this.createSubjectDialog = false">
                Cancelar
              </v-btn>
              <v-btn variant="text" @click="this.createSubject()">
                Crear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </label>
    <label id="courses">
      <div id="buscar">
        <v-textarea
          id="areaBusqueda"
          name="searchUniversity"
          label="Buscar curso..."
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
        <div id="subjectInfo">
          
              <a id="as" :href="'/s/forum/' + subject.id"> <span>{{ subject.name }}</span></a>
              <StarsComp :stars="subject.stars" /> Créditos
              totales:
              {{ subject.credits }} &nbsp;&nbsp;&nbsp;  Año:
              {{ subject.year }}<br />

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
import createSubjectService from "@/services/createSubjectService.js";

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

      createSubjectDialog: false,
      subjectData: {
        name: "",
        year: 0,
        stars: 0,
        credits: 0,
        courseID: this.$route.params.id,
      },
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
          tipo: "id",
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

    createSubject: async function () {
      await createSubjectService
        .create(this.subjectData)
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });

      this.createSubjectDialog = false;
    },
  },
});
</script>


<style lang="css" scoped>
h1 {
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
  margin-top: 350px;
  margin-left: -180px;
  width: 16%;
  height: 300px;
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
  box-shadow: 3px 3px 1px rgb(212, 212, 212);
  border-radius: 3px;
  border: 1px solid rgb(212, 212, 212);
  height: 100px;
}

#subjectInfo {
  display: flex;
  flex-direction: row;
  width: 750px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 4%;
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
  margin-left: 10px;
}

.lupa {
  width: 55px;
  height: 20px;
  margin-left: -20px;
}

.v-btn {
  margin-top: 4%;
  z-index: 5;
  margin-left: 10px;
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

.v-card.on-hover.theme--dark {
  background-color: rgba(#fff, 0.8);
}

.v-card__text {
  color: red;
}

#as :hover {
  background-color: rgb(193, 193, 193);
  border-left: 10px solid rgb(193, 193, 193);
  border-right: 10px solid rgb(193, 193, 193);
  border-radius: 25px;
}

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

#stars {
  justify-content: center;
}
</style>