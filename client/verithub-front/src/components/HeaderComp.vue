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

      <v-toolbar-items v-if ="!isLogged">

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
                @click="
                  loginDialog = false; 
                  loginError = false; 
                  userData.email = ''; 
                  userData.password = '';
                "
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

      <v-dialog
        v-model="signupDialog"
      >
        <!--eslint-disable-next-line vue/no-unused-vars-->
        <template v-slot:activator="{ props }">
            <v-btn 
              :="props"
              target="_blank"
              class="white--text"
              dark
            >
              Sign up
            </v-btn>
        </template>

        <v-card
          elevation="7"
        >
          <v-progress-linear
            v-if="registerLoading"
            class="position-absolute"
            style="z-index: 1"
            color="deep-purple"
            height="3"
            indeterminate
          ></v-progress-linear>
          <v-card-title>
            <span class="text-h5">Registrarse</span>
          </v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              v-model="isRegisterValid"
              lazy-validation
            >
              <v-text-field
                class="card-form-input"
                v-model="registrationData.username"
                label="Nombre de usuario"
                type="text"
                autofocus
                required
                :rules="usernameRules"
              ></v-text-field>
              <v-text-field
                class="card-form-input"
                v-model="registrationData.name"
                label="Nombre"
                type="text"
                autofocus
                required
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                class="card-form-input"
                v-model="registrationData.lastname"
                label="Apellidos"
                type="text"
                required
                :rules="lastnameRules"
              ></v-text-field>
              <v-text-field
                class="card-form-input"
                v-model="registrationData.email"
                label="Email"
                type="email"
                autofocus
                required
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                class="card-form-input"
                v-model="registrationData.password"
                label="Contraseña"
                type="password"
                required
                :rules="passwordRules"
              ></v-text-field> 
              <!-- Rules esta aqui porque si no no funciona, no se por que -->
              <v-text-field
                class="card-form-input"
                v-model="registrationData.passwordConfirm"
                label="Confirmar contraseña"
                type="password"
                required
                :rules="[
                    pw => !!pw || 'Este campo es requerido',
                    pw => pw.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
                    pw => pw === this.registrationData.password || 'Las contraseñas no coinciden'
                ]"
              ></v-text-field>
            </v-form>
            <v-alert
              v-if="registerError"
              type="error"
              class="ma-2"
            >Datos introducidos incorrectos.</v-alert>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              @click="
                  signupDialog = false; 
                  registerError = false; 
                  registrationData.name = ''; 
                  registrationData.lastname = ''; 
                  registrationData.email = ''; 
                  registrationData.password = ''; 
                  registrationData.passwordConfirm = '';
                "
            >
              Cancelar
            </v-btn>
            <v-btn
              variant="text"
              @click="this.register()"
              :disabled="!isRegisterValid"
            >
              Registrarse
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>

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
            <div> {{getUserName}} </div> &nbsp;
            <v-avatar>
              <img
                :src="getUserPhotoURL"
                :alt="getUserName"
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
                  target="_self"
                  class="white--text"
                  dark
                  variant="text"
                >{{item.text}}
                </v-btn>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <v-btn
                  @click="this.endSession(); "
                  class="white--text"
                  dark
                  variant="text"
                >Cerrar sesión
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

import { mapGetters, mapState, mapActions } from 'vuex';
import authenticationService from '@/services/authenticationService.js';

export default {
  name: 'HeaderComp',
  data: () => ({

    headerData: {
      logo: '/logo.png',
      loggedMenuItems: [
        {
          text: 'Perfil',
          href: '/profile',
        },
      ],
    },

    // Datos temporales usados para los formularios, para persistencia se usa store user
    userData: {
      userName: '',
      photoURL: '',
      email: '',
      password: '',
    },

    registrationData: {
      name: '',
      lastname: '',
      username: '',
      email: '',
      password:'',
      passwordConfirm: '',
    },

    // Datos necesarios para login y registro, validación, etc.
    loginDialog: false,
    signupDialog: false,

    loginLoading: false,
    registerLoading: false,
    
    loginError: false,
    registerError: false,
    registerErrorMsg: '',

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
    passwordConfirmRules: [
      pw2 => !!pw2 || 'Este campo es requerido',
      pw2 => pw2.length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
      pw2 => this.registrationData.password != undefined && pw2 === this.registrationData.password || 'Las contraseñas no coinciden'
    ],
    nameRules: [
      name => !!name || 'Este campo es requerido',
      name => name.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
    ],
    lastnameRules: [
      lastname => !!lastname || 'Este campo es requerido',
      lastname => lastname.length >= 3 || 'Los apellidos deben tener al menos 3 caracteres'
    ],
    usernameRules: [
      username => !!username || 'Este campo es requerido',
      username => username.length >= 3 || 'El nombre de usuario debe tener al menos 3 caracteres'
    ],


  }),

  computed: {

    // Los datos del usuario en el store

    ...mapState({
      isLogged: state => state.user.isLogged
    }),

    // Se mappean los getters para que llamando a la funcion mappeada se llame al getter del store
    // Equivalente a getUserName() { return this.$store.getters.userName } ...
    ...mapGetters('user', {
      getUserName: 'userName',
      getUserPhotoURL: 'photoURL',
      getUserEmail: 'email',
      getFullName: 'fullName',
      getPassword: 'password',
    }),

  },

  methods: {
    
    // Actions del store
    // map this.setUserName() to this.$store.dispatch('user/setUserName', 'newName') ...
    ...mapActions('user', [
      'setUserName',
      'setPhotoURL',
      'setEmail',
      'setFullName',
      'setPassword',
      'setLoggedIn',
      'setIsAdmin',
      'logout',
    ]),

    login: async function() {
      this.loginLoading = true;
      
      //Se llama a la funcion de login del servidor para comprobar si el usuario existe, si existe devuelve true, los datos y se loggea
      //Si no existe devuelve false y se muestra un mensaje de error, y no se loggea
      //Al final se borra la contraseña de los datos del usuario

      await authenticationService.login({
        email : this.userData.email,
        password : this.userData.password
      }).then( res => {

        // Asignar los demas datos datos del usuario TODO: DEMAS DATOS
        console.log(res.data.fullName)
        this.setUserName(res.data.username);
        this.setPhotoURL(res.data.photo);
        this.setEmail(res.data.email);
        this.setFullName(res.data.fullName);
        this.setPassword(this.userData.password);
        this.setLoggedIn(true);
        this.setIsAdmin(res.data.isAdmin);

        for(let item in this.userData){
          this.userData[item] = '';
        }

        this.loginError = false;
        this.loginDialog = false;


      }).catch(() => {

        this.loginError = true;
        this.setLoggedIn(false);

      });

      this.loginLoading = false;
    },

    register: async function() {

      //Se llama a la funcion de registro del servidor para comprobar si el usuario existe, si existe devuelve true y se muestra un mensaje de error
      //Si no existe devuelve false y se registra el usuario
      //Al final se borra los datos de userReigstration

      this.registerLoading = true;

      await authenticationService.register({
          name : this.registrationData.name,
          lastname : this.registrationData.lastname,
          username : this.registrationData.username,
          email: this.registrationData.email,
          password: this.registrationData.password,
          
      }).then( () => {
          
          // Si se ha completado la peticion correctamente, se borran los datos del formulario
          this.registerError = false;
          this.registerDialog = false;
          
          for(let item in this.registrationData)
            this.registrationData[item] = '';
      }).catch(() => {
          // Si da error, avisa al usuario
          this.registerError = true;
          this.registerDialog = true;
          this.headerData.isLogged = false;
          this.registerErrorMsg = 'El usuario con este email ya existe.';
      });
        this.registerLoading = false;
      },
    
    endSession: function() {
      this.logout();
      window.location.href = '/';
    },
  },

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