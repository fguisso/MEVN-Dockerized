<template>
  <div class="column is-3">
    <aside class="menu">
      <ul class="menu-list">
        <li>
          <a @click="navigate('dashboard')" @keypress="navigate('dashboard')">
            <span class="icon"><i class="fa fa-home"></i></span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a @click="navigate('users.list')" @keypress="navigate('users.list')">
            <span class="icon"><i class="fa fa-user"></i></span>
            <span>Usuários</span>
          </a>
        </li>
        <li>
          <a @click="navigate('items.list')" @keypress="navigate('items.list')">
            <span class="icon"><i class="fa fa-list"></i></span>
            <span>Itens</span>
          </a>
        </li>
        <li>
          <a @click="logout" @keypress="logout">
            <span class="icon"><i class="fa fa-sign-out"></i></span>
            <span>Sair</span>
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'cc-menu',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'auth.signin' });
    },
    navigate(index) {
      this.$router.push({ name: index });
    },
  },
};
</script>
