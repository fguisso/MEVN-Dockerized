<template>
  <div class="column is-8">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="control">
            <label class="checkbox">
              <input type="checkbox" name="checkbox">
              Selecionar todos
            </label>
          </p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary">Novo</button>
        </div>
      </div>
    </nav>
    <hr>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Usuário</th>
          <th>Nivel de acesso</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th><input type="checkbox"></th>
          <th>Fernando</th>
          <th>1337</th>
          <th>27/03/2017</th>
        </tr>
        <tr>
          <th><input type="checkbox"></th>
          <th>Gutem</th>
          <th>n00b</th>
          <th>27/03/2017</th>
        </tr>
        <tr>
          <th><input type="checkbox"></th>
          <th>Batata</th>
          <th>Admin</th>
          <th>27/03/2017</th>
        </tr>
      </tbody>
    </table>
    <nav class="level">
      <div class="level-left">
          <div class="level-item">
          </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button is-primary">Novo</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'users-view',
  };
</script>
