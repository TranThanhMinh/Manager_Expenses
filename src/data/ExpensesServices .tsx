import realm from './realm'

export const getListExpenses = () => {
  const tasks = realm.objects('Expenses')
  return Promise.resolve(tasks)
}

export const existExpenses = (id) => {
  
 const sql = realm.objects('Expenses').filter(item => item.id == id)
 return Promise.resolve(sql)
}

export const getListExpensesDate = (created_date) => {
  const tasks = realm.objects('Expenses').filter(item => item.created_date == created_date)
  return Promise.resolve(tasks)
}

export const getListExpensesFromDateToDate = (from_date, to_date) => {
  const tasks = realm.objects('Expenses').filter(item => item.created_date >= from_date && item.created_date <= to_date)
  return Promise.resolve(tasks)
}


export const getListExpensesBorrow = (id) => {
  const tasks = realm.objects('Expenses').filter(item => item.type == id)
  return Promise.resolve(tasks)
}

export const getListExpensesBorrow2 = (id) => {
  const tasks = realm.objects('Expenses').filter(item => item.type == id && item.price_borrow > 0)
  return Promise.resolve(tasks)
}

export const addExpenses = (id, created_time, created_date, descripbe, price, price_borrow, type, type_borrow, id_borrow, id_wallet, in_out) => {
  if (!id) {
    return Promise.reject('Expenses name is empty')
  }

  const data = {
    id: id,
    descripbe: descripbe,
    created_time: created_time,
    created_date: created_date,
    price: price,
    price_borrow: price_borrow,
    type: type,
    type_borrow: type_borrow,
    id_borrow: id_borrow,
    id_wallet: id_wallet,
    in_out: in_out
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
  const puppies = realm.objects("Expenses").filtered('id = $0', id)
  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(puppies);
      const puppies2 = realm.objects("Expenses").filter(item => item.id_borrow == id)
      resolve(puppies2)
    })
  })
}

export const removeTask2 = (id) => {
  const puppies = realm.objects("Expenses").filtered('id = $0', id)
  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(puppies);
      const puppies2 = realm.objects("Expenses").filter(item => item.id_borrow == id)
      resolve(puppies2)
    })
  })
}

export const removeAll = () => {
  const data = realm.objects('Expenses')
  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(data)
      resolve(data)
    })
  })
}

export const updateTask = (id, descripbe, price, price_borrow, typeExpenses, created_date, inOut) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].descripbe = descripbe
      puppies[0].price = price
      puppies[0].price_borrow = price_borrow
      puppies[0].type = typeExpenses
      puppies[0].created_date = created_date
      puppies[0].in_out = inOut
      resolve(puppies)
    })
  })
}

export const updateBorrow = (id, price_borrow) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].price_borrow = puppies[0].price_borrow - price_borrow
      resolve(puppies)
    })
  })
}

export const updateBorrow2 = (id, price_borrow) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].price_borrow = puppies[0].price_borrow + price_borrow
      resolve(puppies)
    })
  })
}



export const deleteBorrow = (id) => {
  const puppies = realm.objects("Expenses").filter(item => item.id_borrow == id)
  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(puppies);
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