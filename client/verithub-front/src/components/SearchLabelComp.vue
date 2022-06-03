<template>
    <div class="label">
        <div class="show-images">
            <img class="center-img" :src="this.photo" :alt="this.title">
        </div>
        <div class="show-info">
            <a class="titulo" :href="this.urlInstit"><span>{{this.title}}</span></a>
            <div class="location-status-rating">
                <span>{{this.provincia}}</span>
                <span v-if="this.isPublic">Pública</span>
                <span v-else>Privada</span>
                <StarsComp :stars="this.stars"/>
            </div>
        </div>

    </div>
</template>

<script>
    import StarsComp from '../components/StarsComp.vue';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'SearchLabelComp',
        components: {
            StarsComp,
        },
        props: {
            id:{
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true
            },
            isPublic:{
                type: Boolean,
                required: true
            }, 
            provincia:{
                type: String,
                required: true
            }, 
            photo:{
                type: String,
                required: true
            },
            stars: {
                type: Number,
                required: true
            },
        },
        data () {
            return {
                urlInstit: "/institution/"+this.id,
            }
        },
        methods: {
            
        }
    });

</script>

<style>
    .label {
        display: flex;
        flex-direction: row;
        height: 125px;
        margin:3px;
        padding:3px;
        background-color: white;
        box-shadow: 3px 3px 1px rgb(212, 212, 212);
        border-radius: 3px;
        border: 1px solid rgb(212, 212, 212);
        gap: 1.5rem;
        min-width: 600px;
    }

    .label > *{
        display: flex;
        flex-grow: 1;   /*Para que se extienda todo a lo ancho*/
    }

    .show-images {
        justify-content: right;
        align-items: right;
        width: auto;
    }
    .show-images img{
        height: 100%;
        border-radius: 5px;
    }

    .show-info {
        flex-direction: column; /*para stackear los elementos*/
        align-items: left;
        gap: 0.5rem;
        width: 66%;
    }

    .show-info h2{
        font-size: 18px;
    }

    .location-status-rating {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .titulo{
        font-size: 18px;
        font-weight: bold;

    }
    
    .titulo :hover{
        background-color: rgb(193, 193, 193);
        border-left: 10px solid rgb(193, 193, 193);
        border-right: 10px solid rgb(193, 193, 193);
        border-radius: 25px;
    }

</style>