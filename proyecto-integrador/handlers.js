let errorRef = false
let propertyRef = '...'
let locationRef = '...'
let subLocationRef = '...'
let sqMtrRef = '0'

const onChangeUB = (event) => {
  const value = event.target.value
  
  let ubSubLabel = document.getElementById(LABELS.UB_SubLabel)
  if (value === `...`) {
    ubSubLabel.innerHTML = ``
    return
  }
  if (value === locationRef) return
  if (value !== locationRef) ubSubLabel.innerHTML = ``
  
  ubSubLabel.innerHTML += `<span>Selecciona su departamento o sección</span>`
  
  ubSubSelector = setSelector(UB[value], ubSubLabel, true)
  ubSubSelector.addEventListener("change", (event) => onChangeSubUB(event))
  
  ubSubLabel.appendChild(ubSubSelector)
  
  locationRef = value
  subLocationRef = Object.keys(UB[locationRef])[0]
  
  handleError(false)
}

const onChangeFM = (event) => {
  const value = event.target.value
  if (value === `...`) return
  if (value === propertyRef) return
  propertyRef = value
  handleError(false)
}

const onChangeSubUB = (event) => {
  const value = event.target.value
  if (value === `...`) return
  if (value === subLocationRef) return
  subLocationRef = value
}

const onChangeSqMtr = (event) => {
  const inputElement = event.target
  let inputValue = inputElement.value
  if (inputValue === ``) { 
    inputElement.style = 'border: 1px solid inherit';
    handleError(false)
    return
  }
  if (inputValue === sqMtrRef) return
  sqMtrRef = inputValue
  
  let mt = parseInt(sqMtrRef, 10)
  
  if (mt < 20 || mt > 500) {
    inputElement.style = 'border: 3px solid red'
    handleError(true, `Los metros cuadrados deben estar comprendidos entre 20 y 500 metros cuadrados.`)
    return
  }
  
  inputElement.style = 'border: 1px solid inherit';
  handleError(false)
}

const deBouncedChangedSqMtr = deBounce(onChangeSqMtr, 300)