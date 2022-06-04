console.log(__dirname);
import helperServices from '../../src/services/helperServices.js';

// Definimos de que se trata la prueba


describe('Pruebas de caja blanca, pasar por el if, pasar por el else y no pasar por el for', () => {
  // Definimos el test
  test('calculateTuitionFeeRepitiendo', () => {
    // Definimos los datos de entrada
    const data = {
      creditCost: 10,
      subjects: [
        {
          credits: 1,
          name: 'Matematicas'
        },
        {
          credits: 2,
          name: 'Lengua'
        }
      ],
      repetir: 1
    };
    // Definimos el resultado esperado
    const expected = 39;
    // Definimos el resultado obtenido
    const result = helperServices.calculateTuitionFee(data);
    // Comparamos los resultados
    expect(result).toBe(expected);
  });

  test('calculateTuitionFeeNoRepitiendo', () => {
    // Definimos los datos de entrada
    const data = {
      creditCost: 10,
      subjects: [
        {
          credits: 1,
          name: 'Matematicas'
        },
        {
          credits: 2,
          name: 'Lengua'
        }
      ],
      repetir: 0
    };
    // Definimos el resultado esperado
    const expected = 30;
    // Definimos el resultado obtenido
    const result = helperServices.calculateTuitionFee(data);
    // Comparamos los resultados
    expect(result).toBe(expected);
  });

  test('calculateTuitionFeeVacio', () => {
    // Definimos los datos de entrada
    const data = {
      creditCost: 10,
      subjects: [],
      repetir: 1
    };
    // Definimos el resultado esperado
    const expected = 0;
    // Definimos el resultado obtenido
    const result = helperServices.calculateTuitionFee(data);
    // Comparamos los resultados
    expect(result).toBe(expected);
  });
});

