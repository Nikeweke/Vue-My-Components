<template>
<span>
    <!-- Dynamic Form Builder --> 
    <div v-for="(item, i) of fields" :key="i"  class="form-group has-label">
        <label>{{item.label}}</label> &nbsp;

        <!-- Input - text, password -->
        <input v-if="isInput(item.type)"
               v-model="form[item.model]"
               :placeholder="item.placeholder"
               :type="item.type" class="input" />
        

        <!-- Select -->
        <div class="select" v-if="isSelect(item.type)">
            <select v-model="form[item.model]"
                    class="select">
                <option v-for="(opt, i) of item.options"
                        :key="i"
                        :value="opt.val">

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
        <template v-if="isCheckbox(item.type, item.model)">
            <br /><br />
            <div class="form-check checkbox-inline" v-for="(opt, i) of item.options" :key="i">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" :value="opt.val" v-model="form[item.model]">
                <span class="form-check-sign"></span> {{ opt.name }}
            </label>
            </div>
        </template>

        <!-- RadioButtons -->
        <template v-if="isRadio(item.type)">
            <br /><br />
            <div v-for="(opt, i) of item.options" :key="i" class="form-check form-check-radio" >
            <label  class="form-check-label">
                <input class="form-check-input" :value="opt.val" type="radio" v-model="form[item.model]"> 
                <span class="form-check-sign"></span> {{ opt.name }}
            </label>
            </div>
        </template>

        <!-- Datepicker -->
        <datetime v-if="isDatepicker(item.type)" 
                  :auto="dpConfig.auto"
                  :class="dpConfig.theme"
                  :format="dpConfig.format"
                  :phrases="dpConfig.phrases"
                  :input-class="dpConfig.classInput"
                  v-model="form[item.model]" />

    </div>

    <code>{{ form }}</code>
</span>
</template>

<script>
/*
*  FormBuilder / backend.js
*
*  FormBuilder - служит для создания формы динамически на основе данных полей "fields",
*  если их изменяет родитель то и поля переписуються в FormBuilder.
*  Поля("fields") передаються сюда как 'prop'. 
*  Форма 'form' устанавливаеться в хранилище Vuex, за которой наблюдает watcher и на изменение
* 'Fields' тоже под наблюдением, когда передаються новые поля надо схватывать новое значение формы из хранилища
*/
  
export default  {

  // PROPS
  props: ['fields'],

  // DATA
  data: () => ({
    form: {},

    // datapicker 
    dpConfig: {
      phrases: {ok: 'Да', cancel: 'Отмена'},
      classInput: 'form-control',
      theme: 'theme-orange',
      auto: true, // close datepicker on select date        
      format: { 
        year: 'numeric',
        month: 'numeric',  // 'long'
        day: 'numeric', 
        // hour: 'numeric', 
        // minute: '2-digit',
        // timeZoneName: 'short'
      }
    }
  }),

  // WATCH
  watch: {
    form: function () {
      this.$store.commit('setForm', this.form)
    },

    fields: function () {
      // console.log(this.form)
      this.form = {}
    }
  },
  
  // METHODS
  methods: {

    /**
    * Check if string not equal to 'textarea' or 'select'
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
    * @param  {Object} field тип поля
    * @return {Boolean} ответ
    */
    isCheckbox (type, model = false) {
      if (type === 'checkbox') {
        model ? this.form[model] = [] : false // обозначаем массив, потому что могут выбрать несколько полей
        return true 
      } else {
        return false
      }
    },


    /**
    * Сheck if string equal to 'radio'
    *
    * @param  {Object} field тип поля
    * @return {Boolean} ответ
    */
    isRadio (fieldType) {
      return fieldType === 'radio'
    },

    /**
    * Сheck if string equal to 'datepicker'
    *
    * @param  {Object} field тип поля
    * @return {Boolean} ответ
    */
    isDatepicker (fieldType) {
      return fieldType === 'datepicker'
    }
  },
}
</script>
