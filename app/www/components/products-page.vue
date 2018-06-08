<template>
    <div id="productsPage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Produkte</span>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content>
            <md-empty-state v-if="!isBuyer" md-icon="store" md-label="Noch nichts verkauft" md-description="Ein Produkt selbst anzubieten ist einfach. Probiere es doch mal direkt aus!"
                md-button @click="addItem" class="md-primary md-raised">Produkt anbieten
            </md-empty-state>
            <div v-if="isBuyer">
                <div v-if="hasItems">
                    <md-list class="md-double-line">
                        <md-list-item v-for="(item, index) in items" :key="index">
                            <div class="md-list-item-text">
                                <span>{{ item.header}}</span>
                                <span>{{ item.description}}</span>
                                <span>{{ item.price}} €</span>
                            </div>
                            <md-button>
                                <md-icon>shopping_cart</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-list>
                </div>
                <div v-if="!hasItems">
                    <p>Hier ist nichts :(</p>
                </div>
            </div>
            <md-speed-dial :class="topPosition" md-direction="bottom" class="md-bottom-right" v-if="!isBuyer">
                <md-speed-dial-target @click="addItem" class="md-accent">
                    <md-icon>add</md-icon>
                </md-speed-dial-target>
            </md-speed-dial>
            <div class="loading-overlay" v-if="loading">
                <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>
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
                loading: true,
                showSidebar: false,
                isBuyer: false,
                hasItems: false,
                items: []
            }
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {
            addItem: function () {
                this.$router.push('addItem');
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
            },
            //Function which gets mock data from a json file to test the view
            getItems: function () {
                var self = this;
                var itemRequest = new XMLHttpRequest();

                itemRequest.onreadystatechange = function () {
                    if (itemRequest.readyState === 4 && itemRequest.status === 200) {
                        var unParsed = itemRequest.responseText;
                        self.items = JSON.parse(unParsed);
                        self.hasItems = (self.items.length != 0) ? true : false;
                    }
                };
                itemRequest.open("GET", "js/items.json", true);
                itemRequest.send();
            }
        },
        mounted: function () {
            var self = this;
            self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true) ? true :
                false);
            self.getItems();
            setTimeout(function () {
                self.loading = false;
            }, 2000);
            console.log(self.isBuyer);
        }
    }
</script>