import Realm from 'realm'

const TaskSchema = {
    name: 'Task',
    properties: {
        name: 'string',
        created: 'date',
        completed: 'bool'
    }
}

const DailyExpenses = {
  name: 'Expenses',
  properties: {
      id:'string',
      title:'int',
      descripbe: 'string',
      created_time: 'string',
      created_date: 'double',
      price:'string',
      type:'int',
  }
}

export default new Realm({
    schema: [TaskSchema,DailyExpenses]
})