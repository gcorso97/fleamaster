<template>
    <div id="productsPage" class="page-container md-layout-column">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showNavigation=true"><md-icon>menu</md-icon></md-button>
            <span class="md-title" v-if="isBuyer" v-model="isBuyer">Produkte kaufen</span>
            <span class="md-title" v-if="!isBuyer" v-model="isBuyer">Produkte verkaufen</span>
        </md-toolbar>
        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">FleaMaster</span>
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
            </md-list>
        </md-drawer>
        <md-content>
            <md-empty-state v-if="!isBuyer"
            md-icon="store"
            md-label="Noch nichts verkauft"
            md-description="Ein Produkt selbst anzubieten ist einfach. Probiere es doch mal direkt aus!">
            <md-button @click="addItem" class="md-primary md-raised">Produkt anbieten</md-button>
            </md-empty-state>
            <md-empty-state v-if="isBuyer"
            md-icon="remove_shopping_cart"
            md-label="Noch nichts los"
            md-description="Es gibt noch keine passenden Produkte. Schau später noch einmal vorbei!">
            </md-empty-state>
            <md-speed-dial :class="topPosition" md-direction="bottom" class="md-bottom-right">
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
            isBuyer: false
        }
    },
    methods: {
      addItem: function() {
        this.$router.push('addItem');
      }
    },
    mounted: function() {
        var self = this;
        self.isBuyer = ((self.$route.query.isBuyer === 'true' || self.$route.query.isBuyer === true)? true : false);
        setTimeout(function() {
            self.loading = false;
        }, 2000);
        console.log(self.isBuyer);
    }
}
</script>
