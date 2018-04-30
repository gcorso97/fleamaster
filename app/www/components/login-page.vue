<template>
    <div id="login" class="faded mainContainer">
        <form @submit.prevent="login">
            <div id="logoImage" class="centered"></div>
            <div id="loginInput" class="centered">
                <input class="inputField boxShadow" type="text" v-model="mail" id="mail" v-on:input="validateInput" placeholder="Email"/>
                <input class="inputField boxShadow" type="password" v-model="password" id="password" v-on:input="validateInput" placeholder="Passwort"/>
            </div>
            <div id="loginLinks" class="centered">
                <router-link class="linkFormat" to="/passwordForgot">Passwort zurücksetzen</router-link>
                <router-link class="linkFormat" to="/register">Registrieren</router-link>
                <router-link class="linkFormat" to="/addItem">TestLink</router-link>
                <router-link class="linkFormat" to="/welcome">MainLink</router-link>
            </div>
            <button class="centered buttonForm buttonShadow" disabled id="loginBtn">Login</button>
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
            mail: '',
            password: '',
            regExpMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };
    },

    methods: {
      validateInput: function () {
        var self = this,
            mailOk = self.validEmail(self.mail),
            passwordOk = self.validPasswort(self.password);
        if (mailOk && passwordOk) {
            loginBtn.disabled = false;
        } else {
            loginBtn.disabled = true;
        }
      },

      validEmail:function(email) {
      var self = this;
      return self.regExpMail.test(email);
      },

    validPasswort:function(password) {
      var self = this,
          passwordLength = self.password.length;
        if (passwordLength >= 6) {
          return true;
        } else {
          return false;
      }
    },

        login: function() {
            var self = this;
            self.$http.post(RESTURL + '/login', {mail: self.mail, password: self.password}).then(function(response) {
                console.log(response);
            }, function(response) {
                console.error(response);
            });
        }
    }
};
</script>
