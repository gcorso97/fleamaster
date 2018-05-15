<template>
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
