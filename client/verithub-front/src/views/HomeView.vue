<template>
  <div>
    <SearchBar />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components

import SearchBar from '../components/SearchBar.vue';


export default defineComponent({
  name: 'HomeView',

  components: {
    SearchBar,
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
  }

</style>
