export default [
    {
      label: 'Номер',
      model: 'number',
      type: 'text',
      placeholder: ''
    },
  
    {
      label: 'Дата создания',
      model: 'created_at',
      type: 'datepicker',
      placeholder: ''
    },
  
    {
      label: 'Дата выполнения',
      model: 'due_date',
      type: 'datepicker',
      placeholder: ''
    },
  
    {
      label: 'Тип',
      model: 'type',
      type: 'select',
      placeholder: '',
      options: [
        {name: 'first', val: '1'},
        {name: 'second', val: '2'}
      ]
    },
  
    {
      label: 'Задача',
      model: 'title',
      type: 'text',
      placeholder: ''
    },
  
    {
      label: 'Описание',
      model: 'description',
      type: 'textarea',
      placeholder: ''
    },
  
    {
      label: 'Проект',
      model: 'project',
      type: 'select',
      placeholder: '',
      options: [
        {name: 'first', val: '1'},
        {name: 'second', val: '2'}
      ]
    },
  
    {
      label: 'Исполнитель',
      model: 'executor',
      type: 'select',
      placeholder: '',
      options: [
        {name: 'first', val: '1'},
        {name: 'second', val: '2'}
      ]
    },
  
    {
      label: 'Критическая',
      model: 'critical',
      type: 'select',
      placeholder: '',
      options: [
        {name: 'Да', val: '1'},
        {name: 'Нет', val: '2'}
      ]
    },
  
    {
      label: 'Статус',
      model: 'status',
      type: 'select',
      placeholder: '',
      options: [
        {name: 'first', val: '1'},
        {name: 'second', val: '2'}
      ]
    },
  
    // {
    //   label: 'Люди',
    //   model: 'persons',
    //   type: 'checkbox',
    //   placeholder: '',
    //   options: [
    //     {name: 'Andrey', val: '1'},
    //     {name: 'Alex',   val: '2'},
    //     {name: 'Urod',   val: '3'},
    //   ]
    // },
  
    // {
    //   label: 'Пол',
    //   model: 'gender',
    //   type: 'radio',
    //   placeholder: '',
    //   options: [
    //     {name: 'Male',   val: '1'},
    //     {name: 'Female', val: '2'},
    //   ]
    // }
  
  ]
  
