#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.green.underline.bold("\nWelcome to Student Management System!\n"))
// Creating a class of student
class Student {
    static idCounter: number = 0;
    studentID: number;
    courses: string[] = [];
    balance: number = 0;

    constructor(private name: string) {
        Student.idCounter++;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return 10000 + Student.idCounter
    }
    enrollCourse(course: string) {
        this.courses.push(course);
        this.balance += 1000
    }
    viewBalance():number {
        return this.balance   // pending balance of student
    }
    payCoursesFee(amount: number) {
        this.balance -= amount       // the balance of student will - amount paid by student
    }
    showStatus() {
        console.log(`
        Name: ${this.name}
        Student ID: ${this.studentID}
        Courses Enrolled: ${this.courses.join(", ")}
        Balance: ${this.balance}
        `)
    }
    getStudentID() {
        return this.studentID
    }
    getName() {
        return this.name
    }
} // class ends here
const students: Student[] = []    //students list will be stored here
// Main menu function
async function mainMenu() {
    const userInputMenu = await inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "Select your manu!",
        choices: [
            "1. Add New Student",
            "2. Enroll Student in Course",
            "3. View Student Balance",
            "4. Pay Course Fee",
            "5. Show Student Status",
            "6. End Menu"]
    });
    const { menu } = userInputMenu;
    if (menu === "1. Add New Student") await addNewStudent();
    if (menu === "2. Enroll Student in Course") await enrollStudent();
    if (menu === "3. View Student Balance") await viewBalance();
    if (menu === "4. Pay Course Fee") await payFee();
    if (menu === "5. Show Student Status") await showStatus();
    if (menu === "6. End Menu") {
        console.log(`Thank you for using Student Management System!\n`)
        process.exit();
    }
    mainMenu();
} //main menu ends here
//Start creating functions
//Add new student functions starts here
async function addNewStudent() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: "Enter student name here!"
    })
    const student = new Student(userInput.name)
    students.push(student)
    console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}`)
};         //Add new student functions ends here
// entroll student function starts here
async function enrollStudent() {
    const student = await selectStudent();

    if (student) {
        const userInput = await inquirer.prompt({
            type: 'list',
            name: 'course',
            message: "Select courses to enroll!",
            choices: ["Typescript", "Javascript", "Python", "Next.js"]
        });
        student.enrollCourse(userInput.course);
        console.log(`Successfully enrollled in courses: ${userInput.course}`)
    }
}; // entroll student function ends here
//View balance function starts here
async function viewBalance() {
    const student = await selectStudent();

    if (student) {
        console.log(`Balance: ${student.viewBalance()}`)
    }
};  //View balance function ends here
//payFee function starts here
async function payFee() {
    const student = await selectStudent();

    if (student) {
        const userInput = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: "Enter amount you want to pay!"
        });
        student.payCoursesFee(parseFloat(userInput.amount));
        console.log(`Paid: ${userInput.amount}. Balance remaining ${student.viewBalance()}`)
    }
}; //payFee function ends here
//student status function starts here
async function showStatus() {
    const student = await selectStudent();
    if (student) {
        student.showStatus();
    }
};  //student status function ends here

//selectedStudent() starts here
async function selectStudent() {
    if (students.length === 0) {
        console.log(chalk.bold.red(`Sorry, no student record available!\n`))
    } else {
        const stdSelect = await inquirer.prompt({
            type: 'list',
            name: 'stdID',
            message: "Select a Student!",
            choices: students.map((std) => ({
                name: std.getName(),
                value: std.getStudentID()
            }))
        });
        return (
            students.find((std) => std.getStudentID() === stdSelect.stdID) || null
        )
    }
}; //selectedStudent() ends here
mainMenu();


    

