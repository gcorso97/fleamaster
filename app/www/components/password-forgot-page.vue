<template>
    <md-content class="md-elevation-3">
        <!-- <sidebar name="sidebar"/> -->
            <form @submit.prevent="passwordForgot">
                <!-- <div id="logoImage" class="centered"></div> -->
                <div class="form">
                    <md-field>
                        <label>Passwort zurücksetzen</label>
                        <md-input v-model="mail" autofocus v-on:input="validateInput"/>
                    </md-field>
                    <md-button id="sendCodeBtn" class="centered buttonShadow buttonForm">code senden</md-button>
                </div>
                </form>
        </md-content>
        <transition name="fade">
            <router-view></router-view>
        </transition>
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
