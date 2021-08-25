import { print } from './8.7-반복문_쪼개기';

test('전체급여와 가장 어린나이 계산', () => {
  const people = [
    { age: 13, salary: 1000 },
    { age: 18, salary: 10000 },
    { age: 20, salary: 15000 },
    { age: 24, salary: 2810000 },
    { age: 30, salary: 4561000 },
    { age: 41, salary: 9100000 },
  ];
  expect(print(people)).toBe('최연소: 13, 총 급여: 16497000');
});
