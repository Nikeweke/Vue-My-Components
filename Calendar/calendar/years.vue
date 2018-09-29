<template>
<div>
  <div class='header' >
    <a class='arrow' @click='movePreviousYear'>&lsaquo;</a>
    <span class='title'>
      <span @click="$emit('view-changed', views[0])">
        {{ yearRange[0] }} - {{ yearRange[1] }} 
      </span>
    </span>
    <a class='arrow' @click='moveNextYear'>&rsaquo;</a>
  </div>

  <table class="calendar__content" cellspacing="0" cellpadding="0">
    <tbody>
      <tr v-for="(row, i) of yearRows"
          :key="i"
          class="year-row" >
        <td v-for="(year, i2) of row"
            :key="i2" 
            :class="{'year': true, 
                     'dragged': year.isDragged,
                     'current': currentYearStatic === year.label,
                     'start-date': year.startsDrag,
                     'end-date': year.endsDrag }"
            @click="$emit('selectDate', year)"
            @mouseenter="$emit('enterDate', year)"
            @mouseleave="$emit('leaveYear', year)">

            <span>{{ year.label }}</span>
        </td>
      </tr>
    </tbody>
    
  </table>

</div>
</template>

<script>
import { _todayComps } from './calendar-data.js'

export default {
  props: {
    views: Array
  },

  data: () => ({
    currentYearStatic: _todayComps.year,
    currentYear: _todayComps.year,
    yearGap: 11
  }),

  computed: {
    yearRows () {
      let yearWithState = this.getYearWithState
      let yearRows      = this.chunkArray(yearWithState, 4)
      return yearRows
    },

    /**
     * Добавить к каждому году доп. информацию
     */
    getYearWithState () {
      return Array.from(
        Array(this.yearGap+1).keys(), (n) => {
         
          let yearInfo = {
            label: n + this.currentYear,
            date: new Date(Date.UTC(n + this.currentYear, 0, 1)),
            index: n,
          }
          this.$emit('configureDate', yearInfo)

          return yearInfo
        }
      )
    },

    yearRange () {
      return [this.currentYear, this.currentYear + this.yearGap] 
    }
  },


  methods: {
    movePreviousYear () {
      this.currentYear -= this.yearGap+1
    },

    moveNextYear () {
      this.currentYear += this.yearGap+1
    },

    /**
     * Поделить массив на подмассивы по chunkSize
     * @param {Array} arr
     * @param {Number} chunkSize
     * @return {Array <Array>} масив а внутри еще массивы, как матрёшка 
     */
    chunkArray (arr, chunkSize) {
      let j         = arr.length
      let chunk     = chunkSize
      let temparray = []
      let result    = []
      for (let i = 0; i < j; i += chunk) {
        temparray = arr.slice(i,i+chunk)
        result.push(temparray)
      }
      return result
    },
  },
}
</script>

<style lang="scss" scoped>
  @import './styles';

  .calendar__content {
    
    &, & tr, & td {
      border: 1px solid #434b58;
    }

    .year {
      font-size:12px;
      width: 64px;
      height: 56px;   
      color: #fff;
      text-align: center;
      cursor: pointer;
    }

    .year:hover {
      background-color: #586172;
    }

    .year.current{
      span {
        border-bottom: 3px solid $yellow;
      }
    }

    .year.dragged {
      $light-yellow: rgba(242, 190, 25, 0.78);
      background-color: $light-yellow;
      border-color: $light-yellow;
    }

    .year.dragged.start-date,
    .year.dragged.end-date  {
      background-color: $yellow;
      border-color: $yellow;
    }
  }
</style> 
