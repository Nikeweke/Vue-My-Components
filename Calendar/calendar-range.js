import Calendar from './calendar/index.vue'

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
    /**
     * Дополняем дату дополнительной информацией, которая своественна функционалу "range"
     * @param {Object} date 
     */
  	configureDate(date) {
      const dateTime = date.date.getTime();
      const valueRange = this.normalizedValue;
      const dragRange = this.normalizedDragRange;
    	date.isSelected = valueRange && dateTime >= valueRange.startTime && dateTime <= valueRange.endTime;
      date.startsSelection = valueRange && dateTime === valueRange.startTime;
      date.endsSelection = valueRange && dateTime === valueRange.endTime;
      date.dragActive = dragRange; // Just to let date know drag is happening somewhere
      date.isDragged = dragRange && dateTime >= dragRange.startTime && dateTime <= dragRange.endTime;
      date.startsDrag = dragRange && dateTime === dragRange.startTime;
      date.endsDrag = dragRange && dateTime === dragRange.endTime;
    },

  	selectDate(date) {
      // Start new drag selection if not dragging
      if (!this.dragMode) {
        this.dragMode = true
        this.dragRange = {
          start: date.date,
          end: date.date,
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

    enterDate(date) {
      if (!this.dragMode) return;
      // Update drag selection
      this.dragRange = {
        start: this.dragRange.start,
        end: date.date,
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
    },
  },

  created() {
    let configureDate = 'configureDate'
    let selectDate    = 'selectDate'
    let enterDate     = 'enterDate'

  	this.$on(configureDate, this[configureDate]);
    this.$on(selectDate, this[selectDate]);
    this.$on(enterDate, this[enterDate]);
  },
}
