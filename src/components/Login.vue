<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <input v-model="username" placeholder="Username" class="input-field" />
    <input v-model="password" type="password" placeholder="Password" class="input-field" />
    <button @click="login" class="btn login-btn">Login</button>

    <p class="redirect-text">
      Belum punya akun?
      <a href="#" @click.prevent="switchToRegister" class="link">Buat akun</a>
    </p>
  </div>
</template>

<script>
import { loginUser } from "@/services/authService";

export default {
  name: "UserLogin",
  data() {
    return { username: "", password: "", errorMessage: "" };
  },
  methods: {
    async login() {
      try {
        const user = await loginUser(this.username, this.password);
        localStorage.setItem("user", JSON.stringify(user));
        this.$emit("close");
        window.location.reload();
      } catch (error) {
        this.errorMessage = error.message || "Login failed. Please try again!";
      }
    },
    switchToRegister() {
      this.$emit('switch', 'register');
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
