class CustomPromise {
  constructor (executor) {
    this.state = "pending"
    this.result = undefined
    this.arrayHandlers = []

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled"
        this.result = value

        this.arrayHandlers.forEach((item) => {
          try {
            if (typeof item.onFulFilled !== "function") {
              item.nextResolve(this.result)
            } else {
              const res = item.onFulFilled(this.result)
              item.nextResolve(res)
            }
          } catch(err) {
            item.nextReject(err)
          }
        })
        this.arrayHandlers = []
      }
    }
    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected"
        this.result = error

        this.arrayHandlers.forEach((item) => {
          if (typeof item.onReject !== "function") {
            item.nextReject(this.result)
          } else {
            try {
              const res = item.onReject(this.result)
              item.nextResolve(res)
            } catch(err) {
              item.nextReject(err)
            }
          }
        })
        this.arrayHandlers = []
      }
    }

    try {
      if (typeof executor !== "function") {
        throw new TypeError("executor должен быть функцией")
      }

      executor(resolve, reject)
    } catch(err) {
      console.error("упал в конструкторе", err)
      reject(err)
    }
  } 

  then(onFulFilled, onReject) {
    if (this.state === "pending") {
      const res = new CustomPromise((nextResolve, nextReject) => {
        this.arrayHandlers.push({ onFulFilled, onReject, nextResolve, nextReject })
      })

      return res
    }

    if (this.state === "fulfilled") {
      const res = new CustomPromise((nextResolve, nextReject) => {
        if (typeof onFulFilled !== "function") {
          nextResolve(this.result)
        } else {
          try {
            const result = onFulFilled(this.result)
            nextResolve(result)
          } catch(err) {
            nextReject(err)
          }
        }
      })
      return res
    }

    if (this.state === "rejected") {
      return new CustomPromise((nextResolve, nextReject) => {
        if (typeof onReject !== "function") {
          nextReject(this.result)
          return
        }
        try {
          const result = onReject(this.result)
          nextResolve(result)
        } catch(err) {
          nextReject(err)
        }
      })
    }
  }
  catch(callback) {
    return this.then(undefined, callback)
  }
}

// Пример проверки:
const p = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    console.log("таймаут выполнился")
    resolve("done")
  }, 1200)
})
.then((resolve, reject) => {
    console.log("значение resolve в then пользователя", resolve)
  }
)
.then((res) => {
  console.log("значение resolve в then пользователя 2", res)
})
.catch((err) => {
  console.log("catch", err)
})