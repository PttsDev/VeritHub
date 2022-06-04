<template>
  <div id="principal">
    <label id="icon">
      <img :src="institucion.photo" alt="imagen" class="imagen" />
      <div id="nombre">
        <p>
          <b
            >{{ institucion.name }} <br />
            Provincia: {{ institucion.province }}</b
          >
        </p>
      </div>

      <StarsComp :stars="3" id="stars" />
    </label>

    <label id="comments">
      <div v-if="this.$store.state.user.isAdmin">
        <v-dialog v-model="createCourseDialog">
          <!--eslint-disable-next-line vue/no-unused-vars-->
          <template v-slot:activator="{ props }">
            <v-btn :="props" target="_blank"> Crear curso </v-btn>
          </template>

          <v-card elevation="7" style="width: 150%">
            <v-card-title>
              <span class="text-h5">Datos del curso</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  lass="card-form-input"
                  v-model="this.courseData.name"
                  label="Nombre del curso"
                  type="text"
                  autofocus
                  required
                  placeholder="Ingenieria informatica"
                ></v-text-field>

                <v-text-field
                  lass="card-form-input"
                  v-model="this.courseData.minGrade"
                  label="Nota minima"
                  type="number"
                  autofocus
                  required
                  placeholder="5"
                ></v-text-field>

                <v-text-field
                  lass="card-form-input"
                  v-model="this.courseData.price"
                  label="precio"
                  type="number"
                  autofocus
                  required
                  placeholder="1000"
                ></v-text-field>

                <v-text-field
                  lass="card-form-input"
                  v-model="this.courseData.numStudents"
                  label="Nº de estudiantes"
                  type="number"
                  autofocus
                  required
                  placeholder="100"
                ></v-text-field>

                <input
                  type="file"
                  ref="photo"
                  @change="onPhotoChange"
                  style="display: none"
                  accept="image/*"
                />
                <v-btn @click="$refs.photo.click()" class="white--text" dark>
                  Seleccionar foto
                </v-btn>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" @click="this.createCourseDialog = false">
                Cancelar
              </v-btn>
              <v-btn variant="text" @click="this.createCourse()"> Crear </v-btn>
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
          label="Buscar cursos"
          no-resize
          v-model="textoBusqueda"
          rows="1"
          columns="1"
        ></v-textarea>
        <v-btn variant="plain" @click="this.findCourse2()">
          <a>
            <img :src="lupa" alt="Lupa" class="lupa" />
          </a>
        </v-btn>
      </div>
      <div id="ps">
      
      <div v-for="course in coursesResult" :key="course" id="course">
        <a :href="'/course/' + course.id"
          ><img
            :href="URL"
            :src="course.photo"
            class="coursePhoto"
            id="coursePhotoAux"
        /></a>
        <div id="courseInfo">
          
              <a id="as" :href="'/course/' + course.id">
                <span>{{ course.name }}</span></a
              >
              <StarsComp :stars="course.stars" /> {{ course.price }} €/cts
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nota de corte:
              {{ course.minGrade }}<br />

        </div>
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
import createCourseService from "@/services/createCourseService.js";

export default defineComponent({
  name: "InstitutionsView",

  data() {
    return {
      image: "/1.jpg",
      lupa: "/lupa.png",
      idInstitution: this.$route.params.id,
      institucion: [],
      courses: [],
      coursesResult: [],
      coursesNew: [],
      busqueda: "",
      textoBusqueda: "",
      starsInt: 0.0,
      createCourseDialog: false,
      courseData: {
        name: "",
        minGrade: 0,
        price: 0,
        numStudents: "",
        institutionID: this.$route.params.id,
        stars: 0,
        photo: "",
      },
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
            this.starsInt = this.institucion.stars;
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
          tipo: "institutionID",
          institutionID: this.idInstitution,
        })
        .then((res) => {
          let courseExists = res.data.exists;
          if (courseExists) {
            //leer lo que devuelve el servidor donde courses es un array que tiene todos los cursos
            //que hay en la base de datos con esas caracteristicas
            this.courses = res.data.courses;
            this.coursesResult = res.data.courses;
          } else {
            console.log("No existe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findCourse2: function () {
      this.coursesResult = this.courses.filter((course) => {
        return course.name.includes(this.textoBusqueda);
      });
      console.log(this.coursesResult);
    },
    createCourse: async function () {
      await createCourseService
        .create(this.courseData)
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });

      this.createCourseDialog = false;
    },

    onPhotoChange: function () {
      // Crear la foto en base64
      this.courseData.photo = this.$refs.photo.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.courseData.photo);
      reader.onload = (e) => {
        this.courseData.photo = e.target.result;
      };
    },
  },
});
</script>


<style lang="css" scoped>
@font-face {
  font-family: "Palatino Linotype";
  font-style: normal;
  font-weight: 400;
  src: local("Palatino Linotype"), local("PalatinoLTStd-Roman"),
    url(https://fonts.gstatic.com/s/palatinolinotype/v9/lJwE-pIzkQ5ey4VjC7t6Gc7KZdw.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
    U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

* {
  font-family: "Palatino Linotype", "Times New Roman", serif;
}
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

#course {
  display: flex;
  flex-direction: row;
  box-shadow: 3px 3px 1px rgb(212, 212, 212);
  border-radius: 3px;
}

#courseInfo {
  display: flex;
  flex-direction: row;
  width: 750px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 4%;
  flex-grow: 1;
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
  margin-left: 20px;
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

.coursePhoto {
  width: 100px;
  height: 80px;
  margin-left: 10px;
  margin-top: 10px;
}

#stars {
  justify-content: center;
}
</style>