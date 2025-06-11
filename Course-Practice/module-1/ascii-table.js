document.addEventListener("DOMContentLoaded", () => {
	const ASCII_LENGTH = 256;
	const ROW_LENGTH = 8;
	
	const tableLength = Math.floor(ASCII_LENGTH / ROW_LENGTH);
	const asciiTableRows = [];
	
	asciiTableRows.push(`
		<table>
			<caption>This is a table of all the ASCII characters</caption>
	`);
	
	asciiTableRows.push(`<thead><tr>`);
	for (let i = 0; i < ROW_LENGTH; i++) {
		asciiTableRows.push(`<th>Number</th><th>Character</th>`);
	}
	asciiTableRows.push(`</tr></thead>`);
	
	let col = [];
	
	for (let i = 0; i <= tableLength; i++) {
		for (let j = 0; j <= tableLength; j++) {
			let actualPos = j + (tableLength * j) + i
			col[j] = actualPos < ASCII_LENGTH ? actualPos : NaN;
		}
		
		asciiTableRows.push(`<tr>`);
		for (let k = 0; k < ROW_LENGTH; k++) {
			asciiTableRows.push(`<td>${col[k]}</td><td>${String.fromCharCode(col[k])}</td>`);
		}
		asciiTableRows.push(`<tr>`);
	}
	
	asciiTableRows.push(`</table>`);
	document.getElementById("ascii-output").innerHTML += asciiTableRows.join("");
});

/*
const TAU = 6.283185307179586476925286766559005768394338798750211641949889184615;

let myFive = 5;
let myString = "Hello World!";
let myBoolean = true;

let myNull = null;
let myUndefined = undefined;
let myNaN = NaN;
let myObject = {};

console.warn('This is a warning');

console.table(['Javascript', 'HTML', 'CSS', 'PHP', 'Python', 'C#', 'C++', 'Java']);

console.log(myString, myBoolean, myFive, myNull, myUndefined, myNaN, myObject);

myString = myFive;
myBoolean = myObject;
myNaN = myNull;
myNull = myUndefined;
myUndefined = NaN;
myObject = 5;
myFive = "Hello World!";

let myMap = new Map(
	Object.entries({
		myFive: myFive, 
		myString: myString, 
		myBoolean: myBoolean, 
		myNull: myNull, 
		myUndefined: myUndefined, 
		myNaN: myNaN, 
		myObject: myObject
	})
);

console.log(
	myMap
);

console.table(myMap.entries());

//alert("Hola Mundo! Yo si soy JavaScript!");

console.error("Javascript has escaped! Euclid type of Danger!");

myFunction();

function myFunction() {
	console.log("Hello: " + TAU + myFive);
}

myFunction();

let _main;

_main = () => {
	let myVariable = 5;
	const myConstant = 5;
	console.log(myVariable);
	return alert('This alert is no JavaScript!');
}

console.table([null, _main(), NaN, false, true, "Hello World!"]);
*/