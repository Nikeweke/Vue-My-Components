<template>
<div>
  <br><br>
  
  <div class="columns is-mobile is-centered">
    <div class="column is-6">
      <div class="box">
        <h2 class="title is-2">Form builder</h2>
        <FormBuilder :fields="fields" />
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
    fields
  })
}
</script>


<style>
 @import url('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css');

</style>


