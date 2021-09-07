import Producer, { ProducerData } from './Producer';

type Doc = {
  name: string;
  demand: number;
  price: number;
  producers: ProducerData[];
};

export default class Province {
  private _name: string;
  private _producers: Producer[];
  private _totalProduction: number;
  private _demand: number;
  private _price: number;

  constructor(doc: Doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg: Producer) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get shortfall() {
    return this._demand - this.totalProduction;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;

    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });

    return result;
  }

  get name() {
    return this._name;
  }

  get producers() {
    return this._producers;
  }

  get totalProduction(): number {
    return this._totalProduction;
  }
  set totalProduction(value: number) {
    this._totalProduction = value;
  }

  get demand(): number {
    return this._demand;
  }
  set demand(value: number) {
    this._demand = value;
  }
  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
  }
}

export function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}
