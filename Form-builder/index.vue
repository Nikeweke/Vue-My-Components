<template>
<div>
  <br><br>
  <div class="columns is-mobile is-centered">
    <div class="column is-6">
      <div class="box">
        <h2 class="title is-2">Form builder</h2>

        <FormBuilder :fields="fields" 
                     :resetFormTrigger="resetTrigger"
                     @form-changed="setForm"/>

        <br />
        <button class="button is-light" @click="resetForm()">Reset form</button> 
        &nbsp;&nbsp;&nbsp;
        <button class="button is-light" @click="setFields()">Form 1</button>
        &nbsp;&nbsp;&nbsp;
        <button class="button is-light" @click="setFields2()">Form 2</button>

        <hr>
        <h4 class="title is-4" style="margin-top:20px;">Result: </h4> 
        <code>{{ form }}</code>
      
      </div> 
    </div>  
  </div> 
  
</div>
</template>

<script>
import FormBuilder from './form-builder.vue'
import fields from './fields.js'
import fields2 from './fields2.js'

export default {
  components: {
    FormBuilder
  },

  data: () => ({
    fields,
    form: {},
    resetTrigger: false
  }),

  methods: {
    /**
     * form-changed Handler
     */
    setForm (form) {
      this.form = form
    },

    /**
     * reset form
     */
    resetForm () {
      this.resetTrigger = !this.resetTrigger
    },

    /**
     * Make form 1
     */
    setFields () {
      this.fields = fields
    },

    /**
     * Make form 2
     */
    setFields2 () {
      this.fields = fields2
    }
  }
}
</script>


<style>
 @import url('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css');

 html {
   height: 100%;
   background-image: -webkit-linear-gradient(22deg, #F3BAE3, #9CBAED);
   background-image: linear-gradient(22deg, #F3BAE3, #9CBAED);
 }
</style>


