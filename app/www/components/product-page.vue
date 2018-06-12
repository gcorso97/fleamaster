<template>
    <div id="productPage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Produkt</span>
            <div class="md-toolbar-section-end" v-if="article">
                <md-button class="md-primary">Für {{article.price}}€ kaufen</md-button>
            </div>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content>
            <md-card class="md-card-example" v-if="article">
                <md-card-area md-inset>
                    <md-card-media md-ratio="16:9">
                        <img :src="imgURL + '/' + article.id + '.png'" alt="Produktbild" onerror="this.src='img/logo.png'">
                    </md-card-media>
                    <md-card-header>
                        <h2 class="md-title">{{article.title}}</h2>
                        <div class="md-subhead">
                            <md-icon>location_on</md-icon>
                            <span>0km</span>
                        </div>
                    </md-card-header>
                    <md-card-content>{{article.description}}</md-card-content>
                </md-card-area>
                <md-card-content>
                    <h3 class="md-subheading">Standort</h3>
                    <div id="map" ref="map"></div>
                </md-card-content>
            </md-card>
            <div class="loading-overlay" v-if="loading">
                <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
            </div>
        </md-content>
    </div>
</template>

<script>
    import Sidebar from './sidebar.vue';

    export default {
        data: function () {
            return {
                showSidebar: false,
                loading: false,
                article: false,
                imgURL: RESTURL
            }
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {

        },
        created: function () {
            var self = this;

            self.loading = true;
            setTimeout(function () {
                var demoLatLng = {
                    lat: -25.363,
                    lng: 131.044
                };
                var map = new google.maps.Map(self.$refs.map, {
                    zoom: 12,
                    center: demoLatLng
                });
                var marker = new google.maps.Marker({
                    position: demoLatLng,
                    map: map
                });
            }, 10);

            self.$http.get(RESTURL + '/article', {
                params: {
                    id: parseInt(self.$route.query.id)
                }
            }).then(function (response) {
                self.loading = false;
                self.article = response.body.article;
            }, function (error) {
                self.loading = false;
                console.error(error);
            });
        }
    }
</script>