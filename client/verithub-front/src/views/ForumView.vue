<template>
  <div>
    Este es el foro numero {{ idForum }}
    <div id="posts">
      <PostButtonComp v-for="post in posts" :postData="post" :key="post"></PostButtonComp>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PostButtonComp from '../components/PostButtonComp.vue';

export default defineComponent({
  name: 'ForumView',

  components: {
    PostButtonComp,
  },

  data() {
    return {

      // Con este id se obtienen los datos del foro, incluidos los hilos y se forman los componentes necesarios
      idForum: this.$route.params.id,

      // Rellenar el array con datos reales de database
      posts: [
            { 
              postTitle: "POST DE PRUEBA",
              postURL: "/forum/"+this.$route.params.id+"/1",
              postDescription: "Este es un post de prueba",
              postDate: "01/01/2020",
              postAuthor: "Juan",
            },
            { 
              postTitle: "POST DE PRUEBA 2",
              postURL: "/forum/"+this.$route.params.id+"/2",
              postDescription: "Este es un post de prueba 2",
              postDate: "01/01/2020",
              postAuthor: "Jose",
            }
      ],
    }
  },
  methods: {
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