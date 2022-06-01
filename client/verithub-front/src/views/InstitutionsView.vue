<template>
  <div id="principal">
    <label id="icon">
      <img :src="image" alt="imagen" class="imagen" />
      <StarsComp id="stars" />
    </label>
    <label id="comments"> comentarios </label>
    <label id="signatures">
      asignaturas
      <div id="buscar">
        <v-textarea
          id="areaBusqueda"
          name="searchUniversity"
          label="Search course"
          no-resize
          v-model="textoBusqueda"
          clearable
          clear-icon="mdi-close-circle"
          rows="1"
          columns="1"
        ></v-textarea>
        <v-btn variant="plain" @click="this.find()">
          <a>
            <img :src="lupa" alt="Lupa" class="lupa" />
          </a>
        </v-btn>
      </div>
    </label>
  </div>
</template>

<script>
import StarsComp from "../components/StarsComp.vue";
export default {
  name: "InstitutionsView",

  data: () => ({
    image: "./1.jpg",
    lupa: "./lupa.png",
  }),
  components: {
    StarsComp,
  },
};
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
  margin-top: 20%;
  margin-left: -13%;
  border: 1px solid black;
  width: 16%;
  height: 300px;
}

#signatures {
  flex-direction: column;
  margin-top: 6%;
  margin-left: 7%;
  border: 1px solid black;
  width: 60%;
  height: 500px;
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
  
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-left: 65%;
  margin-top: -2%;
  width: 40%;
}

</style>