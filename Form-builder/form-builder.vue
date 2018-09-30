<template>
<div>
  <!-- Dynamic Form Builder --> 
  <div v-for="(item, i) of fields" :key="i"  class="field">
    <label class="label">{{ item.label }}</label>
      <div class="control">

        <!-- Input - text, password -->
        <input v-if="isInput(item.type)"
               v-model="form[item.model]"
               :placeholder="item.placeholder"
               :type="item.type" class="input" />
        
        <!-- Select -->
        <div class="select" v-if="isSelect(item.type)">
            <select v-model.number="form[item.model]" class="select">
                <option v-for="(opt, i2) of item.options"
                        :key="i2"
                        :value="opt.value">
                          {{ opt.name }}  
                </option>
            </select>
        </div>

        <!-- Textarea -->
        <textarea v-if="isTextarea(item.type)" 
                  v-model="form[item.model]"
                  class="textarea">
        </textarea>

        <!-- Checkboxes --> 
        <template v-if="isCheckbox(item.type)">
          <div v-for="(opt, i3) of item.options" :key="i3">
            <label>
                <input v-model="form[item.model]" :value="opt.value" type="checkbox">
                {{ opt.name }} 
            </label>
          </div>
        </template>

        <!-- RadioButtons -->
        <template v-if="isRadio(item.type)">
          <div v-for="(opt, i4) of item.options" :key="i4">
            <label>
                <input v-model.number="form[item.model]" :value="opt.value" type="radio" > 
                {{ opt.name }}
            </label>
          </div>
        </template>
       
    </div>
  </div>
</div>
</template>

<script>
export default  {

  // PROPS
  props: {
    fields: {
      type: Array,
      default: () => ([])
    },

    resetFormTrigger: Boolean
  },

  // DATA
  data: () => ({
    form: {},
  }),

  // WATCH
  watch: {
    form: {
      deep: true,
      handler () {
        this.$emit('form-changed', this.form)
      }
    },

    fields: {
      immediate: true,
      handler () {
        if (this.fields.length > 0) {
          this.setFormValues()
        } 
      }
    },

    resetFormTrigger () {
      if (this.fields.length > 0) {
        this.setFormValues()
      }
    }
  },

  // METHODS
  methods: {
 
    /**
     * Create dynamic data in form variable
     */
    setFormValues () {
      this.form = {}
      this.fields.forEach(({type, model}) => {
        if (type !== 'checkbox') {
          this.$set(this.form, model, '')
          
        // checkbox can has multiple selected options  
        } else {
          this.$set(this.form, model, [])
        }
      })
    },

    /**
    * Check if control 'text' or 'password'
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isInput (fieldType) {
      return (fieldType === 'text' || fieldType === 'password') 
    },

    /**
    * Check if control 'select'
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isSelect (fieldType) {
      return fieldType === 'select'
    },

    /**
    * Сheck if control 'textarea'
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isTextarea (fieldType) {
      return fieldType === 'textarea'
    },

    /**
    * Сheck if control 'checkbox'
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isCheckbox (fieldType) {
      return fieldType === 'checkbox'
    },

    /**
    * Сheck if control 'radio'
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isRadio (fieldType) {
      return fieldType === 'radio'
    },
  },
}
</script>
