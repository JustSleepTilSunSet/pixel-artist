<template>
  <nav>
    <!-- Modal -->
    <div class="modal fade" ref="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Logined</h5>
            <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Account:</label>
                <input type="text" class="form-control" id="recipient-name" v-model="account">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Password:</label>
                <input class="form-control" id="message-text" v-model="password"></input>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="loginByGuest">LoginByGuest</button>
            <button type="button" class="btn btn-primary" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 text-white p-3 d-flex justify-content-center align-items-center">
          <router-link to="/draw" class="px-2">Draw</router-link> |
          <router-link to="/warehouse" class="px-2">Warehouse</router-link> |
          <router-link to="/gallery" class="px-2">gallery</router-link> |
          <button type="button" class="btn btn-outline-primary mx-2" @click="showModal" data-bs-target="#exampleModal"
            data-bs-whatever="@fat">Login</button>
          <span class="mx-2 text-dark">{{ loginedUser }}</span> | 
          <router-link to="/about" class="px-2">About</router-link> |
        </div>
      </div>
    </div>
    <router-view />
  </nav>
</template>

<script lang="ts" setup>
import pixelServerCli from '@/services/pixelServerCli';
import { ref } from 'vue';
import { Modal } from 'bootstrap';
const account = ref("");
const password = ref("");
const loginedUser = ref("");
const exampleModal = ref<HTMLElement | null>();
let modalInstance: Modal | null = null;

const showModal = () => {
  if (exampleModal.value) {
    if (!modalInstance) {
      modalInstance = new Modal(exampleModal.value);
    }
    modalInstance.show();
  }
};

const hideModal = () => {
  if (modalInstance) {
    modalInstance.hide();
  }
};
async function login() {
  let response = await pixelServerCli.login(account.value, password.value);
  let isLoginSuccess = response.status >= 0;
  if (!isLoginSuccess) {
    alert("Login fail.");
    showModal();
  } else {
    hideModal();
  }
  sessionStorage.setItem("access_token", response.access_token);
  loginedUser.value = account.value;
}

async function loginByGuest() {
  let response = await pixelServerCli.loginByGuest();
  sessionStorage.setItem("access_token", response.message.access_token);
  loginedUser.value = "Guest";
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
