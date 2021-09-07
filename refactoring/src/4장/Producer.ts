import Province from './Province';

export type ProducerData = {
  name: string;
  cost: number;
  production: number;
};

export default class Producer {
  private _province: any;
  private _cost: number;
  private _name: string;
  private _production: number;

  constructor(aProvince: Province, data: ProducerData) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name(): string {
    return this._name;
  }
  get cost(): number {
    return this._cost;
  }
  set cost(value: number) {
    this._cost = value;
  }

  get production(): number {
    return this._production;
  }
  set production(amountStr: number) {
    const amount = amountStr - 0;
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
