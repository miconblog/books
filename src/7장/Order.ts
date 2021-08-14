type Item = {
  price: number;
};

export class Order {
  private quantity: number;
  private item: Item;

  constructor(quantity: number, item: any) {
    this.quantity = quantity;
    this.item = item;
  }

  get basePrice() {
    return this.quantity * this.item.price;
  }

  get discountFactor() {
    let result = 0.98;
    if (this.basePrice > 1000) result -= 0.03;
    return result;
  }

  get price() {
    return this.basePrice * this.discountFactor;
  }
}
