<template>
    <div id="productsPage" class="page-container md-layout-column">
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

        <md-empty-state v-if="!isBuyer"
          md-icon="store"
          md-label="Noch nichts verkauft"
          md-description="Ein Produkt selbst anzubieten ist einfach. Probiere es doch mal direkt aus!"
          md-button @click="addItem" class="md-primary md-raised">Produkt anbieten
        </md-empty-state>

        <div v-if="isBuyer">
            <div v-if="hasItems">
              <md-list class="md-double-line">
                <md-list-item v-for="item in items">
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
                <md-speed-dial-target class="md-accent">
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
export default {
    data: function () {
        return {
            loading: true,
            showNavigation: false,
            isBuyer: false,
            hasItems: false,
            items: []
        }
    },
    methods: {
      addItem: function() {
        this.$router.push('addItem');
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
    mounted: function() {
        var self = this;
        self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true)? true : false);
        self.getItems();
        setTimeout(function() {
            self.loading = false;
        }, 2000);
        console.log(self.isBuyer);
    }
}
</script>
