<template>
  <!--Clave API: AIzaSyD_IlgiAW6kpxobip8z7gW6lcPoJsK9yHA-->
  <div class="initial">
    <div class="main-body-conteiner">
      <div class="search-bar-container">
        <!--Aquí vendríala search bar-->
        <h2>ESTO ES LA BARRA DE NAVEGACIÓN</h2>
      </div>
      <div class="content-container">
        <ol>
          <li v-for="(univ, index) in this.institutions" :key="index">
            <SearchLabelComp :title="univ.name" :stars="univ.stars"/>
          </li>
        </ol>
        <div class="map-container">
          <!--Aquí viene el mapa-->
          <h2>ESTO ES EL MAPA</h2>
        </div>
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

export default defineComponent({
  name: 'ResultsView',

  components: {
    FooterComp,
    SearchLabelComp,
  },
  data: ()=>{
    return{ 
      //institutions : this.$store.state.institutions.foundInstitutions,
      institutions : [
        {name:"Salamanca", stars:4},
        {name:"Leon", stars:5},
        {name:"Burgos", stars:1},
        {name:"Madrid", stars:2},
      ],
    }
  },
  },
);
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /*La altura debe ser la justa para que entren los elementos en linea (row)*/

    /*Test */
    border: 3px solid red;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    /*La altura debe ser la justa para que entren los elementos en linea (row)*/
  }

  .content-container > * {
    width: 50%;
  }

  .map-container{
    /*Test */
    border: 3px solid greenyellow;
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



</style>