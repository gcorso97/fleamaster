<template>
  <div id="welcomePage" class="mainContainer faded">
    <router-link class="active topnav" to="/">
      <div>FleaMaster</div>
    </router-link>

    <img class="welcomeImage" alt="WelcomePic" src="../img/fleaMarket.jpg" id="headerPic"></img>

    <div class="fadedBorder centered mainBtns">
      <button class="welcomeBtn buttonShadow" id="buyBtn">Einkaufen</button>
      <button class="welcomeBtn buttonShadow" id="sellBtn">Verkaufen</button>
    </div>
  </div>
</template>
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
