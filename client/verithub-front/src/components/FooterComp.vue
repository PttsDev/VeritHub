<template>
  <div>
    <v-footer
      app
      fixed
      color="white"
      class="elevation-4"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          v-for="link in links"
          :key="link.text"
          cols="12"
          sm="4"
          md="3"
          lg="2"
          xl="2"
        >
          <v-btn
            :href="link.href"
            variant="text"
            class="white--text"
            dark
          >
            {{ link.text }}
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>


<script>
export default {
  name: 'FooterComp',
  
  data: () => ({
    links: [
      {
        text: 'INSTITUCIONES',
        href: '/'
      },
      {
        text: 'MÁS BUSCADOS',
        href: '/results'
      },
      {
        text: 'TÉRMINOS',
        href: '/about'
      }
    ],
  })
}
</script>


<style lang="css" scoped>

  /* Siempre al final de la pagina, te sigue cuando vas bajando */
  .v-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  @media only screen and (max-width: 992px) {
    .v-footer {
      position: fixed;
      bottom: 0;
      left: auto;
      width: 100%;
      z-index: 100;
    }
  }

</style>