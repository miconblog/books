export type Plays = {
  [key: string]: Play;
};
export type Invoice = {
  customer: string;
  performance: Perf[];
};
type Play = {
  name: string;
  type: 'tragedy' | 'comedy' | string;
};

type Perf = {
  playID: string;
  audience: number;
};
type EnrichPerformance = Perf & {
  play: Play;
  amount: number;
  volumeCredits: number;
};

export type StatementData = {
  customer: string;
  performance: EnrichPerformance[];
  totalVolumCredits: number;
  totalAmount: number;
};

export default function createStateData(invoice: Invoice, plays: Plays) {
  const result: StatementData = {
    customer: invoice.customer,
    performance: invoice.performance.map(enrichPerformance),
    totalVolumCredits: 0,
    totalAmount: 0,
  };
  result.totalAmount = totalAmount(result);
  result.totalVolumCredits = totalVolumCredits(result);
  return result;

  function enrichPerformance(performance: Perf): EnrichPerformance {
    const result: EnrichPerformance = Object.assign(
      { play: { name: '', type: '' }, amount: 0, volumeCredits: 0 },
      performance
    );
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(perf: Perf) {
    return plays[perf.playID];
  }

  function amountFor(performance: EnrichPerformance) {
    let result = 0;
    switch (performance.play.type) {
      case 'tragedy':
        result = 40000;

        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;

      case 'comedy':
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${performance.play.type}`);
    }
    return result;
  }

  function volumeCreditsFor(performance: EnrichPerformance) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);

    if ('comedy' === performance.play.type) {
      result += Math.floor(performance.audience / 5);
    }
    return result;
  }

  function totalAmount(data: StatementData): number {
    return data.performance.reduce((sum, current) => (sum += current.amount), 0);
  }

  function totalVolumCredits(data: StatementData): number {
    return data.performance.reduce((sum, current) => (sum += current.volumeCredits), 0);
  }
}
