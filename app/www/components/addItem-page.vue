<template>
    <div id="addItem" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showSidebar=true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Produkt anbieten</span>
        </md-toolbar>
        <Sidebar v-bind:showSidebar="showSidebar" v-on:hide-sidebar="showSidebar=false"></Sidebar>
        <md-content class="md-elevation-3">
            <form @submit.prevent="addItem">
                <md-card-content>
                    <div class="md-body-1 error-message" v-if="articleError">Fehler beim Anbieten des Produktes</div>
                    <md-field>
                        <label>Bezeichnung</label>
                        <md-input autofocus type="text" v-model="item.title" required/>
                    </md-field>
                    <md-field>
                        <label>Wähle eine Kategorie</label>
                        <md-select required v-model="item.category">
                            <md-option v-for="(category, index) in categories" :key="index" :value="category.id">{{category.name}}</md-option>
                        </md-select>
                    </md-field>
                    <md-field>
                        <label>Beschreibung</label>
                        <md-textarea type="textarea" v-model="item.description"></md-textarea>
                    </md-field>
                    <md-field>
                        <md-input v-model="item.price" id="price" type="number" min=1 max=9999 placeholder="Verkaufspreis *" required/>
                    </md-field>
                    <md-field>
                        <label>Produktbild</label>
                        <md-file accept="image/*" @md-change="uploadFile($event)"/>
                    </md-field>
                </md-card-content>
                <md-card-actions>
                    <md-button class="actions md-raised md-primary" @click="addItem">Anbieten</md-button>
                </md-card-actions>
            </form>
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
                item: {
                    title: '',
                    category: '',
                    description: '',
                    price: '',
                    file: ''
                },
                loading: false,
                showSidebar: false,
                categories: [],
                articleError: false
            };
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {
            uploadFile: function(fileList) {
                var self = this;

                if(typeof window.FileReader !== 'undefined' && fileList && fileList[0]) {
                    var reader = new FileReader();

                    self.loading = true;

                    reader.onloadend = function() {
                        self.item.file = reader.result;
                        self.loading = false;
                    };

                    reader.onerror = function(e) {
                        self.loading = false;
                        console.error(e);
                    };

                    reader.readAsDataURL(fileList[0]);
                }
            },
            /**
             * Pass item object to server
             */
            addItem: function () {
                var self = this;

                self.loading = true;
                self.$http.post(RESTURL + '/article', {
                    article: self.item
                }).then(function (response) {
                    // go back to products sell page
                    self.loading = false;
                    self.$router.push({path: 'products', query: {isBuyer: false}});
                }, function (error) {
                    self.articleError = true;
                    self.loading = false;
                });
            }
        },
        created: function () {
            var self = this;

            self.$http.get(RESTURL + '/categories', {}).then(function (response) {
                self.categories = response.body.categories;
                console.log(self.categories);
            }, function (error) {
                console.error(error);
            });
        }
    };
</script>