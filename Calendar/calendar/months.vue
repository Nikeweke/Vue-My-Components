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
      <tr v-for="(month, i) of monthRows"
          :key="i"
          class="month-row" >
        <td v-for="(label, i2) of month"
            :key="i2" 
            :class="{'month': true, 
                     'current': currentMonthName === label,}"
            @click="$emit('selectMonth', day)"
            @mouseenter="$emit('enterMonth', day)"
            @mouseleave="$emit('leaveMonth', day)">

             <!-- 'start-date': true,
                     'end-date': true,
                     'selected': true,
                     'dragged': true  -->

             <span>{{ label }}</span>
        </td>
      </tr>
    </tbody>
    
  </table>

  <!-- {{currentMonthName}} -->
<!--
  <table class="calendar__content" cellspacing="0" cellpadding="0">
    <thead>
        <tr>
          <th class="weekday" v-for='(weekday, i) in weekdays' :key="'wd-'+i">{{ weekday.label_3 }} </th>
        </tr>
    </thead>

    <tbody>
        <tr class='week' v-for='(week, i) in weeks' :key="'wk'+i">
            <td v-for='(day, i) in week'
                class='day'
                :key="'wk-d'+i"
                :class="{ today: day.isToday, 
                        'not-in-month': !day.inMonth,
                        'start-date': day.startsDrag,
                        'end-date': day.endsDrag,
                        'selected': day.isSelected && !day.dragActive,
                        'dragged': day.isDragged }"
                @click='$emit("selectDay", day)'
                @mouseenter='$emit("enterDay", day)'
                @mouseleave='$emit("leaveDay", day)'>
                <div class="day__label-wrapper">
                  <span class="day__label-wrapper__label">{{ day[dayKey] }}</span>
                </div>
            </td>
        </tr>
    </tbody>
</table> -->

</div>
</template>

<script>
import {
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
    currentMonthName: _todayComps.monthName,
    monthLabels: _monthLabelsShort
  }),

  computed: {
    monthRows () {
      return this.chunkArray(this.monthLabels, 4)
    }
  },

  methods: {
    movePreviousYear () {
      this.currentYear--
    },

    moveNextYear () {
      this.currentYear++    
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
    }
  },
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
