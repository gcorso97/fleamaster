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
                    <button @click="" class="toBucketBtn">kaufen</button>
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
    data: function() {
        return {
            data:[]
        };
    },
    beforeMount(){
        //test this.$http.get('https://jsonplaceholder.typicode.com/users').then(response=>{
        this.$http.get('https://jsonplaceholder.typicode.com/photos').then(response=>{
            var helpVar = response.body.slice(0,5);
            this.data = helpVar;

            // warum war die schleife hier zu langsam??
            // for(var i = 0; i<10;i++){
            //     this.data[i] = response.body[i];
            // };


        }, function(error){
            console.log(error.statusText);
        })
    },
    methods: {

    }
};
</script>
