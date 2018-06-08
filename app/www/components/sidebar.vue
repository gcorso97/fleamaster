<template>
    <md-drawer v-bind:md-active.sync="showSidebar" v-on:md-closed="$emit('hide-sidebar')">
        <md-toolbar class="md-transparent" md-elevation="0">
            <span class="md-title">FleaMaster</span>
            <md-button class="md-icon-button md-raised close-navigation-button" @click="$emit('hide-sidebar')">
                <md-icon>chevron_left</md-icon>
            </md-button>
        </md-toolbar>
        <md-list>
            <md-list-item @click="welcomePage()">
                <md-icon>dashboard</md-icon>
                <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
            <md-list-item @click="productsPage(true)">
                <md-icon>shopping_basket</md-icon>
                <span class="md-list-item-text">Produkte kaufen</span>
            </md-list-item>
            <md-list-item @click="productsPage(false)">
                <md-icon>store</md-icon>
                <span class="md-list-item-text">Produkte verkaufen</span>
            </md-list-item>
            <md-list-item>
                <md-icon>person</md-icon>
                <span class="md-list-item-text">Profil</span>
            </md-list-item>
            <md-list-item @click="logout()">
                <md-icon>exit_to_app</md-icon>
                <span class="md-list-item-text">Abmelden</span>
            </md-list-item>
        </md-list>
    </md-drawer>
</template>

<script>
    export default {
        name: 'sidebar',
        props: {
            showSidebar: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {}
        },
        methods: {
            welcomePage: function() {
                this.$router.push('/welcome');
            },
            productsPage: function(isBuyer) {
                this.$router.push({path: 'products', query: {isBuyer: isBuyer}});
            },
            logout: function () {
                var self = this;
                self.$http.post(RESTURL + '/logout').then(function (response) {
                    // success
                    self.loading = true;
                    console.log(response);
                    self.$router.push('/');
                }, function (response) {
                    // error
                    self.loading = false;
                    console.error(response);
                });
            }
        }
    }
</script>