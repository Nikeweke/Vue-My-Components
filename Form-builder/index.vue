<template>
<div>
  <br><br>
  <div class="columns is-mobile is-centered">
    <div class="column is-6">
      <div class="box">
        <h2 class="title is-2">Form builder</h2>

        <FormBuilder :fields="fields" @form-changed="setForm"/>

        <br />
        <button class="button is-light" @click="resetForm()">Reset form</button> &nbsp;&nbsp;&nbsp;
        <button class="button is-light">Set new fields</button>


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

export default {
  components: {
    FormBuilder
  },

  data: () => ({
    fields,
    form: {}
  }),

  methods: {
    setForm (form) {
      this.form = form
    },

    resetForm () {
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


