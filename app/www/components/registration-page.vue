<template>
    <div id="registration" class="faded mainContainer">
        <form @submit.prevent="register">
            <div id="logoImage" class="centered"></div>
            <div id="RegisterInput" class="centered">

              <div id="personalData">
<<<<<<< HEAD
              <select class="centered">
                <option disabled value="" selected>Anrede</option>
                <option>Frau</option>
                <option>Herr</option>
                <option>single Pringle, ready to mingle</option>
              </select>
              <input class="centered inputField" type="text" v-model="firstname" id="firstname" placeholder="Vorname"/>
              <input class="centered inputField" type="text" v-model="lastname" id="lastname" placeholder="Nachname"/>
              <input class="centered inputField" type="date" v-model="birthday" id="birthday" placeholder="Geburtstag"/>
            </div>

            <div id="adressData">
              <input class="centered inputField" type="text" v-model="street" id="street" placeholder="Straße + Hausnummer"/>
              <input class="centered inputField" type="text" v-model="zipcode" id="zipcode" placeholder="Postleitzahl"/>
              <input class="centered inputField" type="text" v-model="city" id="city" placeholder="Ort"/>
            </div>

            <div id="credentials">
              <input class="centered inputField" type="text" v-model="mail" id="mail" placeholder="E-Mail"/>
              <input class="centered inputField" type="password" v-model="password" id="password" placeholder="Passwort"/>
=======
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
>>>>>>> d3ce0b1575d7396fd5e95a529a7c758dcda9cea3
            </div>

            </div>
            <button id="registerBtn" class="centered buttonShadow buttonForm" disabled>Submit</button>
        </form>
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
