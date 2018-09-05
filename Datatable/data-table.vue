<template>
<div class="container">

   <h2>Vue data table</h2>

    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <div @click="showMe()" class="input-group-text"><i class="fas fa-search"></i></div>
      </div>
      <input v-model="search" type="text" class="form-control" placeholder="Поиск...">
    </div>

    <code>{{ sort }}</code>

    <table class="table table-hover ar-table-tasks">
        <thead>
            <tr>
               <th v-for="(col, i) of columns" 
                   :key="i" 
                   @click="sortData(col)"
                   :title="col">
                   
                     {{ col }} 
                     
                     <i v-if="sort.orderIcons[col]" class="fas fa-angle-down"></i>
                     <i v-if="!sort.orderIcons[col]" class="fas fa-angle-up"></i>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) of filteredData" :key="i" @click="showTask(item.id)">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.surname }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.date }}</td>
            </tr>
        </tbody>
    </table>

    <EmptyPlaceholder v-if="!data.length" />

</div>
</template>


<script>
import moment from 'moment'
import EmptyPlaceholder from './empty-placeholder.vue'

const DATE_FORMAT = 'DD-MM-YYYY'

export default {
  // COMPONENTS
  components: {
    EmptyPlaceholder
  },
  
  // PROPS
  props: ['columns', 'data'],

  // DATA
  data: () => ({
    search: '',  
    DATE_FORMAT,
    sort: {
      key: '',
      order: 'desc',
      orderIcons: {}
    },
  }),

  // COMPUTED
  computed: {
    /**
    * Поиск по полям
    */
    filteredData () {
      return this.data.filter(item => {
        this.search = this.search.toLowerCase()
        return item.id === Number(this.search) ||
               item.name.toLowerCase().includes(this.search)
      })
    },
  },

  
  // METHODS
  methods: {

    /**
    * Сортировка данных
    * @param {String} key поле по которому сортировать данные
    */
    sortData (key) {
      let sortHandler
      let isDate = (key === 'created_at' || key === 'due_date')
      let isIcon = (key === 'status' || key === 'critical' || key === 'priority')

      // если сорт по полю с датой
      if (isDate) {
        sortHandler =  this.sortDate 

      // если сорт по полю с иконкой  
      } else if (isIcon) {
        sortHandler =  this.sortIcon 
       
      // если сорт по числовому или строчному полю  
      } else {
        sortHandler =  this.sortString
      }

      // здесь описан toggle для sort (change key and toggle 'asc' <-> 'desc')
      this.toggleSort(key)
      
      this.data.sort(sortHandler)
    },

    /**
    * Установка нового ключа для сортировки, и toggle 'asc' <-> 'desc'
    * @param {String} a первое значение
    * @param {String} b второе значение
    * @return {Number} ответ для сортировки
    */
    toggleSort (key) {
      // чтобы менялась стрелочка возле названия колонки, указ. на направление сортировки
      this.sort.orderIcons[key] = !this.sort.orderIcons[key]  

      if (key == this.sort.key) {
        this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort.key   = key
        this.sort.order = 'asc'
      }
    },

    /**
    * Сортировка строк
    * @param {String} a первое значение
    * @param {String} b второе значение
    * @return {Number} ответ для сортировки
    */
    sortString (a, b) {
      let key = this.sort.key
      let order = this.sort.order

      let res1 = order === 'asc' ? -1 : 1 
      let res2 = order === 'asc' ?  1 : -1

      if (a[key] < b[key]) {  return res1 }
      if (a[key] > b[key]) {  return res2 }
      return 0
    },
  

    /**
    * Сортировка даты
    * @param {String} a первое значение
    * @param {String} b второе значение
    * @return {Number} ответ для сортировки
    */
    sortDate (a, b) {
      let key = this.sort.key
      let order = this.sort.order

      let res1 = order === 'asc' ? 1 : -1 
      let res2 = order === 'asc' ? -1 : 1

      let date1 = moment(a[key], this.dateFormat)
      let date2 = moment(b[key], this.dateFormat) 

      if (date1 > date2) { return res1  }
      if (date1 < date2) { return res2  }
      return 0
    },
  }, 

  // LIFECYCLE HOOKS
  created () {
    this.sort.key = this.columns[0] 
  }
}

</script>


<style lang="scss">
.container {
  left:25%;
  position: absolute;
}
</style>
