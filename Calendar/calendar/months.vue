<template>
<div>
  <div class='header' >
    <a class='arrow' @click='movePreviousYear'>&lsaquo;</a>
    <span class='title' @click="$emit('view-changed', views[2])">
      {{ year }}
    </span>
    <a class='arrow' @click='moveNextYear'>&rsaquo;</a>
  </div>

  <table class="calendar__content" cellspacing="0" cellpadding="0">
    <tbody>
      <tr v-for="(month, i) of monthRows"
          :key="i"
          class="month-row" >
        <td v-for="(label, i) of month"
            :key="i" 
            class="month">
             {{ label }}
        </td>
      </tr>
    </tbody>
    
  </table>
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
// Calendar data
const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const _today = new Date();
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate(),
};

export default {
  props: {
    views: Array
  },

  data: () => ({
    month: _todayComps.month,
    year: _todayComps.year,
    monthLabels: _monthLabels
  }),

  computed: {
    monthRows () {
      let months = []
      for (let index in this.monthLabels/4) {
        months.push(
          ...this.monthLabels.slice((index*4), )
        )  
      }
      return months

      // 0 - 3
      // 4 - 8
      // 9 - 12

      // return [
      //   ...this.month
      // ]
    }
  },

  methods: {
    movePreviousYear () {
      this.year--
    },

    moveNextYear () {
      this.year++    
    },

    chunkArray () {
      let i,j,temparray,chunk = 4;
      for (i = 0, j = this.monthLabels.length; i < j; i += chunk) {
          temparray = this.monthLabels.slice(i,i+chunk);
          // do whatever
          console.log(temparray)
      }
    }
  },

  created () {
    this.chunkArray()  
  }

}
</script>

<style src="./styles.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
  .calendar__content {
    .month-row .month {
      width: 40px;
      height: 40px;   
      color: #fff;
    }
  }
</style> 
