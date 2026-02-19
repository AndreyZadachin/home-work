class CustomPromise {
  constructor (executor) {
    this.state = "pending"
    this.result = undefined

    this.arrayHandlers = [{ // Храним обработчики
      resolve: "функция при onFulfilled;",
      reject: "функция при onRejected"
    }]

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled"
        this.result = value
      }
    }
    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected"
        this.result = error
      }
    }

    try {
      if (typeof executor !== "function") {
        throw new Error("executor должен быть функцией")
      }

      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  then(callback) {
    if (this.state === "fulfilled") {
      return new CustomPromise((resolve) => {
        const res = callback(this.result)
      })
    }
    if (this.state === "rejected") {
      return new CustomPromise((resolve, reject) => {
        callback(this.result)
      })
    }
    console.log("Выполнился THEN")
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

function watchPromiseStatus(promise, label = "CustomPromise", intervalMs = 300) {
  const timer = setInterval(() => {
    if (promise.state !== "pending") {
      clearInterval(timer)
      console.log(`[${label}] final state reached: ${promise.state}`)
    }
  }, intervalMs)

  return () => clearInterval(timer)
}

const p = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    console.log("таймаут выполнился")
    resolve("done")
    // reject(new Error("something went wrong"))
  }, 1200)
}).then((resolve) => {
  console.log("then", resolve)
})

watchPromiseStatus(p, "test-promise", 400)
