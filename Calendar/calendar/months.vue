<template>
<div>
  <div class='header' >
    <a class='arrow' @click='movePreviousYear'>&lsaquo;</a>
    <span class='title'>
      <span @click="$emit('view-changed', views[2])">
        {{ currentYear }}
      </span>
    </span>
    <a class='arrow' @click='moveNextYear'>&rsaquo;</a>
  </div>

  <table class="calendar__content" cellspacing="0" cellpadding="0">
    <tbody>
      <tr v-for="(row, i) of monthRows"
          :key="i"
          class="month-row" >
        <td v-for="(month, i2) of row"
            :key="i2" 
            :class="{'month': true, 
                     'current': currentMonth === month.index}"
            @click="$emit('selectMonth', month)"
            @mouseenter="$emit('enterMonth', month)"
            @mouseleave="$emit('leaveMonth', month)">

             <!-- 'start-date': true,
                     'end-date': true,
                     'selected': true,
                     'dragged': true  -->

             <span>{{ month.label }}</span>
        </td>
      </tr>
    </tbody>
    
  </table>

</div>
</template>

<script>
import {
  _daysInMonths,
  _monthLabelsShort,
  _today,
  _todayComps
} from './calendar-data.js'

export default {
  props: {
    views: Array
  },

  data: () => ({
    currentMonth: _todayComps.month,
    currentYear: _todayComps.year,
    monthLabels: _monthLabelsShort,
  }),

  computed: {
    monthRows () {
      let monthWithState = this.getMonthWithState()
      let monthRows      = this.chunkArray(monthWithState, 4)
      return monthRows
    },

    isLeapYear() {
			return (this.currentYear % 4 === 0 && this.currentYear % 100 !== 0) || this.currentYear % 400 === 0;
    },
  },

  methods: {
    movePreviousYear () {
      this.currentYear--
    },

    moveNextYear () {
      this.currentYear++    
    },

    /**
     * Returns number of days in the current month
     * @param {Number} monthIndex
     */
    daysInMonth(monthIndex) {
      // Check for February in a leap year
      if (monthIndex === 2 && this.isLeapYear) return 29;
      // ...Just a normal month
      return _daysInMonths[monthIndex];
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

    /**
     * Добавить к каждому месяцу доп. информацию
     */
    getMonthWithState () {
      let monthWithState = []

      this.monthLabels.forEach((label, monthIndex) => {
        monthWithState.push({
          label,
          index: monthIndex+1,
          daysInMonth: this.daysInMonth(monthIndex)
        })
      })

      return monthWithState
    }
  },

  // created () {
  //   this.getMonthWithState()
  // }
}
</script>

<style lang="scss" scoped>
  @import './styles';

  .calendar__content {
    
    &, & tr, & td {
      border: 1px solid #434b58;
    }

    .month {
      font-size:12px;
      width: 64px;
      height: 56px;   
      color: #fff;
      text-align: center;
      cursor: pointer;
    }

    .month:hover {
      background-color: #586172;
    }

    .month.current{
      span {
        border-bottom: 3px solid $yellow;
      }
    }
  }
</style> 
