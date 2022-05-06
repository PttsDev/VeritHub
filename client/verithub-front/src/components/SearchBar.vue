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
    <h2>{{ favoritas }}</h2>
    <div id=universidades>
      <v-btn flat class="unis-btn">
        <img src= "./ule.jpg" height="67" width="124"/>
    </v-btn>
    <div class="espacio"></div>
    <v-btn flat class="unis-btn">
        <img src= "./uniovi.jpg" height="120" width="124"/>
    </v-btn>
    <div class="espacio"></div>
    <v-btn flat class="unis-btn">
        <img src= "./universidadSalamanca.png" height="87" width="124"/>
    </v-btn>
    <div class="espacio"></div>
    <v-btn flat class="unis-btn">
        <img src= "./universidad-complutense-madrid.jpg" height="99" width="124"/>
    </v-btn>
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
    favoritas: "Algunas universidades",
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
}

h2{
  text-align: center;
    font-family: 'Palatino Linotype';
    font-style: normal;
    font-weight: 400;
    color: gray;
    margin-top:3%
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
  margin-left: 46.8%;
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

#universidades{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  margin-left: 35%;
  margin-top:1%;
}

.unis-btn{
  height: 120px;
  width: 124px;
}

.espacio{
  width: 20%;
}

</style>