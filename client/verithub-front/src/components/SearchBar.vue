<template>
  <div class="init">
    <div class="title-container">
      <img :src="logoTitulo" id="logoTitulo" />
      <h1>{{ title }}</h1>
    </div>

    <div class="search-container">
      <v-text-field id="areaBusqueda" name="searchUniversity" label="Search for an university"
        v-model="textoBusqueda" clearable></v-text-field>
      <div><v-select :items="tipos" label="Buscar por:" v-model="tipo" id="selected" ></v-select></div>
      <v-btn id="boton-buscar" variant="plain" :href="'/results'" @click="this.find()">
        <a>
          <img :src="lupa" alt="Lupa" class="lupa" />
        </a>
      </v-btn>
    </div>

    <div class="icons-container">
      <h2>{{ favoritas }}</h2>
      <div id="universidades-icons">
        <v-btn flat class="unis-btn">
          <img src="./ule.jpg" height="67" width="124" />
        </v-btn>

        <v-btn flat class="unis-btn">
          <img src="./uniovi.jpg" height="120" width="124" />
        </v-btn>

        <v-btn flat class="unis-btn">
          <img src="./universidadSalamanca.png" height="87" width="124" />
        </v-btn>

        <v-btn flat class="unis-btn">
          <img src="./universidad-complutense-madrid.jpg" height="99" width="124" />
        </v-btn>
      </div>
    </div>

  </div>





</template>

<script>

import { mapActions } from 'vuex';
import findInstitutionService from '@/services/findInstitutionService.js';

export default {
  name: "SearchBar",
  data: () => ({
    title: "VeritHub",
    lupa: "/lupa.png",
    logoTitulo: "/logoTitulo.png",
    favoritas: "Algunas universidades",
    tipos: ["Name", "Type", "Province", "Stars", "Public"], //Cambiar la forma de buscar
    textoBusqueda: "",
    tipo: "Name",
  }),


  methods: {

    ...mapActions('institutions', [
      'setFoundInstitutions',
    ]),

    find: async function () {

      if (this.tipo == "Name") {

        return this.findCointains();

      }

      await findInstitutionService.find({
        tipo: this.tipo,
        atributo: this.textoBusqueda
      }).then(res => {
        let institutionExists = res.data.exists;
        if (institutionExists) {

          //leer lo que devuelve el servidor donde institutions es un array que tiene todas las universidades 
          //que hay en la base de datos con esas caracteristicas
          let instituciones = res.data.institutions;
          this.setFoundInstitutions(instituciones);

        } else {
          alert("No existe");
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    findCointains: async function () {

      await findInstitutionService.findCointains({
        name: this.textoBusqueda
      }).then(res => {
        let institutionExists = res.data.exists;
        if (institutionExists) {

          //leer lo que devuelve el servidor donde institutions es un array que tiene todas las universidades 
          //que hay en la base de datos con esas caracteristicas
          let instituciones = res.data.institutions;
          this.setFoundInstitutions(instituciones);
        } else {
          alert("No existe");
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },


};
</script>

<style lang="css" scoped>
h1 {
  text-align: center;
  top: 150px;
  font-size: 50px;
  font-weight: 100;
  color: gray;
}

h2 {
  text-align: center;
  font-family: "Palatino Linotype";
  font-style: normal;
  font-weight: 400;
  color: gray;
  margin-top: 3%;
}

.init {
  display: flex;
  flex-direction: column;
  margin-top:50px;
}

.title-container .icon-container .search-container {
  height: 33%;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 50px;
}

.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 600px;
  margin-left:90px;
  margin-top: -20px;
}

.icons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.universidades-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#logoTitulo { 
  width: 100px;
  height: 60px;
  margin: 0;
  padding: 0;
}

.v-btn {
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
}

#boton-buscar {
  margin-bottom: 50px;
  margin-left: -20px;
}

.unis-btn {
  height: 120px;
  width: 124px;
  padding: 10px 10px;
}

.lupa {
  height: 30px;
  width: auto;
  align-self:top;
}


</style>