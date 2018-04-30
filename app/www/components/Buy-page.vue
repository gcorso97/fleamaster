<template>
    <div id="buy" class="faded mainContainer">
        <form @submit.prevent="buy">
            <div class="titleBackgroundContainer">
                <div class="titleContainer faded">
                    <div id="logoImage" class="centered"></div>
                    <label class="centered titleLabel">Shop</label>
                </div>
            </div>

            <!-- test <div v-for="user in data">{{user.name}}</div> -->
            <div class="objectsContainer">
                <div class="objectContainer" v-for="photo in data">
                    <img class="objectImageThumbnail" :src="photo.thumbnailUrl" >
                    <div class="objectTitle">{{photo.title}}</div>
                    <button @click="testFunc" class="toBucketBtn">kaufen</button>
                </div>
            </div>

        </form>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  // props: {
  //   isBuyer: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
    data: function() {
        return {
            data:[],
          //  isBuyer: true//Placeholder, muss dynamisch aus Welcome-Page gefüllt werden
        }
    },
    beforeMount(){
      //IsBuyer = true -> Server liefert Daten für alle Artikel
      //IsBuyer = false -> Server liefert Artikel, deren Userid mit der des aktuellen matcht!
      var self = this;
        this.$http.get('/getArticles', {isBuyer: self.isBuyer}).then(function(response) {
            var helpVar = response.body.slice(0,5);
            this.data = helpVar;
        }, function(error){
            console.log(error.statusText);
        });
      }
    }
    methods: {
    }
</script>
