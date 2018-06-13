<template>
<span>
    <!-- Dynamic Form Builder --> 
    <div v-for="(item, i) of fields" :key="i"  class="form-group has-label">
        <label>{{item.label}}</label>

        <!-- Input - text, password -->
        <input v-if="isInput(item.type)" v-model="form[item.model]" :placeholder="item.placeholder" :type="item.type" class="form-control" />
        
        <!-- Select -->
        <select v-if="isSelect(item.type)" v-model="form[item.model]" class="form-control">
            <option v-for="(opt, i) of item.options"
                    :key="i"
                    :value="opt.val">

                    {{ opt.name }}  
            </option>
        </select>

        <!-- Textarea -->
        <textarea v-if="isTextarea(item.type)" v-model="form[item.model]" class="form-control" style="height:100px"></textarea>

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
</span>
</template>

<script src="./backend.js"></script>
