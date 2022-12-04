<template>
  <div id="app">
    <div class="bg-[#16ABF8] flex justify-center mx-auto">
        <div id="nav" class="w-[1000px] flex items-center">
          <router-link to="/" >
            <span class="text-white text-2xl">To Do List App</span>
          </router-link>
        </div>
     </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 105px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
