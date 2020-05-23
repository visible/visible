import { Model } from '../model';

test('toJSON', () => {
  class MyClass extends Model {
    field!: string;
    method = () => {
      /* noop */
    };
  }

  const myClass = MyClass.from({ field: 'hello' });
  expect(myClass.toJSON()).toEqual({ field: 'hello' });
});

it('can be updated using copy', () => {
  class MyClass extends Model {
    count1!: number;
    count2!: number;
  }

  const a = MyClass.from({ count1: 1, count2: 2 });
  const b = a.copy({ count1: 3 });

  expect(b.count1).toBe(3);
  expect(b.count2).toBe(2);
});

it('can be updated using map', () => {
  class MyClass extends Model {
    count1!: number;
    count2!: number;
  }

  const a = MyClass.from({ count1: 1, count2: 2 });
  const b = a.map({ count1: (value) => value + 1 });

  expect(b.count1).toBe(2);
  expect(b.count2).toBe(2);
});
