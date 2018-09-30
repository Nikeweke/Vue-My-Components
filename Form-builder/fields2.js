export default [
    {
      label: 'Имя',
      model: 'name',
      type: 'text',
      placeholder: ''
    },

    {
      label: 'Фамилия',
      model: 'surname',
      type: 'text',
      placeholder: ''
    },
  
    {
      label: 'Мутант ли',
      model: 'mutant',
      type: 'radio',
      placeholder: '',
      options: [
        {name: 'Yes', value: '1'},
        {name: 'No',  value: '2'},
      ]
    }
  
  ]
  
