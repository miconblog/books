import { Order } from './7.4-임시_변수를_질의_함수로_바꾸기';

test('Order', () => {
  const order = new Order(10, { price: 1000 });

  expect(order.price).toBe(9500);
});
