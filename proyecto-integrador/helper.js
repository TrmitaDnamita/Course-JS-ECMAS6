function handleError(isError, errorMsg = '') {
  if (isError === errorRef) return
  
  errorRef = isError
  let errorElement = document.getElementById('error-handler-element')

  isError ? errorElement.innerHTML =  errorMsg: errorElement.innerHTML = errorMsg
}

function deBounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}