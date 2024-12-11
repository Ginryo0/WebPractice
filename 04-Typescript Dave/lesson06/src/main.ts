class Coder {
  // name: string,
  // ignore checking it
  secondLang!: string;

  constructor(
    // Visibility modifiers
    // Protected could be accessed in subclasses too (extending classes)
    // Private can be accessed in this class only
    public readonly name: string,
    public music: string,
    private age: number,
    protected lang: string = 'Typescript'
  ) {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  public getAge() {
    return `Hello, I'm ${this.age}`;
  }
}

const Kofta = new Coder('Kofta', 'mus', 42);
console.log(Kofta.getAge());
// console.log(Kofta.age);
// console.log(Kofta.lang);

class WebDev extends Coder {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number
  ) {
    super(name, music, age);
    this.computer = computer;
  }

  // This would work -> lang is protected

  public getLang() {
    return `I write ${this.lang}`;
  }

  // This would not work -> age is private = accessible in coder only
  //   public getAge(){
  //     return `I write ${this.age}`
  //   }
}

const Konafa = new WebDev('Mac', 'Konafa', 'Lofi', 22);
console.log(Konafa.getLang());
// console.log(Konafa.age)
// console.log(Konafa.lang)
/////////////////////////////////////

interface Musician {
  name: string;
  instrument: string;
  play(action: string): string;
}

// class x implements <interface>
class Guitarist implements Musician {
  name: string;
  instrument: string;

  constructor(name: string, instrument: string) {
    this.name = name;
    this.instrument = instrument;
  }

  play(action: string) {
    return `${this.name} ${action} the ${this.instrument}`;
  }
}

const Page = new Guitarist('Jimmy', 'guitar');
console.log(Page.play('strums'));
//////////////////////////////////////

class Peeps {
  // Static fields -> doesn't apply to any instances of the class but only to the class itself
  static count: number = 0;

  static getCount(): number {
    return Peeps.count;
  }

  public id: number;

  constructor(public name: string) {
    this.name = name;
    // ++ before -> starts with 1
    // ++ after -> starts with 0
    this.id = ++Peeps.count;
  }
}

const John = new Peeps('John');
const Steve = new Peeps('Steve');
const Amy = new Peeps('Amy');

console.log(Amy.id);
console.log(Steve.id);
console.log(John.id);
console.log(Peeps.count);
//////////////////////////////////

class Bands {
  private dataState: string[];

  constructor() {
    this.dataState = [];
  }

  // getter returns a value
  public get data(): string[] {
    return this.dataState;
  }

  // setter doesn't return any value
  public set data(value: string[]) {
    if (Array.isArray(value) && value.every((el) => typeof el === 'string')) {
      this.dataState = value;
      return;
    } else throw new Error('Param is not an array of strings');
  }
}

const MyBands = new Bands();
// This uses the setter
MyBands.data = ['Neil', 'Led'];
// This uses the getter
console.log(MyBands.data);

MyBands.data = [...MyBands.data, 'ZZ Top'];
console.log(MyBands.data);

// Throws an error must be string data
MyBands.data = ['Van', 5150];
