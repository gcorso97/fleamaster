<template>
    <div id="registration" class="faded mainContainer">
        <form @submit.prevent="register">
            <div id="logoImage" class="centered"></div>
            <div id="RegisterInput" class="centered">

              <div id="personalData">
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
            </div>

            </div>
            <button id="registerBtn" class="centered buttonShadow buttonForm" disabled>Submit</button>
        </form>
    </div>
</template>
