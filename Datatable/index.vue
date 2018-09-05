<template>
    <DataTable v-bind="table" />
</template>




<script>
import DataTable from './data-table.vue'

const columns = [
  'id', 'name', 'surname', 'age', 'date'
]

const data = [
  {id: 1, name: 'Alex', surname: 'Gren', age: 20, date: '12-02-2018'},
  {id: 2, name: 'John', surname: 'Bah', age: 22, date: '12-02-2018'},
  {id: 3, name: 'Bred', surname: 'Gari', age: 24, date: '12-02-2018'},
  {id: 4, name: 'Johns', surname: 'Fronk', age: 21, date: '12-02-2018'},
  {id: 5, name: 'Oleg', surname: 'Bok', age: 23, date: '12-02-2018'},
  {id: 6, name: 'Vaise', surname: 'Gik', age: 25, date: '12-02-2018'},
  {id: 7, name: 'Breck', surname: 'Jerk', age: 32, date: '12-02-2018'},
  {id: 8, name: 'Frog', surname: 'Heller', age: 43, date: '12-02-2018'},
  {id: 9, name: 'Impala', surname: 'Brancher', age: 25, date: '12-02-2018'},
  {id: 10, name: 'Ford', surname: 'Bishop', age: 18, date: '12-02-2018'},
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
