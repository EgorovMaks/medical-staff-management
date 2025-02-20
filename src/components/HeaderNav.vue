<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/doctors">Врачи</router-link></li>
      <li><router-link to="/nurses">Медсестры</router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: $primary-color;
  padding: 10px;

  ul {
    display: flex;
    list-style: none;
    gap: 15px;

    li {
      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
