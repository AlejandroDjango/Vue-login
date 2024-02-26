<template>
  <div class="register">
    <img
      class="jakinCode"
      src="src/assets/logo-jakin-code.97e3f1b4.png"
      alt="Sign Up"
    />
    <h3 class="title">Sign Up</h3>
    <form action class="form" @submit.prevent="register">
      <div class="row50">
        <div class="lab-in">
          <label class="form-label" for="#email">Email:</label>
          <input
            v-model="email"
            class="form-input"
            type="email"
            id="email"
            required
            placeholder="Email"
          />
        </div>
        <div class="lab-in">
          <label class="form-label" for="#username">Username:</label>
          <input
            v-model="username"
            class="form-input"
            type="text"
            id="username"
            required
            placeholder="Username"
          />
        </div>
      </div>
      <div class="row50">
        <div class="lab-in">
          <label class="form-label" for="#password">Password:</label>
          <input
            v-model="password"
            class="form-input"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div class="lab-in">
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
        </div>
      </div>
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
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
const email = ref("");
const username = ref("");
const password = ref("");
const passwordRepeat = ref("");

const register = async () => {
  message.value =  []
  try {
    await auth.register(
      email.value,
      username.value,
      password.value,
      passwordRepeat.value
    );
    router.push("/");
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data) {
      if (error.response.data.password) {
        error.response.data.password.forEach((item) => {
          console.log("password: " + item);
          addToMessage("password: " + item);
        });
      }
      if (error.response.data.username) {
        error.response.data.username.forEach((item) => {
          console.log("username: " + item);
          addToMessage("username: " + item);
        });
      }
      if (error.response.data.email) {
        error.response.data.email.forEach((item) => {
          console.log("email: " + item);
          addToMessage("email: " + item);
        });
      }
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
  width: 40%;
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

.row50 {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.lab-in {
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-bottom: 5%;
}

@media only screen and (max-width: 1080px) {
  .row50 {
    flex-direction: column;
  }
  .lab-in {
    width: 100%;
  }
}

.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>
