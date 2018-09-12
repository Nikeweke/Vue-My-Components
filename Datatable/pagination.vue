<template>
  <nav>
    <ul class="pagination is-centered">
        <div class="select">
          <select v-model="currentSize">
            <option v-for="(size, i) of sizesPerPage" :key="i">{{ size }}</option>
          </select>
        </div>

        <a class="pagination-next">Next page </a>

        <ul class="pagination-list">
          <li v-for="(page, i) of pages" :key="i">
            <a class="pagination-link" @click="setRange(page)">{{ page }}</a>
          </li>
        </ul>

    </ul>
</nav>
</template>


<script>
export default {
  // PROPS
  props: {
    recordsLength: Number,
  },

  // DATA
  data: () => ({
    currentPage: 1,
    sizesPerPage: [5, 10, 25, 50, 100, 250],
    currentSize: 5,
    pages: [],
  }),

  watch: {
    currentSize: {
      handler: 'updatePages',
      immediate: true // запустить сразу после инициализации 
    }
  },

  // METHODS
  methods: {
    /**
     * Make pagination range
     *
     * @param {Number} c текущая страница
     * @param {Number} m кол-во данных
     */
    pagination(c, m) {
      let current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
          range.push(i);
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      return rangeWithDots;
    },

    /**
     * Рассчитать кол-во страниц для выбора
     * (делиться кол-во всех записей на кол-во записей на страницу)
     */
    updatePages () {
      let pagesAmount = this.recordsLength/this.currentSize
      this.pages = this.pagination(1, pagesAmount)
    },

    /**
    * Установить текущую страницу и обрезать записи или дополнить
    *
    * @param {Number} page номер страницы
    */
    setRange (page) {
      let sizePerPage = this.currentSize
      let from = ''
      let to   = ''

      if (page === 1) {
        from = 0
        to   = sizePerPage*page
      }
      else if (page === 2) {
        from = sizePerPage
        to   = sizePerPage*page
      }
      else{
        from = (sizePerPage*(page-1))
        to   = sizePerPage*page
      }
      
      this.$emit('range-changed', {to, from})
    },
  },

  // LIFECYCLE HOOKS
  created() {
   this.setRange(this.currentPage)
  }
};
</script>
