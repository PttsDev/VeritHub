<template>
  <div id="principal">
    <label id="icon">
      <img :src="courses.photo" alt="imagen" class="imagen" />
      <div id="nombre">
        {{ subjects.name }}
      </div>
      <StarsComp id="stars" />
    </label>
    <label id="comments"> comentarios </label>
    <label id="courses">
      <FONT FACE="Palatino Linotype" SIZE="6" COLOR="red" font-weight="bold"
        >GUIA DOCENTE</FONT
      ><br />
      <b><FONT FACE="Palatino Linotype" SIZE="4">Competencias</FONT></b
      ><br />
      <ul>
        <li>
          Conocimiento, administración y mantenimiento sistemas, servicios y
          aplicaciones informáticas.
        </li>
        <li>
          Conocimiento y aplicación de las herramientas necesarias para el
          almacenamiento, procesamiento y acceso a los Sistemas de información,
          incluidos los basados en web.
        </li>
      </ul>

      Conocimiento y aplicación de los principios, metodologías y ciclos de vida
      de la ingeniería de software.<br />
      Conocimiento de la normativa y la regulación de la informática en los
      ámbitos nacional, europeo e internacional.<br />
      Capacidad para comprender el entorno de una organización y sus necesidades
      en el ámbito de las tecnologías de la información y las comunicaciones.<br />
      Capacidad para seleccionar, desplegar, integrar y gestionar sistemas de
      información que satisfagan las necesidades de la organización, con los
      criterios de coste y calidad identificados.<br />
      Capacidad para diseñar, desarrollar, seleccionar y evaluar aplicaciones y
      sistemas informáticos, asegurando su fiabilidad, seguridad y calidad,
      conforme a principios éticos y a la legislación y normativa vigente.<br />
      Capacidad para concebir, desarrollar y mantener sistemas, servicios y
      aplicaciones informáticas empleando los métodos de la ingeniería del
      software como instrumento para el aseguramiento de su calidad, de acuerdo
      con los conocimientos adquiridos.<br />
      Capacidad para conocer, comprender y aplicar la legislación necesaria
      durante el desarrollo de la profesión de Ingeniero Técnico en Informática
      y manejar especificaciones, reglamentos y normas de obligado
      cumplimiento.<br />
      Conocimiento de las materias básicas y tecnologías, que capaciten para el
      aprendizaje y desarrollo de nuevos métodos y tecnologías, así como las que
      les doten de una gran versatilidad para adaptarse a nuevas situaciones.<br />
      Capacidad para resolver problemas con iniciativa, toma de decisiones,
      autonomía y creatividad. Capacidad para saber comunicar y transmitir los
      conocimientos, habilidades y destrezas de la profesión de Ingeniero
      Técnico en Informática.<br />
      Conocimientos para la realización de mediciones, cálculos, valoraciones,
      tasaciones, peritaciones, estudios, informes, planificación de tareas y
      otros trabajos análogos de informática, de acuerdo con los conocimientos
      adquiridos.<br />
      Capacidad para el aprendizaje autónomo e individual en cualquier campo de
      la ingeniería.<br />
      Capacidad de trabajo en equipo, asumiendo diferentes roles dentro del
      grupo.<br />
      Capacidad para la realización de mediciones y cálculos, manejando
      especificaciones, reglamentos y normas.<br />
      Que los estudiantes tengan la capacidad de reunir e interpretar datos
      relevantes (normalmente dentro de su área de estudio) para emitir juicios
      que incluyan una reflexión sobre temas relevantes de índole social,
      científica o ética.<br />
      Que los estudiantes puedan transmitir información, ideas, problemas y
      soluciones a un público tanto especializado como no especializado<br />
      Que los estudiantes hayan desarrollado aquellas habilidades de aprendizaje
      necesarias para emprender estudios posteriores con un alto grado de
      autonomía<br />
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
          tipo: "id",
          institutionID: this.IDcourse,
        })
        .then((res) => {
          let courseExists = res.data.exists;
          this.courses = res.data.courses;
            this.courses = this.courses[0];
            
          if (courseExists) {
            //leer lo que devuelve el servidor donde courses es un array que tiene todos los cursos
            //que hay en la base de datos con esas caracteristicas
            
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
          this.subjects = res.data.subjects;
            this.subjects = this.subjects[0];
            alert(this.subjects);
          if (subjectExists) {
            //leer lo que devuelve el servidor donde courses es un array que tiene todos los cursos
            //que hay en la base de datos con esas caracteristicas
            
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
h1 {
  font-size: 1.5em;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 0;
}

ul {
  list-style-type: circle;
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
</style>