<template>
  <div class="calendar">
    <transition-fade>
        <!-- тут идет смена видов: дни, месяцы и годы -->
        <component :is="currentView"
                   :views="views"
                   @view-changed="setCurrentView"/>
    </transition-fade>  
  </div>
</template>

<script>
import DaysView   from './days.vue'
import MonthsView from './months.vue'
import YearsView  from './years.vue'
import TransitionFade from '../../transitions/transition-fade.vue'

const views = {
  DaysView,
  MonthsView,
  YearsView
}

export default {
  components: {
    ...views,
    TransitionFade
  },

  data: () => ({
    currentView: Object.keys(views)[0],
    views: Object.keys(views)
  }),

  methods: {
    setCurrentView (view) {
      this.currentView = view
    }
  }
}
</script>

<style src="./styles.scss" lang="scss" scoped></style>
