import { Order } from './Order';

describe('7장', () => {
  test('Order', () => {
    const order = new Order(10, { price: 1000 });

    expect(order.price).toBe(9500);
  });
});
