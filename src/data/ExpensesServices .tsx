import realm from './realm'

export const getListExpenses = () => {
    const tasks = realm.objects('Expenses')

    return Promise.resolve(tasks)
}

export const addExpenses = (id,title,descripbe,price,type) => {
    if (!id) {
        return Promise.reject('Expenses name is empty')
    }

    const data = {
        id:id,
        title:title,
        descripbe:descripbe,
        created_time: new Date().getTime +'',
        price:price,
        type:type,
    }

    const tasks = realm.objects('Expenses')

    return new Promise((resolve, reject) => {
        realm.write(() => {
            realm.create('Expenses', data)

            resolve(tasks)
        })
    })
}

export const removeTask = (task) => {
    const tasks = realm.objects('Task')

    return new Promise(resolve => {
        realm.write(() => {
            realm.delete(task)

            resolve(tasks)
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