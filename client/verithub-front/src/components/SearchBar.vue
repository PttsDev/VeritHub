<template>
    <div>
        <h1>{{title}}</h1>
        <v-textarea
          name="searchUniversity"
          no-resize
          clearable
          clear-icon="mdi-close-circle"
        ></v-textarea>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data: () => ({
        title: 'VeritHub',
    }),
}

</script>

<style lang="css" scoped>
    h1{
        position: relative;
        text-align: center;
        top: 150px;
        font-size: 50px;
        font-weight: 100;
        color: gray;
    }  

    .v-textarea{
        position: relative;
        text-align: center;
        padding-left: 300px;
        top: 300px;
        font-size: 50px;
        width: 80%;
    }
</style>