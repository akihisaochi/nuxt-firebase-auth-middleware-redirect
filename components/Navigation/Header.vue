<template>
  <header class="header">
    <ul class="nav">
      <li>
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">
          About
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/admin">
          Admin
        </nuxt-link>
      </li>
    </ul>
  </header>
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
  }
}
</style>
