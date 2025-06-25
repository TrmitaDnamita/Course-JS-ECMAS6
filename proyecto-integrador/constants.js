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