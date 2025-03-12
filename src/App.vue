<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link v-if="isAdmin" to="/admin">Dashboard Admin Panel</router-link>       
      </div>
      <div class="button-login-register">
          <a v-if="!user" href="#" @click.prevent="openModal('login')">Login</a>
          <a v-if="!user" href="#" @click.prevent="openModal('register')">Register</a>
        </div>
      <div v-if="user" class="user-info">
        <span>Welcome, {{ user.username }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </nav>

    <router-view />

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">✖</button>
        <UserLogin v-if="modalType === 'login'" @close="closeModal" @switch="openModal" />
        <UserRegister v-if="modalType === 'register'" @close="closeModal" @switch="openModal" />
      </div>
    </div>

  </div>
</template>


<script>
import UserLogin from "@/components/Login.vue";
import UserRegister from "@/components/Register.vue";

export default {
  components: { UserLogin, UserRegister },
  data() {
    return {
      user: null,
      showModal: false,
      modalType: "",
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.role === "admin";
    },
  },
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/");
    },
    openModal(type) {
      this.modalType = type;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
<style scoped>
.navbar{
  padding: 20px 255px;
}
.nav-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: white;
  margin: 0 ;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
}

.nav-links a:hover {
  text-decoration: underline;
}
.button-login-register {
  display: flex;
  gap: 20px;
}
.button-login-register a {
  background-color: white;
  text-decoration: none;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
}
</style>