const fetchProducts = async () => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${value}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
