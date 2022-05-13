<!-- SEARCH LABEL:
Descripcion:
Se trata de un elemento que se repetirá y que debe mostrar un texto u otro.

Partes:
    - Nombre de la universidad.
    - Rating de la universidad.
    - Distancia a la universidad.(?)
-->

<template>
    <div id="initial">
        <div id="show-images">
            <img class="center-img" src="./1.jpg">
            
        </div>
        <div id="show-info">
            <!--Contiene:
                Título, Distancia, Estrellas, Opiniones.-->

            <h2 class="label-title">Nombre de la Universidad</h2>
            <v-rating class="star-rating" value="3" hover color="warning" ></v-rating>
        </div>

    </div>
</template>

<script>
</script>

<style>
    #initial {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 25%;
    }
    #show-images {
        width: 33%;
    }
    #show-info {
        width: 66%;
        display: flex;
        flex-direction: column; /*para stackear los elementos*/
    }
    .center-img{
        width: 100%;
        height: 100%;
    }
    

</style>