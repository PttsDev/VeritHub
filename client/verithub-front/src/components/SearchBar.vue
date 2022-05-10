<template>
  <div id="principal">
    <div id="titulo">
      <img :src="logoTitulo" id="logoTitulo" />

      <h1>{{ title }}</h1>
    </div>
    <div id="buscar">
      <v-textarea id="areaBusqueda"
        name="searchUniversity"
        label="Search for an university"
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
    <h2>{{ favoritas }}</h2>
    <div id="universidades">
      <v-btn flat class="unis-btn">
        <img src="./ule.jpg" height="67" width="124" />
      </v-btn>
      <div class="espacio"></div>
      <v-btn flat class="unis-btn">
        <img src="./uniovi.jpg" height="120" width="124" />
      </v-btn>
      <div class="espacio"></div>
      <v-btn flat class="unis-btn">
        <img src="./universidadSalamanca.png" height="87" width="124" />
      </v-btn>
      <div class="espacio"></div>
      <v-btn flat class="unis-btn">
        <img
          src="./universidad-complutense-madrid.jpg"
          height="99"
          width="124"
        />
      </v-btn>
    </div>
    <div id="select">
    <v-container fluid>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="tipos" label="Buscar por:" v-model="tipo" id="selected"></v-select>
      </v-col>
    </v-container>
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
    lupa: "./lupa.png",
    logoTitulo: "./logoTitulo.png",
    favoritas: "Algunas universidades",
    tipos: ["Name", "Type", "Province", "Stars", "Public"], //Cambiar la forma de buscar
    textoBusqueda: "",
    tipo:"Name",
  }),


  methods: {

    ...mapActions('institutions', [
      'setFoundInstitutions',
    ]),

    find: async function(){

      await findInstitutionService.find({
        tipo : this.tipo,
        atributo : this.textoBusqueda
      }).then( res=>{
        let institutionExists = res.data.exists;
        if(institutionExists) {

        //leer lo que devuelve el servidor donde institutions es un array que tiene todas las universidades 
        //que hay en la base de datos con esas caracteristicas
        let instituciones = res.data.institutions;
        for(let i = 0; i < instituciones.length; i++){
          
          alert(instituciones[i].name);
        }

        this.setFoundInstitutions(instituciones);

      }else{
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

#principal {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}

#titulo {
  z-index: 3;
}

#select {
  z-index: 4;
  margin-top: -24.2%;
  margin-left: 54%;
  width: 30%;
}

#buscar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  
  margin-top: 5%;
}

#logoTitulo {
  align-self: center;
  width: 100px;
  height: 60px;
  margin-left: 46.8%;
}

.v-textarea {
  margin-left: 30%;
  margin-right: 25%;
}

#areaBusqueda {
  z-index: 2;

}

.v-btn {
  margin-top: 1%;
  right: 25%;
  z-index: 5;
}

.lupa {
  width: 55px;
  height: 20px;
}

#universidades {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  margin-left: 35%;
  margin-top: 1%;
}

.unis-btn {
  height: 120px;
  width: 124px;
}

.espacio {
  width: 20%;
}
</style>