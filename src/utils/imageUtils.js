export const getProductImageLink = product => {
  const baseUrl = 'https://images.pricerunner.com/product/200x200';
  return `${baseUrl}/${product.imageId}/${product.name.replace(
    /[^a-z0-9]/gim,
    '-'
  )}.jpg`;
};
