# FormBuilder Component
Строит форму на основе поданных полей.

### USAGE 
```html
<FormBuilder :fields="fields" 
             :resetFormTrigger="resetTrigger"
             @form-changed="setForm"/>
```

### PROPS

* fields `{Array}` - set of fields
* resetFormTrigger `{Boolean}` - just change it, and it will reset form, 

### EVENTS

* @form-changed `{Object}` - object of form