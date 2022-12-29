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
      title:'string',
      descripbe: 'string',
   //   created_time: 'string',
      created_date: 'string',
      price:'string',
      type:'string',
  }
}

export default new Realm({
    schema: [TaskSchema,DailyExpenses]
})