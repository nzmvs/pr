import { getProductImageLink } from './imageUtils';

describe('Image utils', () => {
  describe('Get product image URL', () => {
    it('should return url', () => {
      const product = {
        name: 'Samsung Galaxy S9 64GB',
        imageId: '1802434265'
      };

      const imageUrl = getProductImageLink(product);
      const expected =
        'https://images.pricerunner.com/product/200x200/1802434265/Samsung-Galaxy-S9-64GB.jpg';

      expect(imageUrl).toEqual(expected);
    });
  });
});
