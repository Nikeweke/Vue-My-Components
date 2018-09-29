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
        <template v-if="isCheckbox(item)">
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

    {{ form }} 
</div>
</template>

<script>
export default  {

  // PROPS
  props: {
    fields: {
      type: Array,
      default: () => ([])
    }
  },

  // DATA
  data: () => ({
    form: {},
  }),

  // WATCH
  watch: {
    fields (value) {
      this.form = value   
    },

    form: {
      deep: true,
      handler () {
        this.$emit('form-changed', this.form)
      }
    }
  },

  // METHODS
  methods: {

    /**
    * Check if control 'text' or 'password'
    *
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isInput (fieldType) {
      return (fieldType === 'text' || fieldType === 'password') 
    },


    /**
    * Check if string equal to 'select'
    *
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isSelect (fieldType) {
      return fieldType === 'select'
    },


    /**
    * Сheck if string equal to 'textarea'
    *
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isTextarea (fieldType) {
      return fieldType === 'textarea'
    },


    /**
    * Сheck if string equal to 'checkbox'
    *
    * @param  {Object} item поле
    * @return {Boolean} ответ
    */
    isCheckbox ({type, model}) {
      if (type === 'checkbox') {
        this.form['categories'] = []
        return true 
      } else {
        return false
      }
    },


    /**
    * Сheck if string equal to 'radio'
    *
    * @param  {String} fieldType тип поля
    * @return {Boolean} ответ
    */
    isRadio (fieldType) {
      return fieldType === 'radio'
    },
  },

}
</script>
