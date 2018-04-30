<template>
  <div id="welcomePage" class="mainContainer faded">
    <router-link class="active topnav" to="/">
      <div>FleaMaster</div>
    </router-link>

    <img class="welcomeImage" alt="WelcomePic" src="../img/fleaMarket.jpg" id="headerPic"></img>

    <div class="mainBtns"> <!-- Redundanz!!! Es reicht ein Router -> Refactoring, Buttons wären hier schöner/ wrappen? -->
      <router-link v-on:click="userRoll(true)" to="/shop/buy" class="welcomeBtn buttonShadow" id="buyBtn">Einkaufen</router-link>
      <router-link v-on:click="userRoll(false)" to="/shop/buy" class="welcomeBtn buttonShadow" id="sellBtn">Verkaufen</router-link>
    <!--  <buy-page :isBuyer="isBuyer"></buy-page> //Value über props übergeben-->
    </div>
  </div>
</template>
<transition>
    <router-view></router-view>
</transition>
<script>
//isBuyer Value = Pressed Button
//isBuyer Value must be passed to the next Comp!!!
export default {
  data: function () {
  return {
    isBuyer: false
  }
},
    methods: {
      userRoll: function (userValue) {
        var self = this;
        if (userValue === true) {
          self.isBuyer = true;
        } else {
          self.isBuyer = false;
        }
      }
    }
};
</script>
