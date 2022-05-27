<template>
  <div id="content">
    <h1 id="title"> Mi perfil </h1>

    <div id="mainDiv">
      <div id="photoDiv">
        <h2 style="text-align: center; margin-bottom: 10px;" >Foto de perfil:</h2>
        <img id="photo" :src="photo" alt="">
        <input type="file" ref="photo" @change="onPhotoChange" style="display:none" accept="image/*">
        <v-btn @click="$refs.photo.click()" id="changeImgBtn" class="white--text" dark> Modificar foto </v-btn>
      </div>

      <div id="personalDataSection">
        <h2 style="text-align: center; margin-top: 10px;">Datos personales:</h2>

        <div id="userData">
          <div id="labels">
            <label style="font-weight: bold; margin-right:5px;" v-for="(data, index) in keys" :key="index"> {{ data }}
            </label>
          </div>
          <div id="data">
            <div class="dataLabel" v-for="(data, index) in this.userData" :key="index">
              <input :disabled="!editing" type="text" v-model="userData[index]" />
            </div>
            <div class="dataLabel">
              <input :disabled="!editing" type="password" v-model="password" />
            </div>
          </div>
        </div>
        
        <v-btn id="changeDataBtn" @click="editData" class="white--text" dark> {{ modText }} </v-btn>
        <v-btn v-show="editing" id="changeDataBtn" @click="cancelEdition" class="white--text" dark> Cancelar modificación </v-btn>
      </div>

    </div>

  </div>
</template>

<script>
import store from '@/store'
import userService from '@/services/userService.js';

export default {
  data: () => ({
    photo: store.state.user.photoURL,
    keys: ['Nombre: ', 'Email: ', 'Nombre de usuario: ', 'Contraseña: '],
    userData: [
      store.state.user.fullName,
      store.state.user.email,
      store.state.user.userName,
    ],
    datosPrevios: [],
    password: store.state.user.password,
    editing: false,
    modText: "Modificar datos",
  }),
  methods: {
    editData: function () {

      if (!this.editing) {
        this.editing = true;
        this.datosPrevios = this.userData.slice();
        this.modText = "Guardar cambios";

      } else {

        //Guardar nuevos datos
        
        let modifiedData = {
          fullName: this.datosPrevios[0],
          email: this.datosPrevios[1],
          userName: this.datosPrevios[2],
          password: store.state.user.password,
          photo:null,
          oldEmail: store.state.user.email,
          oldPassword: store.state.user.password,
        }
        
        if(this.userData[0].length>3)
          modifiedData.fullName = this.userData[0];
          
        if(this.userData[1].length>3)
          modifiedData.email = this.userData[1];
         
        if(this.userData[2].length>3)
          modifiedData.userName = this.userData[2];
          
        if(this.password.length>3)
            modifiedData.password = this.password;

        userService.modifyData(modifiedData).then(()=>{
          store.dispatch('user/setFullName', this.userData[0]);
          store.dispatch('user/setEmail', this.userData[1]);
          store.dispatch('user/setUserName', this.userData[2]);
          store.dispatch('user/setPassword', this.password);

        }).catch(
          error => {
            console.log(error);
          }
        )

        this.editing = false;
        this.modText = "Modificar datos";
      }

    },
    cancelEdition: function(){
      this.editing = false;
      this.modText = "Modificar datos"; 

      this.userData = this.datosPrevios.slice();
      this.password = store.state.user.password
    },
    onPhotoChange: function() {
      // Crear la foto en base64
      this.photo = this.$refs.photo.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = (e) => {
        this.photo = e.target.result;
        store.state.user.photoURL = this.photo;
        
        userService.modifyData({email: store.state.user.email, password: store.state.user.password, photo:this.photo}).then(()=>{
        }).catch(
          error => {
            console.log(error);
          })
      }
    }
  },
  beforeMount() {
  },

}

</script>


<style lang="css" scoped>
#mainDiv {
  display: flex;
  margin: auto;
  width: 80%;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  padding: 10px;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
}

#title {
  text-align: center;
  margin-bottom: 20px;
}

#photoDiv {
  display: flex;
  flex-direction: column;
  align-items: center;

}

#photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

#userData {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

#labels {
  display: flex;
  flex-direction: column;
  text-align: right;
}

#data {
  display: flex;
  flex-direction: column;
  margin-left: 2px;
}

.userDataInput {
  width: 60px;
  height: 20px;
  margin-left: 10px;
}

.dataLabel {
  display: flex;
  flex-direction: row;
}

#personalDataSection {
  display: flex;
  flex-direction: column;
}
#changeDataBtn{
  margin-top: 10px;
}
</style>