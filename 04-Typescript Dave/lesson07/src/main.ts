// Index Signatures

// interface TransactionObj {
//     readonly [index: string]: number
// }

interface TransactionObj {
  // index could be a string, number,or symbol
  readonly [index: string]: number;
  Pizza: number;
  Books: number;
  Job: number;
}

const todaysTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
};

console.log(todaysTransactions.Pizza);
console.log(todaysTransactions['Pizza']);

let prop: string = 'Pizza';
console.log(todaysTransactions[prop]);

const todaysNet = (transactions: TransactionObj): number => {
  let total = 0;
  for (const transaction in transactions) {
    total += transactions[transaction];
  }
  return total;
};

console.log(todaysNet(todaysTransactions));

// todaysTransactions.Pizza = 40

// Would pass ts checks because It's a string
console.log(todaysTransactions['Dave']); // undefined

///////////////////////////////////

interface Student {
  //[key: string]: string | number | number[] | undefined
  // add undefined to union type because classes is optional
  name: string;
  GPA: number;
  classes?: number[];
}

const student: Student = {
  name: 'Doug',
  GPA: 3.5,
  classes: [100, 200],
};

// Typescript might allow access to a property that doesn't exist because of index signature
// console.log(student.test)

// keyof creates a union type of the object properties as string literals
for (const key in student) {
  console.log(`${key}: ${student[key as keyof Student]}`);
}

// typeof -> if you don't know the type of object you are referencing
Object.keys(student).map((key) => {
  console.log(student[key as keyof typeof student]);
});

// You can have keyof directly as parameter type
const logStudentKey = (student: Student, key: keyof Student): void => {
  console.log(`Student ${key}: ${student[key]}`);
};

logStudentKey(student, 'name');

/////////////////////////////////

// interface Incomes {
//     [key: string]: number
// }

type Streams = 'salary' | 'bonus' | 'sidehustle' | 'drops';

// Record<(index literals), (field types)> -> Record<Streams, number | string>
type Incomes = Record<Streams, number | string>;

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250,
  drops: 'xs',
};

for (const revenue in monthlyIncomes) {
  console.log(monthlyIncomes[revenue as keyof Incomes]);
}
