type Play = {
  name: string;
  type: 'tragedy' | 'comedy' | string;
};

type Plays = {
  [key: string]: Play;
};

type Perf = {
  playID: string;
  audience: number;
};

type Invoice = {
  customer: string;
  performance: Perf[];
};

type EnrichPerformance = Perf & {
  play: Play;
  amount: number;
  volumeCredits: number;
};

type StatementData = {
  customer: string;
  performance: EnrichPerformance[];
  totalVolumCredits: number;
  totalAmount: number;
};

export function statement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStateData(invoice, plays));

  function createStateData(invoice: Invoice, plays: Plays) {
    const result: StatementData = {
      customer: invoice.customer,
      performance: invoice.performance.map(enrichPerformance),
      totalVolumCredits: 0,
      totalAmount: 0,
    };
    result.totalAmount = totalAmount(result);
    result.totalVolumCredits = totalVolumCredits(result);
    return result;
  }

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

function renderPlainText(data: StatementData) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performance) {
    // 청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumCredits}점\n`;

  return result;

  function usd(number: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(
      number / 100
    );
  }
}
/**
 * ts 적용 안했다면 오타로 고생했을듯...
 * Intl 객체 처음 써봤다. 공부를 좀 해야겠다.
 * 로직에 숫자 오타를 치기 쉽다.
 * 테스트코드 넣고 시작하니 정말 리팩토링이 훨신 수월한다. 다음에도 습관적으로 넣어야겠다.
 *
 * 지역변수 제거는 아직 확신은 없지만 그동안 내가 JS코딩하면서 갖고 있던 성능과 반대라서 신박한 개념이다. 좀더 지켜봐야겠다.
 * 7.4절에 내용을 잠깐 넘어갔다왔는데... 확실히 클래스 코딩할때 get 세터가 좀더 언어적으로 사고를 확장시켜주는것 같다.
 */
