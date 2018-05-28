<template>
    <div id="welcomePage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showNavigation=true"><md-icon>menu</md-icon></md-button>
            <span class="md-title">Dashboard</span>
        </md-toolbar>
        <!-- drawer TODO -->
        <!-- <Sidebar></Sidebar> -->
        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">FleaMaster</span>
                <button @click="showNavigation=false">Close</button>
            </md-toolbar>
            <md-list>
                <md-list-item>
                    <md-icon>dashboard</md-icon>
                    <span class="md-list-item-text">Dashboard</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>shopping_basket</md-icon>
                    <span class="md-list-item-text">Produkte kaufen</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>history</md-icon>
                    <span class="md-list-item-text">Meine Einkäufe</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>store</md-icon>
                    <span class="md-list-item-text">Produkte verkaufen</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>person</md-icon>
                    <span class="md-list-item-text">Profil</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>logout</md-icon>
                    <span class="md-list-item-text">Abmelden</span>
                </md-list-item>
            </md-list>
        </md-drawer>
        <md-content>
            <p class="md-display-1 welcome-title">Willkommen zurück!</p>
            <div class="half-cards">
                <md-card class="half-card left">
                    <md-card-header>
                        <div class="md-title">7</div>
                        <div class="md-subhead">Produkte gekauft</div>
                    </md-card-header>
                    <md-card-content>
                        Durchstöbere FleaMaster und kaufe Produkte, die Dir gefallen!
                    </md-card-content>
                    <md-card-actions>
                        <md-button @click="productsPage(true)">Produkte kaufen</md-button>
                    </md-card-actions>
                </md-card>
                <md-card class="half-card right">
                    <md-card-header>
                        <div class="md-title">4</div>
                        <div class="md-subhead">Produkte verkauft</div>
                    </md-card-header>
                    <md-card-content>
                        Verkaufe Sachen in FleaMaster, die Du nicht mehr benötigst!
                    </md-card-content>
                    <md-card-actions>
                        <md-button @click="productsPage(false)">Produkte verkaufen</md-button>
                    </md-card-actions>
                </md-card>
            </div>
            <p class="md-headline recommendation-title">Empfehlung des Tages</p>
            <md-card md-with-hover>
                <md-ripple>
                    <md-card-header>
                        <md-card-header-text>
                            <div class="md-title">FleaMaster Demo</div>
                            <div class="md-subhead">Ein cooles Produkt</div>
                        </md-card-header-text>
                        <md-card-media md-big>
                            <img src="./../img/logo.png" alt="Produkt">
                        </md-card-media>
                    </md-card-header>
                </md-ripple>
            </md-card>
        </md-content>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
// import Sidebar from './sidebar.vue'; TODO

export default {
    data: function () {
        return {
            showNavigation: false
        }
    },
    components: {
        // Sidebar: Sidebar TODO // we need to be able to change property showNavigation for other component
    },
    methods: {
        productsPage: function(isBuyer) {
            this.$router.push({path: 'products', query: {isBuyer: isBuyer}});
        }
    }
}
</script>
