<template>
  <div class='calendar'>
    <div class='header'>
      <a class='arrow' @click='movePreviousYear'>&laquo;</a>
      <a class='arrow' @click='movePreviousMonth'>&lsaquo;</a>
      <span class='title' @click='moveThisMonth'>
        {{ header.label }}
      </span>
      <a class='arrow' @click='moveNextMonth'>&rsaquo;</a>
      <a class='arrow' @click='moveNextYear'>&raquo;</a>
    </div>

  <table class="calendar__content" cellspacing="0" cellpadding="0">
    <thead>
        <tr>
          <th class="weekday" v-for='(weekday, i) in weekdays' :key="'wd-'+i">{{ weekday.label_3 }}</th>
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
</table>



  </div>
</template>

<script>
// Calendar data
const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// const _weekdayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const _weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const _today = new Date();
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate(),
};

export default {
  props: {
  	dayKey: { 
      type: String, 
      default: 'label' // hide days that not in month 
      // default: 'day' // show days that not in month 
    },
  },

  data: () => ({
    month: _todayComps.month,
    year: _todayComps.year,
  }),
 
  computed: {
    // Our component exposes month as 1-based, but sometimes we need 0-based
    monthIndex() {
      return this.month - 1;
    },

    isLeapYear() {
			return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
    },

    // Day/month/year components for previous month
    previousMonthComps() {
    	if (this.month === 1) return {
      	days: _daysInMonths[11],
      	month: 12,
        year: this.year - 1,
      }
      return {
      	days: (this.month === 3 && this.isLeapYear) ? 29 : _daysInMonths[this.month - 2],
      	month: this.month - 1,
        year: this.year,
      };
    },

    // Day/month/year components for next month
    nextMonthComps() {
    	if (this.month === 12) return {
      	days: _daysInMonths[0],
      	month: 1,
        year: this.year + 1,
      };
      return {
      	days: (this.month === 2 && this.isLeapYear) ? 29 : _daysInMonths[this.month],
      	month: this.month + 1,
        year: this.year,
      };
    },

    // State for calendar header (no dependencies yet...)
    months() {
      return _monthLabels.map((ml, i) => ({
        label: ml,
        label_1: ml.substring(0, 1),
        label_2: ml.substring(0, 2),
        label_3: ml.substring(0, 3),
        number: i + 1,
      }));
    },

    // State for weekday header (no dependencies yet...)
    weekdays() {
      return _weekdayLabels.map((wl, i) => ({
        label: wl,
        label_1: wl.substring(0, 1),
        label_2: wl.substring(0, 2),
        label_3: wl.substring(0, 3),
        number: i + 1,
      }));
    },

    // State for calendar header
    header() {
      const month = this.months[this.monthIndex];
      return {
        month: month,
        year: this.year.toString(),
        shortYear: this.year.toString().substring(2, 4),
        label: month.label + ' ' + this.year,
      };
    },

    // Returns number for first weekday (1-7), 
    // starting from Sunday - ... .getDay() + 1 
    firstWeekdayInMonth() {
      return new Date(this.year, this.monthIndex, 1).getDay()
    },

    // Returns number of days in the current month
    daysInMonth() {
      // Check for February in a leap year
      if (this.month === 2 && this.isLeapYear) return 29;
      // ...Just a normal month
      return _daysInMonths[this.monthIndex];
    },

    weeks() {
      const weeks = [];
      let previousMonth = true, thisMonth = false, nextMonth = false;
      let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 2;
      let month = this.previousMonthComps.month;
      let year = this.previousMonthComps.year;
      // Cycle through each week of the month, up to 6 total
      for (let w = 1; w <= 6 && !nextMonth; w++) {
        // Cycle through each weekday
        const week = [];
        for (let d = 1; d <= 7; d++) {
        	
          // We need to know when to start counting actual month days
          if (previousMonth && d >= this.firstWeekdayInMonth) {
            // Reset day/month/year counters
            day = 1;
            month = this.month;
            year = this.year;
            // ...and flag we're tracking actual month days
            previousMonth = false;
            thisMonth = true;
					}
          
          // Append day info for the current week
          // Note: this might or might not be an actual month day
          //  We don't know how the UI wants to display various days,
          //  so we'll supply all the data we can
          const dayInfo = {
            label: (day && thisMonth) ? day.toString() : '',
            day,
            weekday: d,
            week: w,
            month,
            year,
            date: new Date(year, month - 1, day),
            beforeMonth: previousMonth,
            afterMonth: nextMonth,
            inMonth: thisMonth,
            isToday: day === _todayComps.day && month === _todayComps.month && year === _todayComps.year,
            isFirstDay: thisMonth && day === 1,
            isLastDay: thisMonth && day === this.daysInMonth,
          };
          this.$emit('configureDay', dayInfo);
          week.push(dayInfo);
          
          // We've hit the last day of the month
          if (thisMonth && day >= this.daysInMonth) {
            thisMonth = false;
            nextMonth = true;
            day = 1;
            month = this.nextMonthComps.month;
            year = this.nextMonthComps.year;
          // Still in the middle of the month (hasn't ended yet)
          } else {
          	day++;
          }
        }
        // Append week info for the month
        weeks.push(week);
      }
      return weeks;
    },
  },

  methods: {
    moveThisMonth() {
      this.month = _todayComps.month;
      this.year = _todayComps.year;
    },
    
    moveNextMonth() {
      const { month, year } = this.nextMonthComps;
      this.month = month;
      this.year = year;
    },

    movePreviousMonth() {
      const { month, year } = this.previousMonthComps;
      this.month = month;
      this.year = year;
    },

    moveNextYear() {
      this.year++;
    },

    movePreviousYear() {
      this.year--;
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
$black_grey:#48505e;
$yellow: #ffc400;

$sidebar-bckg: $black_grey;
$sidebar-item-clr: rgba(252, 252, 249, 0.87);
$sidebar-item-clr-active: #fff;
$sidebar-yellow: rgba(242, 190, 25, 0.87);
$border-clr: #424242;
$sb-dp-white-clr: rgba(252, 252, 249, 0.87);
$sidebar-width: 300px;
$sidebar-collapsed-width: 70px;
$z-index: 100;

.calendar {
  font-family: 'Comfortaa', cursive;
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: $black_grey;

  .header {
    // width: 100%;
    display: flex;
    justify-content: stretch;
    align-items: center;
    color: rgba(252, 252, 249, 0.87);
    padding: 0.5rem 1rem;
    background-color: $sidebar-bckg;
  }
  .header .arrow {
    cursor: pointer;
    padding: 0 0.4em 0.2em 0.4em;
    font-size: 1.6rem;
    font-weight: 300;
    -webkit-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    flex-grow: 0;
  }
  .header .arrow:hover {
    color: #dcdcdc;
  }
  .header .title {
    font-weight: 600;
    cursor: pointer;
    flex-grow: 1;
    font-size: .9rem;
    text-align: center;
  }
  .header .title:hover {
    color: #dcdcdc;
  }

  .weekdays {
    display: flex;
  }

  .calendar__content {
    width: 100%;
    table-layout: fixed;
  }

  .weekday {
    color: $yellow;
    font-size:10px;
    // text-align: center;
    width: 24px;
    padding-left:10px;
  }

  .week {
    // display: flex;
  }


  .day {
     width: 32px;
     height: 30px;
    padding: 4px 0;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
    font-size:12px;
    color:#fff;

    .day__label-wrapper {
      height: 30px;
      width:100px;
      padding: 3px 0;
      box-sizing: border-box;

   
    }

    .day__label-wrapper__label {
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
      line-height: 24px;
      position: absolute;
      left: 55%;
      top:20%;
      transform: translateX(-50%);
      border-radius: 50%;
      text-align: center;
    }

    &.dragged {
      color: #fafafa;
    }
    &.dragged .day__label-wrapper {
      width: 100%;
      background-color: rgba(242, 190, 25, 0.78);
    }
    &.dragged.start-date .day__label-wrapper .day__label-wrapper__label, 
    &.dragged.end-date .day__label-wrapper .day__label-wrapper__label {
      background-color: $yellow;
      border-radius: 50%;
    }
    &.dragged.start-date .day__label-wrapper {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      width:80%;
      margin-left: 20%;
    }
    &.dragged.end-date .day__label-wrapper {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      width:85%;
    }
    
  }

  .today {
    font-weight: 700;
    color: $yellow;
  }

  .not-in-month {
    color: rgba(252, 252, 249, 0.54);
    // background-color: #fafafa;

  }

  .selected {
    color: #fafafa;
    background-color: #5e7fa0;
  }

  

  .sidebar {
    margin-left: 20px;
  }
  .sidebar h4 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .sidebar .option {
    margin-top: 5px;
  }
}

</style>
