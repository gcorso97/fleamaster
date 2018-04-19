<template>
    <div id="registration">
        <form @submit.prevent="register">
            <div id="logoImage" class="centered"></div>
            <div id="RegisterInput" class="centered">

              <div id="personalData">
              <select placeholder="Anrede" class="centered">
                <option disabled value="">Anrede</option>
                <option>Frau</option>
                <option>Herr</option>
                <option>single Pringle, ready to mingle</option>
              </select>
              <input class="centered" type="text" v-model="firstname" id="firstname" placeholder="Vorname"/>
              <input class="centered" type="text" v-model="lastname" id="lastname" placeholder="Nachname"/>
              <input class="centered" type="date" v-model="birthday" id="birthday" placeholder="Geburtstag"/>
            </div>

            <div id="adressData">
              <input class="centered" type="text" v-model="street" id="street" placeholder="Straße + Hausnummer"/>
              <input class="centered" type="text" v-model="zipcode" id="zipcode" placeholder="Postleitzahl"/>
              <input class="centered" type="text" v-model="city" id="city" placeholder="Ort"/>
            </div>

            <div id="credentials">
              <input class="centered" type="text" v-model="mail" id="mail" placeholder="E-Mail"/>
              <input class="centered" type="password" v-model="password" id="password" placeholder="Passwort"/>
            </div>

            </div>
            <button id="registerBtn" class="centered" disabled>Login</button>
        </form>
        <router-view></router-view>
    </div>
</template>
