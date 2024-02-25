"use strict";
// Index Signatures
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
};
console.log(todaysTransactions.Pizza);
console.log(todaysTransactions['Pizza']);
let prop = 'Pizza';
console.log(todaysTransactions[prop]);
const todaysNet = (transactions) => {
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
const student = {
    name: 'Doug',
    GPA: 3.5,
    classes: [100, 200],
};
// Typescript might allow access to a property that doesn't exist because of index signature
// console.log(student.test)
// keyof creates a union type of the object properties as string literals
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
// typeof -> if you don't know the type of object you are referencing
Object.keys(student).map((key) => {
    console.log(student[key]);
});
// You can have keyof directly as parameter type
const logStudentKey = (student, key) => {
    console.log(`Student ${key}: ${student[key]}`);
};
logStudentKey(student, 'name');
const monthlyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250,
    drops: 'xs',
};
for (const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue]);
}
