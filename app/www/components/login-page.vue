<template>
    <div id="login">
        <form @submit.prevent="login">
            <div id="logoImage" class="centered"></div>
            <div id="loginInput" class="centered">
                <input class="centered" type="text" v-model="mail" id="mail" v-on:input="validateInput"/>
                <input class="centered" type="password" v-model="password" id="password" v-on:input="validateInput"/>
            </div>
            <div id="loginLinks" class="centered">
                <a href="#">Passwort zurücksetzen</a>
            </div>
            <router-link to="/register">Registrieren</router-link>
            <button id="loginBtn" class="centered" disabled>Login</button>
        </form>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            mail: '',
            password: '',
            regExpMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
