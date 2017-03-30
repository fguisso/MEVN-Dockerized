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
          <th>Item</th>
          <th>Solicitante</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox"></td>
          <td>Bolacha</td>
          <td>Fernando</td>
          <td>Comida</td>
          <td>
            <a class="button is-link" href="">Editar</a>
            <a class="button is-link" href="">Apagar</a>
          </td>
        </tr>
        <tr>
          <td><input type="checkbox"></td>
          <td>Batata doce</td>
          <td>Gutem</td>
          <td>Saiu para entrega</td>
          <td>
            <a class="button is-link" href="">Editar</a>
            <a class="button is-link" href="">Apagar</a>
          </td>
        </tr>
        <tr>
          <td><input type="checkbox"></td>
          <td>Bitcoins</td>
          <td>Batata</td>
          <td>Recebido</td>
          <td>
            <a class="button is-link" href="">Editar</a>
            <a class="button is-link" href="">Apagar</a>
          </td>
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
    name: 'items-view',
  };
</script>
