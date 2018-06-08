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
                    <md-field>
                        <label>Bezeichnung</label>
                        <md-input type="text" v-model="item.header" required/>
                    </md-field>
                    <!-- selector does not work -->
                    <!-- <md-select v-model="item.category" class="centered boxShadow"> -->

                    <md-field>
                        <label>Wähle eine Kategorie</label>
                        <md-select>
                            <md-option value="Bekleidung">Bekleidung</md-option>
                            <md-option value="Haushalt">Haushalt</md-option>
                            <md-option value="Kosmetik">Kosmetik</md-option>
                            <md-option value="Outdoor">Outdoor</md-option>
                            <md-option value="Technik">Technik</md-option>
                            <md-option value="Unterhaltung">Unterhaltung</md-option>
                        </md-select>
                    </md-field>


                    <!-- </md-select> -->
                    <!-- textarea does not work -->
                    <md-field>
                        <label>Beschreibung</label>
                        <md-textarea type="textarea" v-model="item.description"></md-textarea>
                    </md-field>

                    <md-field>
                        <md-input v-model="item.price" id="price" placeholder="Verkaufspreis" required/>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button class="actions md-raised md-primary">Hinzufügen</md-button>
                </md-card-actions>

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
                item: {
                    header: '',
                    category: '',
                    description: '',
                    price: ''
                },
                showSidebar: false
            };
        },
        components: {
            Sidebar: Sidebar
        },
        methods: {
            /**
             * Pass item object to server
             */
            addItem: function () {
                var self = this;
                console.log(self.item);
                self.$http.post(RESTURL + '/addItem', {
                    item: self.item
                }).then(function (response) {
                    console.log(response);
                }, function (response) {
                    console.error(response);
                });
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
    };
</script>