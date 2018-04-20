<template>
    <div id="registration" class="fadedBorder centered">
        <form @submit.prevent="welcome">
            <div id="logoImage" class="centered"></div>
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

        };
    },
    methods: {

    }
};
</script>
