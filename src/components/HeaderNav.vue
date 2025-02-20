<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <router-link to="/doctors" class="navbar__link">Врачи</router-link>
      </li>
      <li class="navbar__item">
        <router-link to="/nurses" class="navbar__link">Медсестры</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: #007bff;
  padding: 10px;

  &__list {
    display: flex;
    list-style: none;
    gap: 15px;
    margin: 0;
    padding: 0;
  }

  &__item {
    margin: 0;
  }

  &__link {
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      text-decoration: underline;
    }

    &--active {
      color: #ffdd57;
    }
  }
}
</style>
