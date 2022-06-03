<template>
  <v-app>
    <v-main>
      <HeaderComp />
      <router-view class="a"/>
      <FooterComp  />
    </v-main>
  </v-app>
</template>

<script>

import FooterComp from './components/FooterComp.vue';
import HeaderComp from './components/HeaderComp.vue';

export default {
  name: 'App',
  components: {
    FooterComp,
    HeaderComp,
  },
  data: () => ({
    //
  }),
  beforeCreate() {this.$store.dispatch('user/initializeStore');},
}
</script>

<style lang="css">

.a{
  padding-bottom: 50px;
}

</style>