<template>
    <md-drawer :md-active.sync="showSidebar" v-model="showNavigation">
          <md-toolbar class="md-transparent" md-elevation="0">
              <span class="md-title">FleaMaster</span>
              <button @click="showNavigation=false">Close</button>
          </md-toolbar>
          <md-list>
            <md-list-item href="#/welcome">
                <md-icon>dashboard</md-icon>
                <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
          </md-list-item>
          <md-list-item href="#/products?isBuyer=true">
              <md-icon>shopping_basket</md-icon>
              <span class="md-list-item-text">Produkte kaufen</span>
          </md-list-item>
          <md-list-item href="#/products?isBuyer=false">
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
// TODO THIS COMPONENT DOES NOT WORK CURRENTLY
export default {
    name: 'sidebar',
    // props: ['showSidebar'],
    data: function () {
        return {
            showNavigation: false
          }
        },

    methods: {
      logout: function() {
              var self = this;
              self.$http.post(RESTURL + '/logout').then(function(response) {
                  // success
                  self.loading = true;
                  console.log(response);
                  self.$router.push('/');
              }, function(response) {
                  // error
                  self.loading = false;
                  console.error(response);
              });
            }
        }
    }
</script>
