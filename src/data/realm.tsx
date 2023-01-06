import Realm from 'realm'

const TaskSchema = {
  name: 'Task',
  properties: {
    name: 'string',
    created: 'date',
    completed: 'bool'
  }
}

const Wallet = {
  name: 'wallet',
  properties: {
    id: 'string',
    name: 'string',
    money: 'float',
    created_date: 'string',
    default:'bool'
  }
}

const DailyExpenses = {
  name: 'Expenses',
  properties: {
    id: 'string',
    descripbe: 'string',
    created_time: 'string',
    created_date: 'double',
    price: 'string',
    price_borrow: 'float',
    type: 'int',
    type_borrow: 'int',
    id_borrow: 'string',
    id_wallet:'string',
    in_out:'int'
  }
}

export default new Realm({
  schema: [TaskSchema, DailyExpenses, Wallet]
})