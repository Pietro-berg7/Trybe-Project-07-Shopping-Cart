// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const prices = document.querySelector('.total-price');
const load = document.querySelector('.loading');
let totalPrice = 0;

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  load.remove();
  return section;
};

async function createProductList() {
  const products = await fetchProducts('computador');

  await products.results.forEach((product) => {
    document.querySelector('.items')
      .appendChild(createProductItemElement(product));
  });
} 

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
//  const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (event) => {
    event.target.remove();
    totalPrice -= price;
    prices.innerText = totalPrice.toFixed(2);
  });
  return li;
};

async function addProductCart() {
  const addCart = document.querySelectorAll('.item__add');
  const createElement = createCartItemElement;
  addCart.forEach((button) => {
    button.addEventListener('click', async () => {
      const item = await fetchItem(button.parentElement.firstChild.innerText);
      const cartItem = document.querySelector('.cart__items');
      cartItem.appendChild(createElement(item));
      totalPrice += item.price;
      prices.innerText = totalPrice.toFixed(2);
    });
  });
}

function emptyCart() {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    const cartItem = document.querySelectorAll('.cart__item');
    cartItem.forEach((item) => {
      item.remove();
      prices.innerText = 0;
      totalPrice = 0;
    });
  });
}

window.onload = async () => {
  await createProductList();
  await addProductCart();
  emptyCart();
};
