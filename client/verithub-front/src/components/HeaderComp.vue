<template>
  <div>
    <v-app-bar
      app
      color="white"
      dark
      class="elevation-4"
    >
      <v-toolbar-title>
        <a href="/" class="text-primary">
          <img
            :src="logo"
            alt="Logo"
            class="mr-2 logo"
          />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if ="!isLogged">
        <v-btn 
          :href="notLoggedData.loginHref"
          variant="text"
          target="_blank"
          class="white--text"
          dark
        >
          Log in
        </v-btn>
        <v-btn
          :href="notLoggedData.signupHref"
          target="_blank"
          class="white--text"
          dark
        >
          Sign up
        </v-btn>

      </v-toolbar-items>

      <v-toolbar-items v-else>
        
        <v-menu anchor="start">
          <!--eslint-disable-next-line vue/no-unused-vars-->
          <template v-slot:activator="{props}">
            <v-btn
              target="_blank"
              class="white--text, profile-button"
              dark
              :="props"
              variant="plain"
            >
            <div> {{user.name}} </div> &nbsp;
            <v-avatar>
              <img
                :src="user.photoURL"
                :alt="user.name"
                class="profile-image"
              />
            </v-avatar>
          </v-btn>
          </template>

          <v-list>
            <v-list-item 
              v-for="(item, index) in user.menuItems"
              :key="index"
            >
            <v-list-item-title>
              <v-btn
                :href="item.href"
                target="_blank"
                class="white--text"
                dark
                variant="text"

              >{{item.text}}
              </v-btn>
            </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        
      </v-toolbar-items>
    </v-app-bar>

  </div>
</template>

<script>
export default {
  name: 'HeaderComp',
  data: () => ({
    logo: './logo.png',
    isLogged: false,

    notLoggedData: {
      loginHref: '/login',
      signupHref: '/signup',
    },

    // CAMBIAR A STORE
    user: {
      name: 'Juan',
      photoURL: 'https://i.imgur.com/pBcut2e.jpeg',
      menuItems: [
        {
          text: 'Perfil',
          href: '/profile'
        },
        {
          text: 'Cerrar sesión',
          href: '/logout'
        }
      ]
    },

  }),
  methods: {


    isLoggedIn: function() {
      // TODO: implementar
      //En este metodo se checkea si el usuario esta loggeado o no, comprobando la cookie de sesion y se actualiza el valor de la variable isLogged
      //Si el usuario esta loggeado, se actualiza la variable user con los datos del usuario llamando al método getUserData()
      this.isLogged = false;
    },

    getUserData: function() {
      //TODO: implementar
      //En este metodo se obtienen los datos del usuario loggeado o que se acaba de loggear y se actualiza la variable user del store user
    },

    logOut: function() {
      //TODO: implementar
      //En este metodo se cierra la sesión del usuario, borrando la cookie de logueo y todos los datos correspondientes del store
    }
  },

  beforeMount() {
    this.isLoggedIn();
  }
}
</script>

<style lang="css" scoped>

  /* mantener el header siempre en la parte superior de la pagina y que siempre sea visible */
  .v-app-bar.elevation-4 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 4;
  }

  .logo {
    width: 120px;
    height: 70px;
  }
  .profile-image {
    width: 40px;
    height: 40px;
  }

  .profile-button {
    margin-right: 5%;
  }

  @media screen and (max-width: 750px) {
    .profile-button {
      margin-right: 10%;
    }    
  }
</style>