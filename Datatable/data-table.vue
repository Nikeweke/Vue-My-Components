<template>
<div>
    <div v-if="data.length">
      <div>
        <input v-model="search" type="text" class="form-control" placeholder="Поиск...">
      </div>

      <br>

      <code>{{ sort }}</code>

      <br><br>

      <table class="table is-bordered is-stripped" style="width:100%;">
          <thead>
              <tr>
                <th v-for="(col, i) of columns" :key="i" @click="sortData(col)" style="cursor:pointer">
                    {{ col.title }} 
                    <i v-if="sort.orderIcons[col.title]">&#8595;</i>
                    <i v-if="!sort.orderIcons[col.title]">&#8593;</i>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item, i) of filteredData" :key="i" @click="showTask(item.id)">
                <td v-for="(col, i) of columns" :key="i">{{ item[col.title] }}</td>
              </tr>
          </tbody>
      </table>

      <Pagination :recordsLength="data.length" 
                  @range-changed="rangeChangedHandler" />
    </div>

    <EmptyPlaceholder v-if="!data.length" />
</div>
</template>


<script>
import moment from 'moment'
import EmptyPlaceholder from './empty-placeholder.vue'
import Pagination from './pagination.vue'

export default {
  components: {
    EmptyPlaceholder,
    Pagination
  },
  
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    dateFormat: {
      type: String,
      default: 'DD.MM.YYYY'
    }
  },

  data: () => ({
    filteredData: [],
    search: '',  
    range: {
      from:'',
      to: ''
    },
    sort: {
      key: '',
      order: 'desc',
      orderIcons: {}
    },
  }),

  watch: {
    search () {
      let {from, to} = this.range
      this.filteredData = this.data.filter(item => {
        let search = this.search.toLowerCase()
        for (let key of Object.keys(item)) {
          if (String(item[key]).toLowerCase().includes(search)) {
            return true
          }
        }
      }).splice(from, to)
    }
  },

  methods: {
    /**
    * Сортировка данных
    * @param {Object} col колонка {title, type}
    */
    sortData (col) {
      let sortHandler = ''

      // если сорт по полю с датой
      if (col.type === 'date') {
        sortHandler =  this.sortDate 

      // если сорт по числовому или строчному полю  
      } else {
        sortHandler =  this.sortString
      }

      // change desc/asc AND arrow up/down
      this.toggleSort(col.title)

      let data = Object.assign([], this.data)
      let {from, to} = this.range
      this.filteredData = data.sort(sortHandler).splice(from, to)
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

    /**
     * Поделить данные на куски для каждой страницы (pagination)
     * @param {Object} range {from, to}
     */
    rangeChangedHandler (range) {
      this.range     = range
      let {from, to} = range
      let data = Object.assign([], this.data)
      this.filteredData = data.splice(from, to)
    }
  }, 

  created () {
    this.sort.key = this.columns[0] 
    this.filteredData = this.data
  }
}

</script>


