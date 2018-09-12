import Calendar from './calendar/index.vue'

export default {
  name: 'calendar-multiple-dates',

  extends: Calendar,
 
  props: {
    value: { type: Array, default: () => ([])},
  },

  computed: {
  	hasValues() {
    	return Array.isArray(this.value) && this.value.length > 0;
    },
    valueTimes() {
    	if (!this.hasValues) return [];
      return this.value.map(v => v.getTime());
    },
  },

	methods: {
  	configureDay(day) {
    	day.isSelected = this.dayIsSelected(day);
    },
    
    dayIsSelected(day) {
    	if (!this.hasValues) return false;
      const t = day.date.getTime();
      return !!this.valueTimes.find(vt => vt === t);
    },

    selectDay(day) {
      if (!day.isSelected) {
        this.$emit('input', this.hasValues ? [...this.value, day.date] : [day.date]);
      } else {
        this.$emit('input', this.value.filter(v => v.getTime() !== day.date.getTime()));
      }
    },
  },

  created() {
  	this.$on('configureDay', this.configureDay);
    this.$on('selectDay', this.selectDay);
  },
}

