<template>
    <div id="principal">
        <img
            :src="logoTitulo"
            id="logoTitulo"/>

        <h1>{{title}}</h1>

        <div id="buscar">
        <v-textarea
            name="searchUniversity"
            label="Search for an university"
            no-resize
            clearable
            clear-icon="mdi-close-circle"
            rows=1
            columns=1
        ></v-textarea>
        <v-btn
            variant="plain"
            >
            <a href="/" class="text-primary">
          <img
            :src="lupa"
            alt="Lupa"
            class="lupa"
            
          />
        </a>
      </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data: () => ({
        title: 'VeritHub',
        lupa: './lupa.png',
        logoTitulo: './logoTitulo.png',
    }),
}

</script>

<style lang="css" scoped>
    h1{
        text-align: center;
        top: 150px;
        font-size: 50px;
        font-weight: 100;
        color: gray;
    }  

    #principal{
        display: flex;
        flex-direction: column;
        margin-top:11%;
    }

    #buscar{
        display: flex;
        flex-direction: row;
        align-items: stretch;
        margin-top:11%;
        
    }

    #logoTitulo{
        align-self: center;
        width: 100px;
        height: 60px;
    }

    .v-textarea{
        margin-left: 30%;
        margin-right: 25%;
    }

    .v-btn{
        margin-top:1%;
        right:25%;
    }

    .lupa{

        width: 55px;
        height: 20px;
        
    }
</style>