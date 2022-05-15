<!-- SEARCH LABEL:
Descripcion:
Se trata de un elemento que se repetirá y que debe mostrar un texto u otro.

Partes:
    - Nombre de la universidad.
    - Rating de la universidad.
    - Distancia a la universidad.(?)
-->

<template>
    <div class="label">
        <div class="show-images">
            <img class="center-img" src="./1.jpg">
            
        </div>
        <div class="show-info">
            <!--Contiene:
                Título, Distancia, Estrellas, Opiniones.-->

            <h2 class="label-title">Nombre de la Universidad</h2>
            <v-rating class="star-rating" value="3" size="20" hover color="warning" ></v-rating>
        </div>

    </div>
</template>

<script>
</script>

<style>
    .label {
        display: flex;
        flex-direction: row;
        height: 125px;
        margin:3px;
        padding:3px;
        background-color: lightgray;
        border-radius: 3px;
        border: 1px solid black;
    }

    .label > *{
        display: flex;
        flex-grow: 1;   /*Para que se extienda todo a lo ancho*/
    }

    .show-images {
        justify-content: center;
        align-items: center;
        width: 33%;
    }
    .show-images img{
        border-radius: 5px;
    }

    .show-info {
        flex-direction: column; /*para stackear los elementos*/
        width: 66%;
    }

    .show-info h2{
        font-size: 18px;
    }

    .center-img{
        width: 100%;
        height: 100%;
    }
    

</style>