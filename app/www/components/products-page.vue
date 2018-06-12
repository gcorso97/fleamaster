<template>
    <div id="productsPage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Produkte</span>
            <div class="md-toolbar-section-end">
                <md-button class="md-primary" v-if="!buyhistory && isBuyer" @click="buyhistory=true; getItems()">Zur Kaufhistorie</md-button>
                <md-button class="md-primary" v-if="buyhistory && isBuyer" @click="buyhistory=false; getItems()">Zur Artikelliste</md-button>
            </div>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content>
            <md-dialog-confirm :md-active.sync="confirmationDialog" md-title="Produkt kaufen?" md-content="Du bist gerade dabei, das Produkt zu kaufen. Bitte <b>bestätige</b> den Kauf kurz."
                md-confirm-text="Produkt kaufen" md-cancel-text="Abbrechen" @md-confirm="onConfirm" @md-cancel="onCancel" />
            <md-empty-state v-if="!isBuyer && !items.length" md-icon="store" md-label="Noch nichts verkauft" md-description="Ein Produkt selbst anzubieten ist einfach. Probiere es doch mal direkt aus!">
                <md-button @click="addItem" class="md-primary md-raised">Produkt anbieten</md-button>
            </md-empty-state>
            <div>
                <div v-if="items.length">
                    <md-list class="md-double-line">
                        <md-list-item v-for="(item, index) in items" :key="index" class="product-list">
                            <md-avatar>
                                <img src="https://placeimg.com/40/40/people/1" alt="People">
                            </md-avatar>
                            <div class="md-list-item-text">
                                <span>{{ item.title}}</span>
                                <span>{{ item.description}}</span>
                            </div>
                            <span>{{ item.price}} €</span>
                            <md-button class="md-icon-button md-list-action" v-if="isBuyer && !buyhistory" @click="confirmationDialog=true; selectedProduct=item.id">
                                <md-icon class="md-primary">shopping_cart</md-icon>
                            </md-button>
                        </md-list-item>
                        <md-list>
                </div>
                <md-empty-state v-if="isBuyer && !items.length" md-icon="shopping_basket" md-label="Noch nichts los" md-description="Keine passenden Produkte gefunden. Probiere es doch später einmal erneut!">
                </md-empty-state>
            </div>
            <md-speed-dial :class="topPosition" md-direction="bottom" class="md-bottom-right add-product-speed-dial-btn" v-if="!isBuyer">
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
                items: [],
                confirmationDialog: false,
                selectedProduct: false,
                buyhistory: false
            }
        },
        components: {
            Sidebar: Sidebar
        },
        watch: {
            '$route.query': 'getItems'
        },
        methods: {
            onCancel: function () {
                this.selectedProduct = false;
            },
            onConfirm: function () {
                var self = this;

                self.loading = true;
                self.$http.post(RESTURL + '/buy', {
                    id: self.selectedProduct
                }).then(function () {
                    self.loading = false;
                    self.getItems();
                }, function (error) {
                    console.log(error);
                    self.loading = false;
                });
            },
            addItem: function () {
                this.$router.push('addItem');
            },
            getItems: function () {
                var self = this;

                self.loading = true;
                self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true) ? true : false);

                self.$http.get(RESTURL + ((self.isBuyer) ? ((self.buyhistory)? '/boughtarticles' : '/articles') : '/soldarticles'), {}).then(function (response) {
                    self.loading = false;
                    self.items = response.body.articles;
                }, function (error) {
                    console.error(error);
                    self.loading = false;
                });
            }
        },
        created: function () {
            this.getItems();
        }
    }
</script>