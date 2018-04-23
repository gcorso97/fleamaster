<template>
  <div id="welcomePage" class="mainContainer faded">
    <router-link class="active topnav" to="/">
      <div>FleaMaster</div>
    </router-link>

    <img class="welcomeImage" alt="WelcomePic" src="../img/fleaMarket.jpg" id="headerPic"></img>

    <div class="mainBtns">
      <router-link to="/shop/buy" class="welcomeBtn buttonShadow" id="buyBtn">Einkaufen</router-link>
      <router-link to="#" class="welcomeBtn buttonShadow" id="sellBtn">Verkaufen</router-link>
    </div>
  </div>
</template>
<transition>
    <router-view></router-view>
</transition>
<script>
export default {
    data: function() {
        return {

        };
    },
    methods: {

    }
};
</script>
