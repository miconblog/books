/**
 * 인도에 자리한 사무실을 찾아서 도시와 전화번호를 반환한다.
 */

function acquireData(input: any) {
  const lines = input.split('\n');
  let firstLine = true;
  const result = [];

  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }

    if (line.trim() === '') continue;

    const record = line.split(',');
    if (record[1].trim() === 'India') {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}
