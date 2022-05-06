<template>
  <div id="principal">
    <div id="titulo">
      <img :src="logoTitulo" id="logoTitulo" />

      <h1>{{ title }}</h1>
    </div>
    <div id="buscar">
      <v-textarea
        name="searchUniversity"
        label="Search for an university"
        no-resize
        clearable
        clear-icon="mdi-close-circle"
        rows="1"
        columns="1"
      ></v-textarea>
      <v-btn variant="plain">
        <a href="/" class="text-primary">
          <img :src="lupa" alt="Lupa" class="lupa" />
        </a>
      </v-btn>
    </div>
    <div id="carrusel">
      <v-carousel :show-arrows="false" hide-delimiters id="carrus" cycle>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
            max-height="30%"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => ({
    title: "VeritHub",
    lupa: "./lupa.png",
    logoTitulo: "./logoTitulo.png",
    items: [
      {
        src: "./1.jpg",
      },
      {
        src: "./2.jpg",
      },
      {
        src: "./3.jpg",
      },
      {
        src: "./4.jpg",
      },
    ],
  }),
};
</script>

<style lang="css" scoped>
h1 {
  text-align: center;
  top: 150px;
  font-size: 50px;
  font-weight: 100;
  color: gray;
  -webkit-text-stroke: 1px rgb(222, 233, 224);
}

#principal {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}

#titulo {
  z-index: 3;
}

#buscar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  z-index: 2;
  margin-top: 5%;
}

#logoTitulo {
  align-self: center;
  width: 100px;
  height: 60px;
  margin-left: 45%;
}

.v-textarea {
  margin-left: 30%;
  margin-right: 25%;
}

.v-btn {
  margin-top: 1%;
  right: 25%;
}

.lupa {
  width: 55px;
  height: 20px;
}

#carrusel {
  position: relative;
  z-index: 1;
  width: 60%;
  height: 10px;
  margin-left: 20%;
  margin-top: 2%;
  
}
</style>