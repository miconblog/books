import createStateData, { Invoice, Plays, StatementData } from './createStateData';
import invoices from '../invoices.json';
import plays from '../plays.json';

export function htmlStatement(invoice: Invoice, plays: Plays) {
  return renderHtml(createStateData(invoice, plays));
}

function renderHtml(data: StatementData) {
  let result = `<h1>청구 내역 (고객명:${data.customer})</h1>`;
  result += '<table>';
  result += '<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>';
  for (let perf of data.performance) {
    // 청구 내역을 출력한다.
    result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td><td>${usd(perf.amount)} </td></tr>`;
  }
  result += '</table>';
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>`;
  result += `<p>적립 포인트: <em>${usd(data.totalVolumCredits)}</em>점</p>`;
  return result;
}

export function statement(invoice: Invoice, plays: Plays): string {
  return renderPlainText(createStateData(invoice, plays));
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
}

function usd(number: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(
    number / 100
  );
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
