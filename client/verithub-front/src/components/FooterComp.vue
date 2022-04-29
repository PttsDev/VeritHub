<template>
  <div>
    <!-- El footer tiene 3 columnas que tienen 3 botones, la primera tiene el botón "UNIVERSIDADES" que redirige a otra página
         La segunda tiene el botón "MÁS BUSCADOS" que lleva a otra página y la tercera tiene el botón "ACERCA DE NOSOTROS" que también redirige a otra página -->
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
            target="_blank"
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
        text: 'UNIVERSIDADES',
        href: 'https://placeholder.com/'
      },
      {
        text: 'MÁS BUSCADOS',
        href: 'https://placeholder.com/'
      },
      {
        text: 'ACERCA DE NOSOTROS',
        href: 'https://placeholder.com/'
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


</style>