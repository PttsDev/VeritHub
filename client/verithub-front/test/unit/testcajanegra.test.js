console.log(__dirname);
import helperServices from '../../src/services/helperServices.js';

// Definimos de que se trata la prueba


describe('Prueba de fee calculation', () => {
  // Definimos el test
  test('calculateTuitionFee', () => {
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
});

