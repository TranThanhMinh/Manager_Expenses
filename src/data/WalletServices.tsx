import realm from './realm'

export const getListwallet = () => {
  const tasks = realm.objects('wallet')
  return Promise.resolve(tasks)
}




export const getListwalletDefault = (type) => {
  const tasks = realm.objects('wallet').filter(item=>item.default == type)
  return Promise.resolve(tasks)
}

export const addWallet = (id, name, money, created_date,type) => {
  if (!id) {
    return Promise.reject('Expenses name is empty')
  }

  const data = {
    id: id,
    name: name,
    money: money,
    created_date: created_date,
    default:type
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

export const updateWallet = (type,  money) => {
  const puppies = realm.objects("wallet").filter(item=>item.default == type)
  return new Promise(resolve => {
    realm.write(() => {
      puppies[0].money = money
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