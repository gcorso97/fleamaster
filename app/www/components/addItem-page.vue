<template>
<div id="addItem" class="page-container md-layout-column">
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
            <span class="md-list-item-text">Produkte verkaufen</span>
        </md-list-item>
          <md-list-item>
              <md-icon>person</md-icon>
              <span class="md-list-item-text">Profil</span>
          </md-list-item>
          <md-list-item>
              <md-icon>exit_to_app</md-icon>
              <span class="md-list-item-text">Abmelden</span>
          </md-list-item>
      </md-list>
  </md-drawer>
    <md-content class="md-elevation-3">

        <form @submit.prevent="addItem">
            <!-- <div id="logoImage" class="centered"></div> -->
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
                    <md-textarea type="textarea" v-model="item.description"></textarea>
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
export default {
    data: function() {
        return {
          item: {
            header: '',
            category: '',
            description: '',
            price: ''
          },
        };
    },

    methods: {
      /**
       * Pass item object to server
       */
        addItem: function() {
            var self = this;
            console.log(self.item);
            self.$http.post(RESTURL + '/addItem', {item: self.item}).then(function(response) {
                console.log(response);
            }, function(response) {
                console.error(response);
            });
        }
    }
};
</script>
