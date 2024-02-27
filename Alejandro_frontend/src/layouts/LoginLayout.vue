<template>
  <div class="login">
    <img
      class="jakinCode"
      src="src/assets/logo-jakin-code.97e3f1b4.png"
      alt="Login in the page"
    />
    <div class="party-form">
      <img
      class="party"
        src="src/assets/party.jpg"
        alt="People happy in a party"
      />
      <div>
        <form action class="form" @submit.prevent="login">
          <label class="form-label" for="#username">Username:</label>
          <input
            v-model="username"
            class="form-input"
            type="username"
            id="username"
            required
            placeholder="Username"
          />
          <label class="form-label" for="#password">Password:</label>
          <input
            v-model="password"
            class="form-input"
            type="password"
            id="password"
            placeholder="Password"
          />
          <p v-if="error" class="error">
            Has introducido mal el username o la contraseña.
          </p>
          <input class="form-submit" type="submit" value="Login" />
        </form>
        <p class="msg">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate</router-link>
        </p>
      </div>
      <img
      class="party"
        src="src/assets/party.jpg"
        alt="People happy in a party"
      />
    </div>
  </div>
  <popupComp :isOpen="isOpen" :message="message" @modal-close="closeModal" />
</template>

<script setup>
import auth from "src/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Popup constants and functions
import popupComp from "src/components/popupComp.vue";
const message = ref([]);
const isOpen = ref(false);
const addToMessage = (string) => {
  message.value.push(string);
};
const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};
// End Popup constants and functions

const router = useRouter();
const username = ref("");
const password = ref("");

const login = async () => {
  message.value =  []
  try {
    const data = await auth.login(username.value, password.value);
    auth.setAll(username.value, data.data.access, data.data.refresh)
    router.push("/main");
  } catch (error) {
    if (error.hasOwnProperty("response")) {
      console.log(error.response.data);
      addToMessage(error.response.data.detail);
      openModal();
    } 
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 2rem;
}
.jakinCode {
  display: block;
  width: 45%;
  margin: auto;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: $color-jakinCode;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background-image: none;
  border: 1px solid white;
  background: white;
  color: black;
  border-radius: 15px;
  &:focus {
    outline: 0;
    border-color: $color-jakinLight;
  }
}
.form-submit {
  background: white;
  border: none;
  color: $color-jakinCode;
  margin-top: 3rem;
  padding: 1rem 0;
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: $color-jakinLight;
    color: black;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}

.party-form {
  display: flex;
  margin-left: 5%;
  margin-right: 5%;
  justify-content: space-between;
}
.party{
  width:30%;
  height:auto;
}
.msg {
  margin-top: 3rem;
  text-align: center;
}

@media only screen and (max-width: 1080px) {
  .party{
    visibility: hidden;
  }
}
</style>
