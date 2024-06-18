<template>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-12 text-white p-3 text-center">
          <router-link to="/draw">Draw</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </nav>
</template>

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
