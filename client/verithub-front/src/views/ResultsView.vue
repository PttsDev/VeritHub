<template>
  <div class="initial">
    <div class="main-body-conteiner">
      <div class="search-bar-container">
        <div v-if="this.$store.state.user.isAdmin">
          <v-dialog v-model="createInstitutionDialog">
            <!--eslint-disable-next-line vue/no-unused-vars-->
            <template v-slot:activator="{ props }">
              <v-btn :="props" target="_blank"> Crear institucion </v-btn>
            </template>

            <v-card elevation="7" style="width: 150%">
              <v-card-title>
                <span class="text-h5">Datos de la institucion</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    lass="card-form-input"
                    v-model="this.institutionData.name"
                    label="Nombre de la institucion"
                    type="text"
                    autofocus
                    required
                    placeholder="Universidad de león..."
                  ></v-text-field>

                  <v-text-field
                    lass="card-form-input"
                    v-model="this.institutionData.province"
                    label="Provincia"
                    type="text"
                    autofocus
                    required
                    placeholder="León..."
                  ></v-text-field>

                  <v-radio-group
                    label="Tipo"
                    v-model="this.institutionData.type"
                  >
                    <v-radio label="Universidad" value="0"> </v-radio>
                    <v-radio label="Instituto" value="1"> </v-radio>
                  </v-radio-group>

                  <v-radio-group
                    label="Ambito"
                    v-model="this.institutionData.isPublic"
                  >
                    <v-radio label="Publico" value="1"> </v-radio>
                    <v-radio label="Privado" value="0"> </v-radio>
                  </v-radio-group>

                  <input
                    type="file"
                    ref="photo"
                    @change="onPhotoChange"
                    style="display: none"
                    accept="image/*"
                  />
                  <v-btn @click="$refs.photo.click()" class="white--text" dark>
                    Seleccionar foto
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  variant="text"
                  @click="this.createInstitutionDialog = false"
                >
                  Cancelar
                </v-btn>
                <v-btn variant="text" @click="createInstitution()">
                  Crear
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="search-bar">
          <v-text-field
            name="searchUniversity"
            label="Buscar instituticion..."
            v-model="textoBusqueda"
            class="item-search"
            clearable
          ></v-text-field>
          <v-btn variant="plain" @click="this.findCointains()">
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
              :provincia="univ.province"
              :id="univ.id"
              :isPublic="univ.isPublic"
              :photo="univ.photo"
            />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// Components
import { mapActions } from "vuex";
import SearchLabelComp from "../components/SearchLabelComp.vue";
import findInstitutionService from "@/services/findInstitutionService.js";
import createInstitutionService from "@/services/createInstitutionService.js";

export default defineComponent({
  name: "ResultsView",

  components: {
    SearchLabelComp,
  },

  data() {
    return {
      institutions: JSON.parse(sessionStorage.getItem("foundInstitutions")),
      textoBusqueda: "",
      lupaURL: "/lupa.png",
      tipo: "",

      createInstitutionDialog: false,
      institutionData: {
        name: "",
        type: 0,
        province: "",
        isPublic: false,
        stars: 0,
        photo: "",
      },
    };
  },
  methods: {
    ...mapActions("institutions", ["setFoundInstitutions"]),
    find: async function () {
      console.log("find: " + this.textoBusqueda);
      await findInstitutionService
        .find({
          tipo: "name",
          atributo: this.textoBusqueda,
        })
        .then((res) => {
          if (res.data.exists) {
            console.log(res.data.institutions);
            this.institutions = res.data.institutions;
          } else alert("No existe");
        })
        .catch((err) => {
          console.log(err);
        });
      this.textoBusqueda = "";
    },

    findCointains: async function () {
      await findInstitutionService
        .findCointains({
          name: this.textoBusqueda,
        })
        .then((res) => {
          let institutionExists = res.data.exists;
          if (institutionExists) {
            //leer lo que devuelve el servidor donde institutions es un array que tiene todas las universidades
            //que hay en la base de datos con esas caracteristicas
            let instituciones = res.data.institutions;
            this.institutions = instituciones;
            console.log(instituciones);
          } else {
            alert("No existe");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createInstitution: async function () {
      await createInstitutionService
        .create(this.institutionData)
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });

      this.createInstitutionDialog = false;
    },

    onPhotoChange: function () {
      // Crear la foto en base64
      this.institutionData.photo = this.$refs.photo.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.institutionData.photo);
      reader.onload = (e) => {
        this.institutionData.photo = e.target.result;
      };
    },
  },
});
</script>

<style lang="css">
/* fuente Palatino Linotype */
@font-face {
  font-family: "Palatino Linotype";
  font-style: normal;
  font-weight: 400;
  src: local("Palatino Linotype"), local("PalatinoLTStd-Roman"),
    url(https://fonts.gstatic.com/s/palatinolinotype/v9/lJwE-pIzkQ5ey4VjC7t6Gc7KZdw.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
    U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

/* Todo el texto en esa fuente */
body {
  font-family: "Palatino Linotype", "Times New Roman", serif;
  margin: 0;
  padding: 0;
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
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 2rem;
}

.search-bar {
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