<template>
<div class="container">
    <h3>Just calendar (days not clickable)</h3>
    <Calendar />

    <br>

    <h3>Calendar with Range pick </h3>
    <CalendarRange @drag="setDate"/>
    <h5>Date range: {{ dates }}  </h5>

    <br> 

    <!-- <h3>Calendar with Multiple dates pick </h3>
    <CalendarMultiple v-model="dateSelection" />
    <h5>Date selection: {{ dateSelection }}</h5> -->

    <br>

    <!-- <h3>Calendar with Single date pick </h3>
    <CalendarSingle v-model="dateSelection2" />
    <h5>Date selection: {{ dateSelection2 }}</h5> -->

</div>
</template>

<script>
import Calendar         from './calendar/index.vue'       // календарь
import CalendarRange    from './calendar-range.js'  // выбор диапазона (функционал) 
import CalendarMultiple from './calendar-multiple-dates.js'  // выбор нескольких дат (функционал) 
import CalendarSingle   from './single.js'          // выбор одной даты  (функционал)

export default {
  components: {
    Calendar,
    CalendarRange,
    CalendarMultiple,
    CalendarSingle
  },

  data: () => ({
    dates: null,
    dateSelection: null,
    dateSelection2: null
  }),

  methods: {
    setDate (dates) {
      this.dates = dates
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
body {
  font-family:  'Comfortaa', cursive;
}
.container {
  width:800px;
  margin: 0 auto;
}
</style>


