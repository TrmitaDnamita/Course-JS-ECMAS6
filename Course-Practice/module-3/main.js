const dataBase_Finanzas = {
  'Periodo': {
    'Enero': { 'income': 1500, 'outcome': 1500 },
    'Febrero': { 'income': 2500, 'outcome': 2500 },
    'Marzo': { 'income': 84683, 'outcome': 1155 },
    'Abril': { 'income': 135353, 'outcome': 1533 },
    'Mayo': { 'income': 1535, 'outcome': 5434 },
    'Junio': { 'income': 434354, 'outcome': 5434543 },
    'Julio': { 'income': 435453, 'outcome': 4543 },
    'Agosto': { 'income': 78351, 'outcome': 7816 },
    'Septiembre': { 'income': 1878, 'outcome': 95634 },
    'Octubre': { 'income': 48483, 'outcome': 9433 },
    'Noviembre': { 'income': 35483, 'outcome': 53133 },
    'Diciembre': { 'income': 3843, 'outcome': 348133 }
  },
  'MoneyData': {
    'locale': 'es-AR',
    'es-AR': {
      'currency': 'ARS',
      'symbol': '$'
    },
    'en-US': {
      'currency': 'USD',
      'symbol': '$'
    },
    'pt-BR': {
      'currency': 'BRL',
      'symbol': 'R$'
    }
  },
  'MoreDataHere...' : null,
}

function onStartChallenge1() {
  const tbody = document.getElementById('tbody-flujocaja')
  const dbPeriod = dataBase_Finanzas['Periodo'] // fetch from DB
  
  const locale = dataBase_Finanzas['MoneyData']['locale']
  const currency = dataBase_Finanzas['MoneyData'][locale]['currency']
  const symbol = dataBase_Finanzas['MoneyData'][locale]['symbol']
  
  let TotalBalance = 0
  for (let key in dbPeriod) {
    const values = dbPeriod[key]
    
    const income = values['income']
    const outcome = values['outcome']
    const balance = income - outcome
    
    const tdIncome = `${symbol}${income.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    const tdOutcome = `${symbol}${outcome.toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    const tdBalance = `${symbol}${balance.toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    
    const status = balance > 0 ? 'ok' : balance < 0 ? 'error' : 'neutral'
    
    tbody.innerHTML += `<tr>
      <td>${key}</td>
      <td class="text-right">${tdIncome}</td>
      <td class="text-right">${tdOutcome}</td>
      <td class="text-right" data-status="${status}">${tdBalance}</td>
    </tr>`
    
    TotalBalance += balance
  }
  
  const tr = document.createElement('tr')
  const tdTotalText = document.createElement('td')
  const tdTotalBalance = document.createElement('td')
  
  tr.classList.add('balance-row')
  
  tdTotalText.textContent = `Balance Total en ${currency}: `
  tdTotalText.setAttribute('colspan', 3)
  
  tdTotalBalance.textContent = `${symbol}${TotalBalance.toLocaleString(locale, { 
    minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}`
  tdTotalBalance.classList.add('text-right')
  tdTotalBalance.setAttribute('data-status', TotalBalance > 0 ? 'ok' : TotalBalance < 0 ? 'error' : 'neutral')
  
  tr.appendChild(tdTotalText)
  tr.appendChild(tdTotalBalance)
  
  tbody.appendChild(tr)
}

const dataBase_ArgenFin = {
  'Plan 001': {
    'Capital': 150000,
    'Plazo': 30,
    'Tasa': 15
  },
  'Plan 002': {
    'Capital': 300000,
    'Plazo': 180,
    'Tasa': 10
  },
  'Plan 003': {
    'Capital': 485000,
    'Plazo': 60,
    'Tasa': 23
  }
}

function onStartChallenge2() {
  const tbody = document.getElementById('tbody-creditos')
  const dbPlan = dataBase_ArgenFin // fetch from DB
  
  for (let key in dbPlan) {
    const values = dbPlan[key]
    const capital = values['Capital'].toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const balance = ((values['Capital'] * values['Tasa'] * values['Plazo']) / 100).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    
    tbody.innerHTML += `<tr>
      <td>${key}</td>
      <td class="text-right">${capital}</td>
      <td class="text-right">${values['Plazo']}</td>
      <td class="text-right">${values['Tasa']}</td>
      <td class="text-right">${balance}</td>
    </tr>`
  }
}

onStartChallenge1();
onStartChallenge2();