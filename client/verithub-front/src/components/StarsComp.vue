<template>
  <div id = "stars">
    <div id = "text">
         <span class="font-weight-bold">
        {{ rating }}
        </span>
    </div>
    <v-rating
      v-model="rating"
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
export default {
  name: "StarComp",
  data: () => ({
    rating: 3,
  }),

  methods: {
    setRating(rating) {
      this.rating = rating;
    },
  },
};
</script>

<style lang="css" scoped>

#stars {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13%;
}	

#text {
  margin-right: 10px;
  margin-top: 1px;
}

</style>