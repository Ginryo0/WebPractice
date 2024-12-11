let stringArr = ['one', 'hey', 'Dave'];

let guitars = ['Strat', 'Les Paul', 5150];

let mixedData = ['EVH', 1984, true];

stringArr[0] = 'John';
stringArr.push('hey');

// Would accept string or number only
guitars[0] = 1984;
guitars.unshift('Jim');

// The more general type can be assigned to a less general type
mixedData = guitars;

let test = [];
let bands: string[] = [];
bands.push('Van Halen');

// Tuple (Fixed List) -> Exactly three elements with exactly these 3 types/positions
let myTuple: [string, number, boolean] = ['Dave', 42, true];

let mixed = ['John', 1, false];

myTuple[1] = 42;

// Objects
let myObj: object;
// Array is of type object too
myObj = [];
console.log(typeof myObj);
myObj = bands;
myObj = {};

const exampleObj = {
  prop1: 'Dave',
  prop2: true,
};

exampleObj.prop1 = 'John';

// Interface same as type Guitarist = {...}
// Interface are more used with classes
interface Guitarist {
  // Name is optional = could be undefined
  name?: string;
  active: boolean;
  albums: (string | number)[];
  age?: number;
}

let evh: Guitarist = {
  name: 'Eddie',
  active: false,
  albums: [1984, 5150, 'OU812'],
  age: 22,
};

let jp: Guitarist = {
  active: true,
  albums: ['I', 'II', 'IV'],
};

const greetGuitarist = (guitarist: Guitarist) => {
  // Narrowing using if here instead of -> guitarist.name?.toUpperCase()
  if (guitarist.name) {
    return `Hello ${guitarist.name.toUpperCase()}!`;
  }
  return 'Hello!';
};

console.log(greetGuitarist(jp));

// Enums
// "Unlike most TypeScript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime."

// By default it starts with 0
enum Grade {
  U = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade.U);
