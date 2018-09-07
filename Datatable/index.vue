<template>
  <div class="dt-container">
    <h2 class="title is-2">Vue data table</h2>
    <DataTable v-bind="table" />
  </div>
</template>

<script>
import DataTable from './data-table.vue'

const columns = [
  { title: 'id',      type: 'string' },
  { title: 'name',    type: 'string' },
  { title: 'surname', type: 'string' },
  { title: 'age',     type: 'string' },
  { title: 'date',    type: 'date' },
]

const data = [
  {id: 1, name: 'Alex', surname: 'Gren', age: 20, date: '12-03-2018'},
  {id: 2, name: 'John', surname: 'Bah', age: 22, date: '12-04-2018'},
  {id: 3, name: 'Bred', surname: 'Gari', age: 24, date: '12-05-2018'},
  {id: 4, name: 'Johns', surname: 'Fronk', age: 21, date: '12-06-2018'},
  {id: 5, name: 'Oleg', surname: 'Bok', age: 23, date: '12-07-2018'},
  {id: 6, name: 'Vaise', surname: 'Gik', age: 25, date: '12-08-2018'},
  {id: 7, name: 'Breck', surname: 'Jerk', age: 32, date: '12-09-2018'},
  {id: 8, name: 'Frog', surname: 'Heller', age: 43, date: '12-10-2018'},
  {id: 9, name: 'Impala', surname: 'Brancher', age: 25, date: '12-11-2018'},
  {id: 10, name: 'Ford', surname: 'Bishop', age: 18, date: '12-12-2018'},
]

export default {
  components: {
    DataTable
  },

  data: () => ({
    table: {
      columns,
      data
    }
  })
}
</script>


<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css');

.dt-container {
  left:25%;
  position: absolute;
}
</style>
