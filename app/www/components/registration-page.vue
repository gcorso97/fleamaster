<template>
    <div id="registration" class="faded mainContainer">
        <form @submit.prevent="register">
            <div id="logoImage" class="centered"></div>
            <div id="RegisterInput" class="centered">

              <div id="personalData">
              <input class="centered" type="text" v-model="user.firstname" id="firstname" placeholder="Vorname" required/>
              <input class="centered" type="text" v-model="user.lastname" id="lastname" placeholder="Nachname" required/>
            </div>

            <div id="adressData">
              <input class="centered" type="text" v-model="user.street" id="street" placeholder="Straße + Hausnummer" required/>
              <input class="centered" type="text" v-model="user.zipcode" id="zipcode" placeholder="Postleitzahl" required/>
              <input class="centered" type="text" v-model="user.city" id="city" placeholder="Ort" required/>
            </div>

            <div id="credentials">
              <input class="centered" type="text" v-model="user.mail" id="mail" placeholder="E-Mail" required v-on:input="validateRegistration"/>
              <input class="centered" type="password" v-model="user.password" id="password" placeholder="Passwort" required v-on:input="validateRegistration"/>
            </div>

            </div>
            <button id="registerBtn" class="centered buttonShadow buttonForm" disabled>Submit</button>
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
          user: {
            firstname: '',
            lastname: '',
            street: '',
            zipcode: '',
            city: '',
            mail: '',
            password: ''
          },
            regExpMail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };
    },

    methods: {
      validateRegistration: function () {
        var self = this,
            mailOk = self.validEmail(self.user.mail),
            passwordOk = self.validPasswort(self.user.password);
        if (mailOk && passwordOk) {
            registerBtn.disabled = false;
        } else {
            registerBtn.disabled = true;
        }
      },

      validEmail:function(email) {
      var self = this;
      return self.regExpMail.test(email);
      },

    validPasswort:function(password) {
      var self = this,
          passwordLength = password.length;
        if (passwordLength >= 6) {
          return true;
        } else {
          return false;
      }
    },

        register: function() {
            var self = this;
            console.log(self.user);
            self.$http.post(RESTURL + '/register', {user: self.user}).then(function(response) {
                console.log(response);
            }, function(response) {
                console.error(response);
            });
        }
    }
};
</script>
