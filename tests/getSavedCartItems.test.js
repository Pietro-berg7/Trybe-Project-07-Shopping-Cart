const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', async () => {
    expect(getSavedCartItems).toHaveBeenCalled(localStorage.getItem);
  });

  it("Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o 'cartItems' como parâmetro", () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItem');
  });
});
