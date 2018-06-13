## FormBuilder Component
Строит форму на основе поданных полей. **(Нужен Vuex)**

### Quick Start
1) Регистрируем глобально или локально
2) В родительском компоненте, пример "fields" в fields.js
```html
 <FormBuilder :fields="fields" />
```
3) Хранилище Vuex
```js
export default {
  // STATES  
  state: {
    form: {}, // состояние формы для  FormBuilder
  },

  // MUTATIONS
  mutations: {
    // установить значение формы FormBuilder
    setForm (state, newForm) {
      state.form = newForm
    },

    // очистить значение формы FormBuilder 
    clearForm (state) {
      state.form = {}
    },
  }
}
```

