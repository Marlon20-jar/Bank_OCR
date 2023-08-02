// Vamos a utilizar el módulo fs (File System) para leer el contenido del archivo de entrada.
const fs = require('fs');

//Decodificar Números de Cuenta
const digitMap = {
  '   \n  |\n  |': '1',
  ' _ \n _|\n|_ ': '2',
  ' _ \n _|\n _|': '3',
  '   \n|_|\n  |': '4',
  ' _ \n|_ \n _|': '5',
  ' _ \n|_ \n|_|': '6',
  ' _ \n  |\n  |': '7',
  ' _ \n|_|\n|_|': '8',
  ' _ \n|_|\n _|': '9',
  ' _ \n| |\n|_|': '0', // Agregamos la representación de celdas 3x3 para el dígito 0
};


// Función para leer el archivo de entrada
function readInputFile() {
  try {
    const data = fs.readFileSync('input1.txt', 'utf8');
    const entries = data.split('\n\n');
    return entries.map(entry => entry.replace(/\r/g, ''));
  } catch (err) {
    console.error('Error al leer el archivo de entrada:', err);
    return [];
  }
}


// Procesar las Entradas
// Función para procesar una sola entrada y obtener el número de cuenta
function processEntry(entry) {
  const lines = entry.split('\n');
  const digits = [];

  for (let i = 0; i < 9; i++) {
    const digit = [];
    for (let j = 0; j < 3; j++) {
      const cell = lines[j].substr(i * 3, 3);
      digit.push(cell);
    }
    digits.push(digit.join('\n'));
  }

  return digits;
}

// Conversión de Dígitos
// Función para convertir dígitos en números
function convertDigitsToNumber(digits) {
  return digits.map(digit => digitMap[digit] !== undefined ? digitMap[digit] : '?').join('');
}


// Función para calcular la suma de verificación para un número de cuenta
function calcuSum(accountNumber) {
  let validsum = 0;
  for (let i = 0; i < accountNumber.length; i++) {
    const digit = parseInt(accountNumber[i]);
    validsum += (9 - i) * digit;
  }
  return validsum % 11 === 0;
}

// Función para validar si un número de cuenta es válido de rango 0-9 y que la suma sea correcta, o si contiene dígitos ilegibles
function isValidAccountNumber(accountNumber) {
  // Validar que el número de cuenta tiene 9 dígitos y la suma sea correcta
  if (accountNumber.length !== 9 || !calcuSum(accountNumber)) {
    return false;
  }

  // Verificar si el número de cuenta contiene algún dígito ilegible (representado por '?')
  if (accountNumber.includes('?')) {
    return "ILL"; // Si contiene dígitos ilegibles, retornamos "ILL"
  }

  return true; // Si no contiene dígitos ilegibles, retornamos true (OK)
}


// Programa Principal
// Función principal del programa
function main() {
  const entries = readInputFile();
  console.log(entries);

  for (let i = 0; i < entries.length; i++) {
    const accountNumber = processEntry(entries[i]);
    const accountNumberString = convertDigitsToNumber(accountNumber);
    const validationResult = isValidAccountNumber(accountNumberString);
    if (validationResult === true) {
      console.log(`Account number: ${accountNumberString.replace(/\?/g, ' ')} - is Valid: OK`);
    } else if (validationResult === "ILL") {
      console.log(`Account number: ${accountNumberString.replace(/\?/g, ' ')} - is Valid: ILL`);
    } else {
      console.log(`Account number: ${accountNumberString.replace(/\?/g, ' ')} - is Valid: ERR`);
    }
  }
}

main();