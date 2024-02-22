<template>
  <div class="register">
    <img class="jakinCode" src="src/assets/logo-jakin-code.97e3f1b4.png" alt="Sign Up">
    <h3 class="title">Sign Up</h3>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#username">Username:</label>
      <input
        v-model="email"
        class="form-input"
        type="text"
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
      <label class="form-label" for="#password-repeat"
        >Repite la contraeña:</label
      >
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        placeholder="Password"
      />
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
  </div>
  <popupComp :isOpen="isOpen" :message="message" @modal-close="closeModal" />
</template>

<script setup>
import auth from "src/auth";
import { ref } from "vue";
import { router } from "src/router";

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

const email = ref("");
const username = ref("");
const password = ref("");
const passwordRepeat = ref("");

const register = async () => {
  try {
    await auth.register(email.value, username.value, password.value, passwordRepeat.value);
    router.push("/");
  } catch (error) {
    if (error.response.data) {
      error.response.data.password.forEach((item) => {
        console.log("password: " + item);
        addToMessage("password: " + item);
      });
      error.response.data.username.forEach((item) => {
        console.log("username: " + item);
        addToMessage("username: " + item);
      });
      error.response.data.email.forEach((item) => {
        console.log("email: " + item);
        addToMessage("email: " + item);
      });
    } else {
      console.log("There are an undefined error in yuour query");
      addToMessage("error: There are an undefined error in yuour query");
    }
    openModal();
  }
};
</script>

<style lang="scss" scoped>
.register {
  padding: 2rem;
}
.title {
  text-align: center;
  color: $color-jakinCode;
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
    background:$color-jakinLight;
    color:black;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>
