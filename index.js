const output = document.getElementById("output");

const log = (value) => {
  output.textContent += `${value}\n`;
};

window.chunkArray = (arr, size) => {
  if (!arr.length || size === 0) return []

  const arrSort = []

  let i = 0
    while(i = arr.length) {
      arrSort.push(arr.splice(0, size))
      i++
    }

  return arrSort
};

window.debounce = function(func, time = 0, options = {}) {
  let timerId

  const leading = !!options.leading
  const trailing = options.trailing ?? true

  return function(...args) {
    if (leading && !timerId) {
      func(...args)
    }
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      if (trailing) {
        func(...args)
      }
      timerId = null
    }, time)
  }
}

 window.throttle = function(func, time = 0, options = {}) {
  let timerId
  let isBusy = false
  let lastCall

  const leading = options.leading ?? true
  const trailing = options.trailing ?? true

  return function(...args) {
    if (!isBusy) {
      if (leading) {
        func(...args)
      } else {
        lastCall = args
      }

      isBusy = true

      timerId = setTimeout(() => {
        isBusy = false
        
        if (lastCall !== undefined) {
          if (trailing) {
            func(...lastCall)
          }

          lastCall = undefined
          timerId = undefined
        }
      }, time)
    } else {
      lastCall = args
    }
  }
} 