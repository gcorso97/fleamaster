<template>
    <md-drawer :md-active.sync="showSidebar" v-model="showNavigation">
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
    }
}
</script>
