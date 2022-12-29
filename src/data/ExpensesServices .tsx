import realm from './realm'

export const getListExpenses = () => {
  const tasks = realm.objects('Expenses')

  return Promise.resolve(tasks)
}

export const getListExpensesDate = (created_date) => {
  const tasks = realm.objects('Expenses').filter(item => item.created_date == created_date)

  return Promise.resolve(tasks)
}

export const getListExpensesFromDateToDate = (from_date, to_date) => {
  const tasks = realm.objects('Expenses').filter(item=>item.created_date >=from_date && item.created_date <=to_date)
  console.log('tasks', tasks)
  return Promise.resolve(tasks)
}



export const addExpenses = (id, title, created_time, created_date, descripbe, price, type) => {
  if (!id) {
    return Promise.reject('Expenses name is empty')
  }

  const data = {
    id: id,
    title: title,
    descripbe: descripbe,
    created_time: created_time,
    created_date: created_date,
    price: price,
    type: type,
  }

  const tasks = realm.objects('Expenses')

  return new Promise((resolve, reject) => {
    realm.write(() => {
      realm.create('Expenses', data)

      resolve(tasks)
    })
  })
}

export const removeTask = (id) => {

  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(puppies);

      resolve(puppies)
    })
  })
}

export const updateTask = (id, title, descripbe, price) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  console.log(id, title, descripbe, price)
  console.log(puppies)
  // console.log(puppies)
  return new Promise(resolve => {
    realm.write(() => {

      puppies[0].descripbe = descripbe
      puppies[0].title = title
      puppies[0].price = price

      resolve(puppies)
    })
  })
}

export const toggleTask = (task) => {
  const tasks = realm.objects('Task')

  return new Promise(resolve => {
    realm.write(() => {
      task.completed = !task.completed

      resolve(tasks)
    })
  })
}