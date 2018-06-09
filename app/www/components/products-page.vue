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
            <md-empty-state v-if="!isBuyer" md-icon="store" md-label="Noch nichts verkauft" md-description="Ein Produkt selbst anzubieten ist einfach. Probiere es doch mal direkt aus!">
                <md-button @click="addItem" class="md-primary md-raised">Produkt anbieten</md-button>
            </md-empty-state>
            <div v-if="isBuyer">
                <div v-if="items.length">
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
                <md-empty-state v-if="!items.length" md-icon="shopping_basket" md-label="Noch nichts los" md-description="Keine passenden Produkte gefunden. Probiere es doch später einmal erneut!">
                </md-empty-state>
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
            getItems: function () {
                var self = this;

                self.$http.get(RESTURL + ((self.isBuyer)? '/articles' : '/soldarticles'), {}).then(function(response) {
                    self.loading = false;
                    self.items = response.body.articles;
                }, function(error) {
                    console.error(error);
                    self.loading = false;
                });
            }
        },
        created: function () {
            var self = this;

            self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true) ? true :
                false);
            self.getItems();
        }
    }
</script>