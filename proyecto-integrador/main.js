const LABELS = {
  FM_Label: 'form-label-fm',
  UB_Label: 'form-label-ub',
  UB_SubLabel: 'form-label-ub-sub'
}
// Ubicaciones con sus Códigos Postales correspondientes
const UB = {
  '...': null,
  'Buenos Aires': {
    'Bahía Blanca': { Cpostal: 8000, FUM: 1.10 },
    'La Plata': { Cpostal: 1900, FUM: 1.00 },
    'Mar del Plata': { Cpostal: 7600, FUM: 1.05 }
  },
  'Cordoba': {
    'Carlos Paz': { Cpostal: 5152, FUM: 1.22 },
    'Cordoba': { Cpostal: 5000, FUM: 1.20 },
    'Río Cuarto': { Cpostal: 5800, FUM: 1.25 }
  },
  'Entre Rios': {
    'Concordia': { Cpostal: 3200, FUM: 1.15 },
    'Diamante': { Cpostal: 3105, FUM: 1.12 },
    'Parana': { Cpostal: 3100, FUM: 1.10 }
  },
  'Mendoza': {
    'Mendoza': { Cpostal: 5500, FUM: 1.30 },
    'San Rafael': { Cpostal: 5600, FUM: 1.32 },
    'Tunuyán': { Cpostal: 5560, FUM: 1.31 }
  },
  'Río Negro': {
    'Bariloche': { Cpostal: 8400, FUM: 1.32 },
    'General Roca': { Cpostal: 8332, FUM: 1.28 },
    'Viedma': { Cpostal: 8500, FUM: 1.25 }
  },
  'Salta': {
    'Cafayate': { Cpostal: 4427, FUM: 1.36 },
    'Salta': { Cpostal: 4400, FUM: 1.35 },
    'Tartagal': { Cpostal: 4560, FUM: 1.38 }
  },
  'Santa Cruz': {
    'Caleta Olivia': { Cpostal: 9011, FUM: 1.40 },
    'Puerto Deseado': { Cpostal: 9050, FUM: 1.41 },
    'Río Gallegos': { Cpostal: 9400, FUM: 1.42 }
  },
  'Santa Fe': {
    'Rafaela': { Cpostal: 2300, FUM: 1.10 },
    'Rosario': { Cpostal: 2000, FUM: 1.08 },
    'Santa Fe': { Cpostal: 3000, FUM: 1.12 }
  }
}

// Factores multiplicadores según tipo de vivienda
const FM = {
  '...': null,
  'Casa a la calle': 1.07,
  'Departamento en edificio': 1.04,
  'Casa en barrio cerrado': 1.21,
  'Casa de veraneo': 1.15,
  'PH': 1.05,
  'Quinta de fin de semana': 1.18
}

// Costo base (por ejemplo, en pesos argentinos)
const CB = 10000

let fmSelector = null
let ubSelector = null
let ubSubSelector = null

document.addEventListener("DOMContentLoaded", () => {
  if (fmSelector === null) {
    fmSelector = setSelector(FM, document.getElementById(LABELS.FM_Label))
	  ubSelector = setSelector(UB, document.getElementById(LABELS.UB_Label))
  }
  
  const form = document.getElementById('form-price-query')
  form.addEventListener("submit", (event) => onSubmitForm(event))
  const inputElement = document.getElementById('input-square-mtr')
  inputElement.addEventListener("input", (event) => deBouncedChangedSqMtr(event))
  
  fmSelector.addEventListener("change", (event) => onChangeFM(event))
  ubSelector.addEventListener("change", (event) => onChangeUB(event))
});

function setSelector(selectorType, label, isDistrict = false) {
  const selector = document.createElement("select")
  label.appendChild(selector)
  
  for (const key of Object.keys(selectorType)) {
    const option = document.createElement("option")
    option.setAttribute("value", key)
    if (isDistrict) 
      option.textContent = `${key} (Código Postal: ${selectorType[key].Cpostal})`
    else 
      option.textContent = key
    selector.appendChild(option)
  }
  return selector
}

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

const calculateCost = (sqMeters) => {
  return (
    ((CB * sqMeters) * FM[propertyRef]) * UB[locationRef][subLocationRef].FUM
  )
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

const onSubmitForm = (event) => {
  event.preventDefault()
  
  if (propertyRef === '...' || locationRef === '...') {
    handleError(true, `Por favor, complete todos los campos antes de realizar la cotización.`)
    return 
  }
  let sqrMeter = parseInt(document.getElementById('input-square-mtr').value, 10)
  
  if (sqrMeter < 20 || sqrMeter > 500) {
    handleError(true, `Los metros cuadrados deben estar comprendidos entre 20 y 500 metros cuadrados.`)
    return
  }
  
  let priceTag = document.getElementById('precio-estimado-output')
  let mt = parseInt(sqMtrRef, 10)
  priceTag.innerHTML = calculateCost(mt).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

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