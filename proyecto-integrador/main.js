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

const calculateCost = (sqMeters) => {
  return (
    ((CB * sqMeters) * FM[propertyRef]) * UB[locationRef][subLocationRef].FUM
  )
}

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