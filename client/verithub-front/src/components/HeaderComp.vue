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
            :src="headerData.logo"
            alt="Logo"
            class="mr-2 logo"
          />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if ="!headerData.isLogged">

        <v-dialog
          v-model="loginDialog"
        >
        <!--eslint-disable-next-line vue/no-unused-vars-->
          <template v-slot:activator="{ props }">
            <v-btn 
              :="props"
              variant="text"
              target="_blank"
              class="white--text"
              dark
            >
              Log in
            </v-btn>
          </template>

          <v-card
            elevation="7"
          >
            <v-progress-linear
              v-if="loginLoading"
              class="position-absolute"
              style="z-index: 1"
              color="deep-purple"
              height="3"
              indeterminate
            ></v-progress-linear>
            <v-card-title>
              <span class="text-h5">Iniciar sesión</span>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="form"
                v-model="isLoginValid"
                lazy-validation
              >
                <v-text-field
                  class="card-form-input"
                  v-model="userData.email"
                  label="Email"
                  type="email"
                  autofocus
                  required
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  class="card-form-input"
                  v-model="userData.password"
                  label="Contraseña"
                  type="password"
                  required
                  :rules="passwordRules"
                ></v-text-field>
              </v-form>
              <v-alert
                v-if="loginError"
                type="error"
                class="ma-2"
              >Datos introducidos incorrectos.</v-alert>
              
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                @click="loginDialog = false; loginError = false; userData.email = ''; userData.password = ''"
              >
                Cancelar
              </v-btn>
              <v-btn
                variant="text"
                @click="this.login()"
                :disabled="!isLoginValid"
              >
                Iniciar sesión
              </v-btn>
            </v-card-actions>
          </v-card>

      </v-dialog>

        <v-btn
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
            <div> {{userData.name}} </div> &nbsp;
            <v-avatar>
              <img
                :src="userData.photoURL"
                :alt="userData.name"
                class="profile-image"
              />
            </v-avatar>
          </v-btn>
          </template>

          <v-list>
            <v-list-item 
              v-for="(item, index) in headerData.loggedMenuItems"
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

    headerData: {
      logo: './logo.png',
      isLogged: false,
      loggedMenuItems: [
        {
          text: 'Perfil',
          href: '/profile'
        },
        {
          text: 'Cerrar sesión',
          href: '/logout'
        }
      ],
    },

    userData: {
      name: '',
      photoURL: '',
      email: '',
      password: '',
    },

    // Datos necesarios para login y registro, validación, etc.
    loginDialog: false,
    signupDialog: false,

    loginLoading: false,
    registerLoading: false,
    
    loginError: false,
    registerError: false,

    isLoginValid: false,
    isRegisterValid: false,

    // Para comprobar si el email y contraseña estan vacios y que cumplen los requerimientos
    emailRules: [
      email => !!email || 'Es necesario introducir un email',
      email => /.+@.+/.test(email) || 'Por favor, ingrese un email válido'
    ],
    passwordRules: [
      pw => !!pw || 'Este campo es requerido',
      pw => pw.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
    ],

  }),

  methods: {
    
    login: function() {
      this.loginLoading = true;
      let userExists = true;
      //TODO: implementar
      //Se llama a la funcion de login del servidor para comprobar si el usuario existe, si existe devuelve true, los datos y se loggea
      //Si no existe devuelve false y se muestra un mensaje de error, y no se loggea
      //Al final se borra la contraseña de los datos del usuario

      if(userExists) {

        // Poner demas datos datos del usuario
        this.userData.password = '';
        this.userData.name= 'Juan';
        this.userData.photoURL= 'https://i.imgur.com/pBcut2e.jpeg';


        this.loginError = false;
        this.loginDialog = false;
        this.headerData.isLogged = true;

      } else {

        this.loginError = true;
        this.isLoggedIn = false;

      }


      console.log(this.userData.email);
      console.log(this.userData.password);

      this.loginLoading = false;
    },

    isLoggedIn: function() {
      // TODO: implementar
      //En este metodo se checkea si el usuario esta loggeado o no, comprobando la cookie de sesion y se actualiza el valor de la variable isLogged
      //Si el usuario esta loggeado, se actualiza la variable user con los datos del usuario llamando al método getUserData()
      this.headerData.isLogged = false;
    },

    getUserData: function() {
      //TODO: implementar
      //En este metodo se obtienen los datos del usuario loggeado o que se acaba de loggear y se actualiza la variable user del store user
    },

    logOut: function() {
      //TODO: implementar
      //En este metodo se cierra la sesión del usuario, borrando la cookie de logueo y todos los datos correspondientes del store

      for(let item in this.userData){
        this.userData[item] = '';
      }
      this.headerData.isLogged = false;
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
  .card-form-input{
    width: 500px
  }

  @media screen and (max-width: 750px) {
    .profile-button {
      margin-right: 10%;
    }
    .card-form-input{
      width: 300px
    }
  }
</style>