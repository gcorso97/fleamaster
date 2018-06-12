<template>
    <div id="passwordForgot" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Passwort vergessen</span>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content class="md-elevation-3">
            <form @submit.prevent="passwordForgot">
                <div class="form">
                    <md-field>
                        <label>Passwort zurücksetzen</label>
                        <md-input v-model="mail" autofocus v-on:input="validateInput" />
                    </md-field>
                    <md-button id="sendCodeBtn" class="centered buttonShadow buttonForm">code senden</md-button>
                </div>
            </form>
        </md-content>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Sidebar from './sidebar.vue';

    export default {
        data: function () {
            return {
                showSidebar: false
            };
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {}
    };
</script>