<template>
  <div class="initial">
    <div class="main-body-conteiner">
      <div class="search-bar-container">
        <div class="search-bar">
          <v-text-field
          name="searchUniversity"
          label="Search for an university"
          v-model="textoBusqueda"
          class="item-search"
          clearable
          ></v-text-field>
          <v-btn variant="plain" @click="this.find()">
            <a>
              <img :src="lupaURL" alt="Lupa" class="lupa" />
            </a>
          </v-btn>
        </div>
      </div>
      <div class="content-container">
          <ol>
            <li v-for="(univ, index) in this.institutions" :key="index">
              <SearchLabelComp 
              :title="univ.name" 
              :stars="univ.stars" 
              :provincia="univ.provincia" 
              :id="univ.id" 
              :isPublic="univ.isPublic"
              :photo="univ.photo"/>
            </li>
         </ol>
      </div>
    </div>
   <FooterComp />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import FooterComp from '../components/FooterComp.vue';
import SearchLabelComp from '../components/SearchLabelComp.vue';
import findInstitutionService from '@/services/findInstitutionService.js';

export default defineComponent({
  name: 'ResultsView',

  components: {
    FooterComp,
    SearchLabelComp,
  },
  data: ()=>{
    return{ 
      institutions : this.$store.state.institutions.foundInstitutions,
      textoBusqueda: "",
      lupaURL: "./lupa.png",
    }
  },
  methods: {
    find: async function(){
    console.log("find: "+this.textoBusqueda);

      await findInstitutionService.find({
        tipo : this.tipo,
        atributo : this.textoBusqueda
      }).then( res=>{
        if(res.data.exists) this.setFoundInstitutions(res.data.institutions);
        else alert("No existe");

      }).catch((err) => {
        console.log(err);
      });
      this.textoBusqueda = "";
    },
  },
  
});
</script>

<style lang="css">

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
    margin:0;
    padding:0;
  }

  .initial {
    display: flex;
    flex-direction: column;
  }

  .main-body-container {
    display: flex;
    flex-direction: column;
  }

  .search-bar-container {
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .search-bar{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /*La altura debe ser la justa para que entren los elementos en linea (row)*/
  }
  
  .results-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
    
    /*Test */
    border: 3px solid black;
  }

  .map-container {
    display: flex;
  }

  ol li {
    list-style-type: none;
  }

  .lupa {
    width: 55px;
    height: 20px;
  }

  .item-search {
    width: 250px;
    height: 55px;
    margin: 0%;
    padding: 0%;

  }

  v-select {
    height: 55px;
    margin: 0px;
    padding: 0px;
  }
</style>