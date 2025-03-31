import { areSiameseNumbers } from '../utils/siameseNumbers'

describe('areSiameseNumbers', () => {
	it('deve retornar true para números com os mesmos dígitos em ordem diferente', () => {
		expect(areSiameseNumbers(123, 321)).toBe(true)
		expect(areSiameseNumbers(112233, 332211)).toBe(true)
	})

	it('deve retornar false para números com diferentes dígitos', () => {
		expect(areSiameseNumbers(123, 456)).toBe(false)
		expect(areSiameseNumbers(111, 123)).toBe(false)
	})

	it('deve retornar true para números com os mesmos dígitos e mesma ordem', () => {
		expect(areSiameseNumbers(123, 123)).toBe(true)
	})

	it('deve retornar true para números de um dígito', () => {
		expect(areSiameseNumbers(5, 5)).toBe(true)
		expect(areSiameseNumbers(8, 8)).toBe(true)
	})

	it('deve retornar false quando um número tem mais dígitos que o outro', () => {
		expect(areSiameseNumbers(12345, 123)).toBe(false)
	})
})
