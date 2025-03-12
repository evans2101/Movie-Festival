<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <input v-model="username" placeholder="Username" class="input-field" />
    <input v-model="password" type="password" placeholder="Password" class="input-field" />
    <button @click="register" class="btn login-btn">Register</button>

    <p class="redirect-text">
      Sudah punya akun?
      <a href="#" @click.prevent="switchToLogin" class="link">Login</a>
    </p>
  </div>
</template>

<script>
import { registerUser } from "@/services/authService";

export default {
  name: "UserRegister",
  data() {
    return { username: "", password: "", errorMessage: "" };
  },
  methods: {
    async register() {
      try {
        await registerUser(this.username, this.password);
        this.$emit("close");
        alert("Registration successful! You can now log in.");
      } catch (error) {
        this.errorMessage = error.message || "Registration failed. Please try again!";
      }
    },
    switchToLogin() {
      this.$emit('switch', 'login');
    },
  },
};
</script>

<style scoped>
.redirect-text {
  margin-top: 10px;
  font-size: 14px;
}
.link {
  color: blue;
  text-decoration: none;
  font-weight: bold;
}
.link:hover {
  text-decoration: underline;
}
</style>
