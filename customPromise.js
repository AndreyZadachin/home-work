class CustomPromise {
  constructor (executor) {
    this.state = "pending"
    this.result = undefined
    this.arrayHandlers = [{ // Храним обработчики
      resolve: "функция при onFulfilled;",
      reject: "функция при onRejected"
    }]

    executor(this.resolve.bind(this), this.reject.bind(this))
  //   Надо сделать перевод промиса в rejected через throw при ошибке
  }

  then(response) {
    return new CustomPromise(response)
    // Надо подумать как передавать результат промиса в следующий промис
  }
  resolve(value) {
    this.state = "fulfilled"
    this.result = value
  }
  reject(error) {
    this.state = "rejected"
    this.result = error
  }
  catch() {
  }
}
