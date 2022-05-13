<template>
  <!--Clave API: AIzaSyD_IlgiAW6kpxobip8z7gW6lcPoJsK9yHA-->
  <div id="initial">
    <HeaderComp />
    <div id="main-body-conteiner">
      <div id="search-bar-container">
        <!--Aquí vendríala search bar-->
      </div>
      <div id="content-container">
        <div id="results-container">
          <!--Aquí viene la lista de resultados-->
          <SearchLabelComp />
          <SearchLabelComp />
          <SearchLabelComp />
        </div>
        <div id="map-container">
          <!--Aquí viene el mapa-->
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
import HeaderComp from '../components/HeaderComp.vue';
import SearchLabelComp from '../components/SearchLabelComp.vue';

export default defineComponent({
  name: 'ResultsView',

  components: {
    FooterComp,
    HeaderComp,
    SearchLabelComp,
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

  #initial {
    display: flex;
  }

  #main-body-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #search-bar-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /*La altura debe ser la justa para que entren los elementos en linea (row)*/
    height:20%;
  }

  #content-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /*La altura debe ser la justa para que entren los elementos en linea (row)*/
    height:80%;
  }

  #results-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: aqua;
    height: 100%;
  }

  #map-container {
    display: flex;
  }



</style>