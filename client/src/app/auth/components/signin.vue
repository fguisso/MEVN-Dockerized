<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Entrar</p>
      <router-link class="button is-info" :to="{ name: 'auth.signup' }">Registrar</router-link>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <h3>Email:</h3>
        <div class="field">
          <p class="control has-icon">
            <input class="input is-medium" type="email" placeholder="your@email.com" v-model="email">
            <span class="icon is-medium">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
        </div>
        <h3>Senha:</h3>
        <div class="field">
          <p class="control has-icon">
            <input class="input is-medium" type="password" placeholder="Password" v-model="password">
            <span class="icon is-medium">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="submit">Entrar</button>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
  import { mapActions } from 'vuex';
  import { setToken } from 'src/plugins/http';

  export default {
    name: 'Entrar',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['setUser']),
      submit() {
        const { email, password } = this;
        this.http.post('/users/auth', { email, password })
          .then((res) => {
            /* eslint-disable prefer-const */
            let user = {
              name: res.data.name,
              isAdmin: res.data.isAdmin,
              avatarUrl: res.data.avatarUrl
            };
            setToken(res.data.token);
            this.setUser(user)
              .then(() => {
                localStorage.setItem('id_token', res.data.token);
                this.$router.push({ name: 'dashboard' });
              })
              .catch(err => console.log(err));
          })
          .catch(() => {
            this.email = '';
            this.password = '';
            this.$router.push({ name: 'auth.signin' });
          });
      },
    },
  };
</script>
