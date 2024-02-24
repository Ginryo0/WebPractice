let myName: string = 'Kofta';
let meaningOfLife: number;
let isLoading: boolean;
let album: any;

myName = 'Konafa';
meaningOfLife = 42;
isLoading = true;
album = 5150;

const sum = (a: number, b: string) => {
  return a + b;
};

// Union Types -> Could be either one
let postId: string | number;
let isActive: number | boolean;

// RegExp Type (Interface)
let re: RegExp = /\w+/g;
