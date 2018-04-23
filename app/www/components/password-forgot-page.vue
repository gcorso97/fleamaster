<template>
    <div id="passwordForgot" class="faded mainContainer">
        <form @submit.prevent="passwordForgot">
            <div id="logoImage" class="centered"></div>
            <label class="centered titleLabel">Passwort zurücksetzen</label>
              <input class="centered boxShadow" id="passwordForgotEmail" placeholder="Email" required/>
            <button id="sendCodeBtn" class="centered buttonShadow buttonForm">code senden</button>
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
        };
    },

    methods: {
    }
};
</script>
