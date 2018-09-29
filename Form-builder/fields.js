export default [
    {
      label: 'Название',
      model: 'title',
      type: 'text',
      placeholder: ''
    },

    {
      label: 'Описание',
      model: 'descr',
      type: 'textarea',
      placeholder: ''
    },
  
    {
      label: 'Категория',
      model: 'type',
      type: 'select',
      placeholder: '',
      options: [
        {name: 'first', value: '1'},
        {name: 'second', value: '2'}
      ]
    },
  
    {
      label: 'Категория',
      model: 'categories',
      type: 'checkbox',
      placeholder: '',
      options: [
        {name: 'Abstraction', value: '1'},
        {name: 'People',      value: '2'},
        {name: 'Writers',     value: '3'},
      ]
    },
  
    {
      label: 'Статус',
      model: 'status',
      type: 'radio',
      placeholder: '',
      options: [
        {name: 'Done',        value: '1'},
        {name: 'Undone',      value: '2'},
        {name: 'In progress', value: '3'},
        {name: 'Failed',      value: '4'},
      ]
    }
  
  ]
  
