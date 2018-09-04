import Calendar from './calendar.vue'

export default {
  name: 'calendar-range',

  extends: Calendar,

  props: {
    value: { 
      type: Object,
      default: () => ({ 
         start: new Date(),
         end: new Date() 
      })
    },
  },

  data: () => ({
    // valueIsValid: false,
    dragRange: null,
    dragMode: false
  }),

  computed: {
    valueIsValid() {
      return this.value && this.value.start && this.value.end;
    },

    normalizedValue() {
      return this.normalizeRange(this.value);
    },

    normalizedDragRange() {
      return this.normalizeRange(this.dragRange);
    },
  },

  watch: {
    normalizedDragRange(val) {
      // Any time drag changes, normalize it and emit 'drag' event
      this.$emit('drag', val ? { start: val.start, end: val.end } : null);
    },
  },

  methods: {
  	configureDay(day) {
      const dateTime = day.date.getTime();
      const valueRange = this.normalizedValue;
      const dragRange = this.normalizedDragRange;
    	day.isSelected = valueRange && dateTime >= valueRange.startTime && dateTime <= valueRange.endTime;
      day.startsSelection = valueRange && dateTime === valueRange.startTime;
      day.endsSelection = valueRange && dateTime === valueRange.endTime;
      day.dragActive = dragRange; // Just to let day know drag is happening somewhere
      day.isDragged = dragRange && dateTime >= dragRange.startTime && dateTime <= dragRange.endTime;
      day.startsDrag = dragRange && dateTime === dragRange.startTime;
      day.endsDrag = dragRange && dateTime === dragRange.endTime;
    },

  	selectDay(day) {
      // Start new drag selection if not dragging
      if (!this.dragMode) {
        this.dragMode = true
        this.dragRange = {
          start: day.date,
          end: day.date,
        };
      // Complete drag selection
      } else {
        this.dragMode = false
        const { start, end } = this.normalizedDragRange;
        // Clear drag selection
        // this.dragRange = null;
        
        // Signal new value selected on drag complete
        this.$emit('input', { start, end })
      }
    },

    /**
     * On hove on day
     */ 
    enterDay(day) {
      if (!this.dragMode) return;
      // Update drag selection
      this.dragRange = {
        start: this.dragRange.start,
        end: day.date,
      }
    },

    // Ranges can privately have end date earlier than start date
    // This function will correct the order before exposing it to to other components
    normalizeRange(range) {
      if (!range) return null;
      const { start, end } = range;
      const startTime = start.getTime();
      const endTime = end.getTime();
      const isNormal = start < end;
      return {
        start: isNormal ? start : end,
        startTime : isNormal ? startTime : endTime,
        end: isNormal ? end : start,
        endTime: isNormal ? endTime : startTime,
      }
    }
  },

  created() {
  	this.$on('configureDay', this.configureDay);
    this.$on('selectDay', this.selectDay);
    this.$on('enterDay', this.enterDay);
  },
}