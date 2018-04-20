<template>
    <div id="addItem" class="faded mainContainer">
        <form @submit.prevent="addItem">
            <div id="logoImage" class="centered"></div>
            <div id="AddingInput" class="centered">
              <input class="centered" type="text" v-model="item.header" id="header" placeholder="Bezeichnung" required/>
              <select v-model="item.category" class="centered">
                <option disabled value="">Wähle eine Kategorie</option>
                <option>Bekleidung</option>
                <option>Haushalt</option>
                <option>Kosmetik</option>
                <option>Outdoor</option>
                <option>Technik</option>
                <option>Unterhaltung</option>
              </select>
              <textarea class="centered" type="textarea" v-model="item.description" id="description" placeholder="Beschreibung"></textarea>
              <input class="centered" v-model="item.price" id="price" placeholder="Verkaufspreis" required/>
            </div>
            <button id="addBtn" class="centered buttonShadow buttonForm">Hinzufügen</button>
        </form>
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
