import realm from './realm'

export const getListwallet = () => {
  const tasks = realm.objects('wallet')

  return Promise.resolve(tasks)
}




export const getListwalletId = (id) => {
  const tasks = realm.objects('wallet').filter(item=>item.type == id)
  return Promise.resolve(tasks)
}

export const addWallet = (id, name, money, created_date) => {
  if (!id) {
    return Promise.reject('Expenses name is empty')
  }

  const data = {
    id: id,
    name: name,
    money: money,
    created_date: created_date
  }

  const tasks = realm.objects('wallet')

  return new Promise((resolve, reject) => {
    realm.write(() => {
      realm.create('wallet', data)
      resolve(tasks)
    })
  })
}

export const removeTask = (id) => {
  const puppies = realm.objects("Expenses").filtered('id = $0', id)
  return new Promise(resolve => {
    realm.write(() => {
      realm.delete(puppies);
      resolve(puppies)
    })
  })
}

export const updateTask = (id, descripbe, price,price_borrow,typeExpenses) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  console.log(id, descripbe, price)
  console.log(puppies)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].descripbe = descripbe
      puppies[0].price = price
      puppies[0].price_borrow = price_borrow
      puppies[0].type = typeExpenses
      resolve(puppies)
    })
  })
}

export const updateBorrow = (id,price_borrow) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  console.log(puppies)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].price_borrow = puppies[0].price_borrow - price_borrow 
      resolve(puppies)
    })
  })
}



export const deleteBorrow = (id,price_borrow) => {
  const puppies = realm.objects("Expenses").filter(item => item.id == id)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].price_borrow = puppies[0].price_borrow + price_borrow 
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