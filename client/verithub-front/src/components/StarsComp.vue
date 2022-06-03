<template>
  <div id = "stars">
    <div id = "text">
         <span class="font-weight-bold">
        {{ rating }}
        </span>
    </div>
    <v-rating
      v-model="this.rating"
      length="5"
      background-color="white"
      color="black"
      half-increments
      hover
      size="18"
    ></v-rating>
    
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "StarsComp",
  props: {
    stars: {
        type: Number,
        required: true
    }
  },
  data () {
    return{
      rating: this.stars,
    }
  },
});
</script>

<style lang="css" scoped>

#stars {
  display: flex;
  flex-direction: row;
  align-items: center;
}	

#text {
  margin-right: 10px;
  margin-top: 1px;
}

</style>