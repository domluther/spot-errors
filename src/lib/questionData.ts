import type { Mode } from "./scoreManager";

// Error Spotter Question Interface
export interface ErrorSpotterQuestion {
	description: string;
	code: string[];
	answer: {
		lineNumber: number;
		errorType: "syntax" | "logic";
		corrections: string[];
		explanation: string;
	};
	category: Category;
}

export type Category =
	| "input-output"
	| "operators"
	| "variables"
	| "selection"
	| "strings"
	| "iteration-for"
	| "iteration-while"
	| "iteration-do-until"
	| "switch"
	| "arrays"
	| "subprograms"
	| "files";

export interface QuizMode {
	id: Mode;
	title: string;
	description: string;
	emoji: string;
}

export const QUIZ_MODES: Record<string, QuizMode> = {
	"Error Spotter": {
		id: "Error Spotter",
		title: "Error Spotter",
		description: "Find and correct syntax and logic errors in OCR ERL code",
		emoji: "🔍",
	},
};
// Error Spotter Questions
export const errorSpotterQuestions: ErrorSpotterQuestion[] = [
	{
		description:
			"This program calculates the area of a rectangle by multiplying length and width, then displays the result.",
		code: [
			'length = input("Enter length")',
			'width = input("Enter width")',
			"area = length * width",
			'print("Area is")',
			"print(area",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ["print(area)"],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "input-output",
	},
	{
		description:
			"This program asks for a temperature in Celsius and converts it to Fahrenheit using the formula F = C * 9/5 + 32.",
		code: [
			'celsius = input("Enter temperature in Celsius")',
			"fahrenheit = celsius * 9/5 + 32",
			'print("Temperature in Fahrenheit is")',
			"print(celsuis)",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["print(fahrenheit)"],
			explanation: 'The variable name "fahrenheit" is misspelled as "celsuis".',
		},
		category: "input-output",
	},
	{
		description:
			"This program asks the user to input their name and then displays a personalized greeting message.",
		code: ['name = input("Enter your name")', 'print("Hello " + name'],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['print("Hello " + name)'],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "input-output",
	},
	{
		description:
			"This program calculates the average of three test scores by adding them together and dividing by 3.",
		code: [
			'score1 = input("Enter score 1")',
			'score2 = input("Enter score 2")',
			'score3 = input("Enter score 3")',
			"average = (score1 + score2 + score3) / 3",
			'print("Average is")',
			"print(averge)",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["print(average)"],
			explanation: 'The variable name "average" is misspelled as "averge".',
		},
		category: "input-output",
	},
	{
		description:
			"This program casts a string '42' to an integer and adds 8 to it, then displays the result.",
		code: [
			'numStr = "42"',
			"numInt = int(numStr)",
			"result = numInt + 8",
			"print(result",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["print(result)"],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "input-output",
	},
	{
		description:
			"This program creates a constant for VAT rate (20%) and calculates the VAT on a price, then displays the total price including VAT.",
		code: [
			"const VAT = 0.2",
			'price = input("Enter price")',
			"vatAmount = price * VAT",
			"total = price + vatAmount",
			'print("Total with VAT")',
			"print(totl)",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["print(total)"],
			explanation: 'The variable name "total" is misspelled as "totl".',
		},
		category: "input-output",
	},
	{
		description:
			"This program asks for a sentence and displays how many characters are in it.",
		code: [
			'sentence = input("Enter a sentence")',
			"length = len(sentence)",
			'print("Character count")',
			"print(lenght)",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["print(length)"],
			explanation: 'The variable name "length" is misspelled as "lenght".',
		},
		category: "input-output",
	},
	{
		description:
			"This program calculates the area of a rectangle by multiplying length and width, then displays the result.",
		code: [
			'length = input("Enter length")',
			'width = input("Enter width")',
			"area = length * width",
			'print("Area is"',
			"print(area)",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ['print("Area is")'],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "input-output",
	},
	{
		description:
			"This program checks if a student has passed an exam. A pass requires a score of 40 or more.",
		code: [
			'score = input("Enter your score")',
			"if score >= 40 then",
			'    print("Pass")',
			"else",
			'    print("Fail)',
			"endif",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ['print("Fail")'],
			explanation: "The string is missing its closing quote.",
		},
		category: "input-output",
	},
	{
		description:
			"This program displays a welcome message three times using a loop.",
		code: [
			"for count = 1 to 3",
			'    print("Welcome")',
			"next count",
			'print(Finished")',
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ['print("Finished")'],
			explanation: "The string is missing its opening quote.",
		},
		category: "input-output",
	},
	{
		description:
			"This program asks the user to input their name and then displays a personalized greeting message.",
		code: ['name = input("Enter your name")', 'print("Hello " . name)'],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['print("Hello " + name)'],
			explanation: "String concatenation uses + not . (dot).",
		},
		category: "input-output",
	},
	{
		description:
			"This program asks the user to input their name and then displays a personalized greeting message.",
		code: ['name = imput("Enter your name")', 'print("Hello " + name)'],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ['name = input("Enter your name")'],
			explanation: 'The input function is misspelled as "imput".',
		},
		category: "input-output",
	},
	{
		description:
			"This program extracts the first 3 characters from a string and displays them.",
		code: [
			'text = input("Enter some text")',
			"first3 = text.left(3)",
			"print(frst3)",
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["print(first3)"],
			explanation: 'The variable name "first3" is misspelled as "frst3".',
		},
		category: "input-output",
	},
	{
		description:
			"This program converts a character to its ASCII code and displays it.",
		code: [
			'char = input("Enter a character")',
			"code = ASC(char)",
			'print("ASCII code is"',
			"print(code)",
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ['print("ASCII code is")'],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "input-output",
	},
	{
		description:
			"This program creates a global variable for player lives (starting at 3) and displays it.",
		code: ["lives = 3", 'print("Lives remaining"', "print(lives)"],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['print("Lives remaining")'],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "input-output",
	},
	{
		description:
			"This program reads a number as a string and casts it to a float, then adds 2.5 to it.",
		code: [
			'numStr = input("Enter a decimal number")',
			"numFloat = float(numStr)",
			"result = numFloat + 2.5",
			"print(reslt)",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["print(result)"],
			explanation: 'The variable name "result" is misspelled as "reslt".',
		},
		category: "input-output",
	},
	{
		description:
			"This program generates a random integer between 1 and 6 (like a dice roll) and displays it.",
		code: ["dice = random(1, 6)", 'print("You rolled")', "print(dic)"],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["print(dice)"],
			explanation: 'The variable name "dice" is misspelled as "dic".',
		},
		category: "input-output",
	},
	{
		description:
			"This program asks for an item price and quantity, calculates the total cost, and displays it.",
		code: [
			'price = input("Enter price")',
			'quantity = input("Enter quantity")',
			"total = price * quantity",
			'print("Total cost")',
			"print(totla)",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ["print(total)"],
			explanation: 'The variable name "total" is misspelled as "totla".',
		},
		category: "input-output",
	},
	{
		description:
			"This program calculates a 10% discount on a price and displays the discounted price.",
		code: [
			'price = input("Enter price")',
			"discount = price * 0.1",
			"newprice = price + discount",
			'print("Discounted price is")',
			"print(newprice)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["newprice = price - discount"],
			explanation:
				"The discount should be subtracted from the price, not added to it.",
		},
		category: "operators",
	},	{
		description:
			"This program asks the user to enter a number. It then checks if the number is even or odd and displays the appropriate message.",
		code: [
			'num = input("enter a number")',
			"if num MOD 2 == 0 then",
			'    print("even")',
			"else",
			'    pritn("odd")',
			"endif",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ['print("odd")'],
			explanation: 'The print command is misspelled as "pritn".',
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user to enter two numbers, adds them together, and checks if the total is 10 or more. It should display 'success' if the total is at least 10, or 'warning' if it's less than 10.",
		code: [
			'num1 = input("Enter a number")',
			'num2 = input("Enter a number")',
			"total = num1 + num1",
			"if total >= 10 then",
			'    print("success")',
			"else",
			'    print("warning")',
			"endif",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["total = num1 + num2", "total = num2 + num1"],
			explanation:
				"The calculation adds num1 twice instead of adding num1 and num2 together.",
		},
		category: "selection",
	},
	{
		description:
			"This program asks for a password and checks if it matches 'secret123'. If correct, it displays 'Access granted', otherwise 'Access denied'.",
		code: [
			'password = input("Enter password")',
			'if password = "secret123" then',
			'    print("Access granted")',
			"else",
			'    print("Access denied")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['if password == "secret123" then'],
			explanation:
				"The comparison operator should be == (equality) not = (assignment).",
		},
		category: "selection",
	},

	{
		description: "This program counts from 1 to 5 and displays each number.",
		code: ["for i = 1 to 5", "    print(i)", "endfor", 'print("Done")'],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["next i"],
			explanation: 'For loops should end with "next i" not "endfor".',
		},
		category: "iteration-for",
	},
	{
		description:
			"This program checks if a student has passed an exam. A pass requires a score of 40 or more.",
		code: [
			'score = input("Enter your score")',
			"if score > 40 then",
			'    print("Pass")',
			"else",
			'    print("Fail")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["if score >= 40 then"],
			explanation:
				"The condition should be >= (greater than or equal) to include 40 as a pass.",
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user for their age and checks if they are an adult (18 or over). It should display 'Adult' or 'Minor' accordingly.",
		code: [
			'age = input("Enter your age")',
			"if age >= 18 then",
			'    print("Adult")',
			"els",
			'    print("Minor")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["else"],
			explanation: 'The else keyword is misspelled as "els".',
		},
		category: "selection",
	},

	{
		description:
			"This program displays a welcome message three times using a loop.",
		code: [
			"for count = 1 to 3",
			'    print("Welcome")',
			"endfor",
			'print("Finished"',
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ['print("Finished")'],
			explanation: "The print statement is missing its closing bracket.",
		},
		category: "iteration-for",
	},

	{
		description:
			"This program checks if a number is positive, negative, or zero and displays the appropriate message.",
		code: [
			'num = int(input("Enter a number"))',
			"if num > 0 then",
			'    print("Positive")',
			"else if num < 0 then",
			'    print("Negative")',
			"else",
			'    print("Zero")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["elseif num < 0 then"],
			explanation:
				'The elseif keyword should be written as one word, not "else if".',
		},
		category: "selection",
	},
	{
		description:
			"This program creates a function that returns the square of a number (number multiplied by itself).",
		code: [
			"function square(num)",
			"    result = num * num",
			"    return(result)",
			"endprocedure",
			"answer = square(5)",
			"print(answer)",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["endfunction"],
			explanation:
				'Functions should end with "endfunction", not "endprocedure".',
		},
		category: "subprograms",
	},
	{
		description:
			"This program opens a file called 'data.txt', reads all lines from it, and displays them.",
		code: [
			'f = open("data.txt")',
			"while NOT f.endOfFile()",
			"    print(f.readLine())",
			"endwhile",
			"f.close",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ["f.close()"],
			explanation: "The close subprogram needs brackets to be called correctly.",
		},
		category: "files",
	},
	{
		description:
			"This program generates a random number between 1 and 100 and asks the user to guess it. It tells them if their guess is too high.",
		code: [
			"target = random(1, 100)",
			'guess = input("Guess the number")',
			"if guess > target then",
			'    print("Too low")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "logic",
			corrections: ['print("Too high")'],
			explanation:
				'If the guess is greater than the target, the message should be "Too high" not "Too low".',
		},
		category: "selection",
	},
	{
		description:
			"This program asks for a username and checks if it's at least 5 characters long. If it is, it accepts it, otherwise it rejects it.",
		code: [
			'username = input("Enter username")',
			"if username.length >= 5 then",
			'    print("Username accepted")',
			"else",
			'    print("Username too long")',
			"endif",
		],
		answer: {
			lineNumber: 5,
			errorType: "logic",
			corrections: ['print("Username too short")'],
			explanation:
				'If the username is less than 5 characters, it should say "too short" not "too long".',
		},
		category: "strings",
	},
	{
		description:
			"This program creates an array of 5 scores and assigns the value 100 to the first element (index 0).",
		code: ["array scores[5]", "scores[1] = 100", "print(scores[0])"],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["scores[0] = 100"],
			explanation:
				"To assign to the first element (index 0), use scores[0] not scores[1].",
		},
		category: "arrays",
	},

	{
		description:
			"This program repeatedly asks for a password until the user enters 'admin123'.",
		code: [
			'password = input("Enter password")',
			'while password != "admin123"',
			'    password = input("Try again")',
			"endwhile",
			'print("Access granted")',
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: [
				'while password != "admin123" do',
				'while password != "admin123" then',
			],
			explanation: 'While loops require "do" or "then" after the condition.',
		},
		category: "iteration-while",
	},
	{
		description:
			"This program uses a switch statement to display a message based on the day of the week. For 'Mon' it should display 'Monday'.",
		code: [
			'day = input("Enter day")',
			"switch day:",
			'    case "Mon"',
			'        print("Monday")',
			'    case "Tue":',
			'        print("Tuesday")',
			"endswitch",
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ['case "Mon":'],
			explanation: "Each case statement must end with a colon.",
		},
		category: "switch",
	},
	{
		description:
			"This program calculates the perimeter of a square by multiplying the side length by 4.",
		code: [
			'side = input("Enter side length")',
			"perimeter = side + 4",
			'print("Perimeter is")',
			"print(perimeter)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["perimeter = side * 4"],
			explanation:
				"The perimeter formula requires multiplication (*), not addition (+).",
		},
		category: "operators",
	},
	{
		description:
			"This program checks if a person is eligible to vote (age 18 or over) and displays 'Eligible' or 'Not eligible'.",
		code: [
			'age = input("Enter your age")',
			"if age >= 18",
			'    print("Eligible")',
			"else",
			'    print("Not eligible")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["if age >= 18 then"],
			explanation: 'If statements require "then" after the condition.',
		},
		category: "selection",
	},

	{
		description:
			"This program uses a do-until loop to keep asking for a number until the user enters a number greater than 10.",
		code: [
			"do",
			'    num = input("Enter a number greater than 10")',
			"while num > 10",
			'print("Thank you")',
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["until num > 10"],
			explanation: 'Do-until loops should end with "until" not "while".',
		},
		category: "iteration-do-until",
	},
	{
		description:
			"This program extracts the first 3 characters from a string and displays them.",
		code: [
			'text = input("Enter some text")',
			"first3 = text.right(3)",
			"print(first3)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["first3 = text.left(3)"],
			explanation: "To get the first 3 characters, use left(3) not right(3).",
		},
		category: "strings",
	},
	{
		description:
			"This program converts a character to its ASCII code and displays it.",
		code: [
			'char = input("Enter a character")',
			"code = CHR(char)",
			'print("ASCII code is")',
			"print(code)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["code = ASC(char)"],
			explanation:
				"ASC converts a character to ASCII code; CHR converts ASCII code to character.",
		},
		category: "strings",
	},
	{
		description:
			"This program creates a procedure that displays 'Hello World' three times.",
		code: [
			"procedure greet()",
			"    for i = 1 to 3",
			'        print("Hello World")',
			"    next i",
			"endfunction",
			"greet()",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ["endprocedure"],
			explanation:
				'Procedures should end with "endprocedure", not "endfunction".',
		},
		category: "subprograms",
	},
	{
		description:
			"This program checks if a number is divisible by 3 by using the MOD operator. If there's no remainder, it displays 'Divisible by 3'.",
		code: [
			'num = input("Enter a number")',
			"if num MOD 3 = 0 then",
			'    print("Divisible by 3")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["if num MOD 3 == 0 then"],
			explanation:
				"The comparison operator should be == (equality) not = (assignment).",
		},
		category: "selection",
	},
	{
		description: "This program converts a name to uppercase and displays it.",
		code: [
			'name = input("Enter your name")',
			"upperName = name.lower",
			"print(upperName)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["upperName = name.upper"],
			explanation: "To convert to uppercase, use .upper not .lower.",
		},
		category: "strings",
	},
	{
		description:
			"This program calculates how many weeks are in a given number of days by dividing the days by 7.",
		code: [
			'days = input("Enter number of days")',
			"weeks = days MOD 7",
			'print("Number of weeks")',
			"print(weeks)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["weeks = days DIV 7"],
			explanation:
				"DIV gives the quotient (whole number division); MOD gives the remainder.",
		},
		category: "operators",
	},
	{
		description:
			"This program creates a global variable for player lives (starting at 3) and displays it.",
		code: ["lives == 3", 'print("Lives remaining")', "print(lives)"],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ["lives = 3"],
			explanation:
				"Variable assignment uses = (single equals) not == (double equals for comparison).",
		},
		category: "variables",
	},
	{
		description:
			"This program asks for two numbers and displays which one is larger. If they're equal, it displays 'Equal'.",
		code: [
			'num1 = input("Enter first number")',
			'num2 = input("Enter second number")',
			"if num1 > num2 then",
			'    print("First is larger")',
			"elseif num1 > num2 then",
			'    print("Second is larger")',
			"else",
			'    print("Equal")',
			"endif",
		],
		answer: {
			lineNumber: 5,
			errorType: "logic",
			corrections: ["elseif num1 < num2 then", "elseif num2 > num1 then"],
			explanation:
				"The second condition should check if num1 is less than num2, not greater than.",
		},
		category: "selection",
	},

	{
		description:
			"This program extracts characters 3 to 6 from a string using substring and displays them.",
		code: [
			'text = input("Enter some text")',
			"extract = text.substring(3, 6)",
			"print(extact)",
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["print(extract)"],
			explanation: 'The variable name "extract" is misspelled as "extact".',
		},
		category: "strings",
	},
	{
		description:
			"This program calculates 2 to the power of 5 and displays the result.",
		code: [
			"base = 2",
			"exponent = 5",
			"result = base * exponent",
			"print(result)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["result = base ^ exponent"],
			explanation: "The power operator is ^ (caret), not * (multiplication).",
		},
		category: "operators",
	},
	{
		description:
			"This program writes a line of text to a file called 'output.txt'.",
		code: [
			'f = newFile("output.txt")',
			'f.writeLine("Hello File")',
			"f.close()",
		],
		answer: {
			lineNumber: 1,
			errorType: "logic",
			corrections: ['f = open("output.txt")'],
			explanation: "Use open() to open files, not newFile().",
		},
		category: "files",
	},
	{
		description:
			"This program casts a boolean value True to a string and displays it.",
		code: ["value = True", "strValue = int(value)", "print(strValue)"],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["strValue = str(value)"],
			explanation: "Use str() to cast to a string, not int().",
		},
		category: "variables",
	},
	{
		description:
			"This program checks if a student's grade is A, B, C, or D based on their score. 70+ is A, 60+ is B, 50+ is C, 40+ is D.",
		code: [
			'score = input("Enter score")',
			"if score >= 70 then",
			'    print("Grade A")',
			"elseif score >= 60 then",
			'    print("Grade B")',
			"elseif score >= 50 then",
			'    print("Grade C")',
			"elseif score <= 40 then",
			'    print("Grade D")',
			"endif",
		],
		answer: {
			lineNumber: 8,
			errorType: "logic",
			corrections: ["elseif score >= 40 then"],
			explanation:
				"The condition should be >= 40 (greater than or equal), not <= 40.",
		},
		category: "selection",
	},
	// VARIATIONS - 40 more programs based on the originals
	{
		description:
			"This program asks the user to enter a number. It then checks if the number is even or odd and displays the appropriate message.",
		code: [
			'num = input("enter a number")',
			"if num MOD 2 = 0 then",
			'    print("even")',
			"else",
			'    print("odd")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["if num MOD 2 == 0 then"],
			explanation:
				"The comparison operator should be == (equality) not = (assignment).",
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user to enter a number. It then checks if the number is even or odd and displays the appropriate message.",
		code: [
			'num = input("enter a number")',
			"if num MOD 2 == 0 then",
			'    print("even")',
			"else",
			'    print("odd")',
			"end if",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["endif"],
			explanation: 'The endif keyword should be one word, not "end if".',
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user to enter two numbers, adds them together, and checks if the total is 10 or more. It should display 'success' if the total is at least 10, or 'warning' if it's less than 10.",
		code: [
			'num1 = input("Enter a number")',
			'num2 = input("Enter a number")',
			"total = num1 - num2",
			"if total >= 10 then",
			'    print("success")',
			"else",
			'    print("warning")',
			"endif",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["total = num1 + num2", "total = num2 + num1"],
			explanation:
				"The calculation subtracts num2 from num1 instead of adding them together.",
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user to enter two numbers, adds them together, and checks if the total is 10 or more. It should display 'success' if the total is at least 10, or 'warning' if it's less than 10.",
		code: [
			'num1 = input("Enter a number")',
			'num2 = input("Enter a number")',
			"total = num1 + num2",
			"if total > 10 then",
			'    print("success")',
			"else",
			'    print("warning")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "logic",
			corrections: ["if total >= 10 then"],
			explanation:
				"The condition should be >= (greater than or equal) to include 10 as success.",
		},
		category: "selection",
	},
	{
		description:
			"This program asks for a password and checks if it matches 'secret123'. If correct, it displays 'Access granted', otherwise 'Access denied'.",
		code: [
			'password = input("Enter password")',
			'if password == "secret123" then',
			'    print("Access granted")',
			"els",
			'    print("Access denied")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["else"],
			explanation: 'The else keyword is misspelled as "els".',
		},
		category: "selection",
	},
	{
		description:
			"This program calculates the area of a rectangle by multiplying length and width, then displays the result.",
		code: [
			'length = input("Enter length")',
			'width = input("Enter width")',
			"area = length + width",
			'print("Area is")',
			"print(area)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["area = length * width", "area = width * length"],
			explanation:
				"The area formula requires multiplication (*), not addition (+).",
		},
		category: "operators",
	},

	{
		description: "This program counts from 1 to 5 and displays each number.",
		code: ["for i = 1 to 5", "    print(i)", "endfor", 'print("Done")'],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["next i"],
			explanation: 'For loops should end with "next i" not "endfor".',
		},
		category: "iteration-for",
	},
	{
		description: "This program counts from 1 to 5 and displays each number.",
		code: ["for i = 1 to 5 do", "    print(i)", "next i", 'print("Done")'],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ["for i = 1 to 5"],
			explanation:
				'For loops should not have "do" after the range specification.',
		},
		category: "iteration-for",
	},

	{
		description:
			"This program checks if a student has passed an exam. A pass requires a score of 40 or more.",
		code: [
			'score = input("Enter your score")',
			"if score > 39 then",
			'    print("Pass")',
			"else",
			'    print("Fail")',
			"end if",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["endif"],
			explanation: 'The endif keyword should be one word, not "end if".',
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user for their age and checks if they are an adult (18 or over). It should display 'Adult' or 'Minor' accordingly.",
		code: [
			'age = input("Enter your age")',
			"if age > 18 then",
			'    print("Adult")',
			"else",
			'    print("Minor")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["if age >= 18 then"],
			explanation:
				"The condition should be >= (greater than or equal) to include 18 as adult.",
		},
		category: "selection",
	},
	{
		description:
			"This program calculates a 10% discount on a price and displays the discounted price.",
		code: [
			'price = input("Enter price")',
			"discount = price * 0.01",
			"newprice = price - discount",
			'print("Discounted price is")',
			"print(newprice)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["discount = price * 0.1"],
			explanation: "10% is 0.1, not 0.01 (which is 1%).",
		},
		category: "operators",
	},
	{
		description:
			"This program calculates a 10% discount on a price and displays the discounted price.",
		code: [
			'price = input("Enter price")',
			"discount = price / 10",
			"newprice = discount - price",
			'print("Discounted price is")',
			"print(newprice)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["newprice = price - discount"],
			explanation:
				"The discount should be subtracted from the price, not the other way around.",
		},
		category: "operators",
	},
	{
		description:
			"This program calculates the average of three test scores by adding them together and dividing by 3.",
		code: [
			'score1 = input("Enter score 1")',
			'score2 = input("Enter score 2")',
			'score3 = input("Enter score 3")',
			"average = (score1 + score2 + score3) * 3",
			'print("Average is")',
			"print(average)",
		],
		answer: {
			lineNumber: 4,
			errorType: "logic",
			corrections: ["average = (score1 + score2 + score3) / 3"],
			explanation:
				"The average formula requires division (/), not multiplication (*).",
		},
		category: "operators",
	},
	{
		description:
			"This program checks if a number is positive, negative, or zero and displays the appropriate message.",
		code: [
			'num = int(input("Enter a number"))',
			"if num > 0 then",
			'    print("Positive")',
			"elseif num = 0 then",
			'    print("Zero")',
			"else",
			'    print("Negative")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["elseif num == 0 then"],
			explanation:
				"The comparison operator should be == (equality) not = (assignment).",
		},
		category: "selection",
	},
	{
		description:
			"This program creates a function that returns the square of a number (number multiplied by itself).",
		code: [
			"function square(num)",
			"    result = num + num",
			"    return(result)",
			"endfunction",
			"answer = square(5)",
			"print(answer)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["result = num * num"],
			explanation: "Squaring requires multiplication (*), not addition (+).",
		},
		category: "subprograms",
	},
	{
		description:
			"This program creates a function that returns the square of a number (number multiplied by itself).",
		code: [
			"function square(num)",
			"    result = num * num",
			"    return res",
			"endfunction",
			"answer = square(5)",
			"print(answer)",
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["return result", "return (result)"],
			explanation:
				"The return statement needs to return the correct variable.",
		},
		category: "subprograms",
	},
	{
		description:
			"This program opens a file called 'data.txt', reads all lines from it, and displays them.",
		code: [
			'f = open("data.txt")',
			"while NOT f.endOfFile() do",
			"    print(f.readLine())",
			"enddo",
			"f.close()",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["endwhile"],
			explanation: 'While loops should end with "endwhile", not "enddo".',
		},
		category: "files",
	},
	{
		description:
			"This program opens a file called 'data.txt', reads all lines from it, and displays them.",
		code: [
			'f = open("data.txt")',
			"while NOT f.endOfFile() do",
			"    line = f.readLine()",
			"    print(line)",
			"endwhile",
			"close(f)",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["f.close()"],
			explanation:
				"The close subprogram must be called on the f variable using f.close().",
		},
		category: "files",
	},
	{
		description:
			"This program generates a random number between 1 and 100 and asks the user to guess it. It tells them if their guess is too high.",
		code: [
			"target = random(1, 100)",
			'guess = input("Guess the number")',
			"if guess < target then",
			'    print("Too high")',
			"endif",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["if guess > target then"],
			explanation:
				'If the guess is less than the target, the message should be "Too low" not "Too high".',
		},
		category: "selection",
	},
	{
		description:
			"This program asks for a username and checks if it's at least 5 characters long. If it is, it accepts it, otherwise it rejects it.",
		code: [
			'username = input("Enter username")',
			"if username.length > 5 then",
			'    print("Username accepted")',
			"else",
			'    print("Username too short")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["if username.length >= 5 then"],
			explanation:
				"The condition should be >= to accept usernames with exactly 5 characters.",
		},
		category: "strings",
	},
	{
		description:
			"This program creates an array of 5 scores and assigns the value 100 to the first element (index 0).",
		code: ["array scores(5)", "scores[0] = 100", "print(scores[0])"],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ["array scores[5]"],
			explanation:
				"Array declaration uses square brackets [], not round brackets ().",
		},
		category: "arrays",
	},
	{
		description:
			"This program creates an array of 5 scores and assigns the value 100 to the first element (index 0).",
		code: ["array scores[5]", "scores[0] == 100", "print(scores[0])"],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["scores[0] = 100"],
			explanation:
				"Variable assignment uses = (single equals) not == (double equals for comparison).",
		},
		category: "arrays",
	},
	{
		description:
			"This program casts a string '42' to an integer and adds 8 to it, then displays the result.",
		code: ['num = "42"', "num = str(num)", "result = num + 8", "print(result)"],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["num = int(num)"],
			explanation:
				"Use int() to cast to an integer, not str() which casts to a string.",
		},
		category: "variables",
	},
	{
		description:
			"This program repeatedly asks for a password until the user enters 'admin123'.",
		code: [
			'password = input("Enter password")',
			'while password == "admin123" do',
			'    password = input("Try again")',
			"endwhile",
			'print("Access granted")',
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ['while password != "admin123" do'],
			explanation:
				'The loop should continue while the password is NOT equal (!=) to "admin123".',
		},
		category: "iteration-while",
	},
	{
		description:
			"This program uses a switch statement to display a message based on the day of the week. For 'Mon' it should display 'Monday'.",
		code: [
			'day = input("Enter day")',
			"switch day:",
			'    case "Mon":',
			'        print("Monday")',
			'    case "Tue":',
			'        print("Tuesday")',
			"endcase",
		],
		answer: {
			lineNumber: 7,
			errorType: "syntax",
			corrections: ["endswitch"],
			explanation:
				'Switch statements should end with "endswitch", not "endcase".',
		},
		category: "switch",
	},
	{
		description:
			"This program calculates the perimeter of a square by multiplying the side length by 4.",
		code: [
			'side = input("Enter side length")',
			"perimeter = side * side",
			'print("Perimeter is")',
			"print(perimeter)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["perimeter = side * 4"],
			explanation:
				"The perimeter formula is side * 4, not side * side (which would be area).",
		},
		category: "operators",
	},
	{
		description:
			"This program checks if a person is eligible to vote (age 18 or over) and displays 'Eligible' or 'Not eligible'.",
		code: [
			'age = input("Enter your age")',
			"if age > 18 then",
			'    print("Eligible")',
			"else",
			'    print("Not eligible")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["if age >= 18 then"],
			explanation:
				"The condition should be >= (greater than or equal) to include 18 as eligible.",
		},
		category: "selection",
	},
	{
		description:
			"This program creates a constant for VAT rate (20%) and calculates the VAT on a price, then displays the total price including VAT.",
		code: [
			"VAT = 0.2",
			'price = input("Enter price")',
			"vatAmount = price * VAT",
			"total = price + vatAmount",
			'print("Total with VAT")',
			"print(total)",
		],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ["const VAT = 0.2"],
			explanation: "Constants must be declared with the const keyword.",
		},
		category: "variables",
	},
	{
		description:
			"This program creates a constant for VAT rate (20%) and calculates the VAT on a price, then displays the total price including VAT.",
		code: [
			"const VAT = 0.2",
			'price = input("Enter price")',
			"vatAmount = price * VAT",
			"total = price - vatAmount",
			'print("Total with VAT")',
			"print(total)",
		],
		answer: {
			lineNumber: 4,
			errorType: "logic",
			corrections: ["total = price + vatAmount", "total = vatAmount + price"],
			explanation: "VAT should be added to the price, not subtracted.",
		},
		category: "operators",
	},
	{
		description:
			"This program uses a do-until loop to keep asking for a number until the user enters a number greater than 10.",
		code: [
			"do",
			'    num = input("Enter a number greater than 10")',
			"until num <= 10",
			'print("Thank you")',
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["until num > 10"],
			explanation:
				"The loop should continue until the number is greater than 10, not less than or equal.",
		},
		category: "iteration-do-until",
	},
	{
		description:
			"This program extracts the first 3 characters from a string and displays them.",
		code: [
			'text = input("Enter some text")',
			"first3 = text.substring(0, 3)",
			"print(first3)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["first3 = text.left(3)"],
			explanation:
				"Use the left() subprogram to get the first characters, not substring().",
		},
		category: "strings",
	},

	{
		description:
			"This program creates a procedure that displays 'Hello World' three times.",
		code: [
			"procedure greet()",
			"    for i = 1 to 3",
			'        print("Hello World")',
			"    endfor",
			"endprocedure",
			"greet()",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["next i"],
			explanation: 'For loops should end with "next i" not "endfor".',
		},
		category: "subprograms",
	},
	{
		description:
			"This program creates a procedure that displays 'Hello World' three times.",
		code: [
			"procedure greet",
			"    for i = 1 to 3",
			'        print("Hello World")',
			"    next i",
			"endprocedure",
			"greet()",
		],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ["procedure greet()"],
			explanation:
				"Procedure declarations require brackets even with no parameters.",
		},
		category: "subprograms",
	},
	{
		description:
			"This program checks if a number is divisible by 3 by using the MOD operator. If there's no remainder, it displays 'Divisible by 3'.",
		code: [
			'num = input("Enter a number")',
			"if num DIV 3 == 0 then",
			'    print("Divisible by 3")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["if num MOD 3 == 0 then"],
			explanation: "MOD gives the remainder; DIV gives the quotient.",
		},
		category: "selection",
	},
	{
		description: "This program converts a name to uppercase and displays it.",
		code: [
			'name = input("Enter your name")',
			"upperName = name.upper()",
			"print(upperName)",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["upperName = name.upper"],
			explanation: "The upper property does not use brackets.",
		},
		category: "strings",
	},
	{
		description:
			"This program calculates how many weeks are in a given number of days by dividing the days by 7.",
		code: [
			'days = input("Enter number of days")',
			"weeks = days / 7",
			'print("Number of weeks")',
			"print(weeks)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["weeks = days DIV 7"],
			explanation:
				"Use DIV for integer division to get whole weeks, not / which gives decimal.",
		},
		category: "operators",
	},

	{
		description:
			"This program asks for two numbers and displays which one is larger. If they're equal, it displays 'Equal'.",
		code: [
			'num1 = input("Enter first number")',
			'num2 = input("Enter second number")',
			"if num1 > num2 then",
			'    print("First is larger")',
			"elseif num1 == num2 then",
			'    print("Equal")',
			"else",
			'    print("Second is larger")',
			"endif",
		],
		answer: {
			lineNumber: 5,
			errorType: "logic",
			corrections: ["elseif num1 < num2 then", "elseif num2 > num1 then"],
			explanation:
				"The elseif should check if num1 is less than num2 for the second branch.",
		},
		category: "selection",
	},
	{
		description:
			"This program asks for a sentence and displays how many characters are in it.",
		code: [
			'sentence = input("Enter a sentence")',
			"length = sentence.length",
			'print("Character count")',
			"print(length)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["length = len(sentence)"],
			explanation:
				"Use the len() function to get string length, not the .length property.",
		},
		category: "strings",
	},
	{
		description:
			"This program extracts characters 3 to 6 from a string using substring and displays them.",
		code: [
			'text = input("Enter some text")',
			"extract = substring(3, 6)",
			"print(extract)",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["extract = text.substring(3, 6)"],
			explanation:
				"The substring subprogram must be called on the text variable.",
		},
		category: "strings",
	},
	{
		description:
			"This program calculates 2 to the power of 5 and displays the result.",
		code: [
			"base = 2",
			"exponent = 5",
			"result = base + exponent",
			"print(result)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["result = base ^ exponent"],
			explanation: "The power operator is ^ (caret), not + (addition).",
		},
		category: "operators",
	},
	{
		description:
			"This program writes a line of text to a file called 'output.txt'.",
		code: ['f = open("output.txt")', 'f.WriteLine("Hello File")', "f.close()"],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['f.writeLine("Hello File")'],
			explanation:
				"The subprogram name should be writeLine (camelCase), not WriteLine (capital W).",
		},
		category: "files",
	},
	{
		description:
			"This program casts a boolean value True to a string and displays it.",
		code: ["value = True", "strValue = int(value)", "print(strValue)"],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["strValue = str(value)"],
			explanation:
				"Use str() to cast to a string, not int() which casts to an integer.",
		},
		category: "variables",
	},
	{
		description:
			"This program checks if a student's grade is A, B, C, or D based on their score. 70+ is A, 60+ is B, 50+ is C, 40+ is D.",
		code: [
			'score = input("Enter score")',
			"if score >= 70 then",
			'    print("Grade A")',
			"elif score >= 60 then",
			'    print("Grade B")',
			"elseif score >= 50 then",
			'    print("Grade C")',
			"elseif score >= 40 then",
			'    print("Grade D")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["elseif score >= 60 then"],
			explanation: 'The keyword should be "elseif" not "elif".',
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user to enter a number. It then checks if the number is even or odd and displays the appropriate message.",
		code: [
			'num = input("enter a number")',
			"if num MOD 2 == 0 then",
			'    print("even")',
			"elseif",
			'    print("odd")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["else"],
			explanation: 'Should use "else" not "elseif" when there is no condition.',
		},
		category: "selection",
	},
	{
		description:
			"This program asks the user to enter two numbers, adds them together, and checks if the total is 10 or more. It should display 'success' if the total is at least 10, or 'warning' if it's less than 10.",
		code: [
			'num1 = input("Enter a number")',
			'num2 = input("Enter a number")',
			"total = num1 + num2",
			"if total >= 10",
			'    print("success")',
			"else",
			'    print("warning")',
			"endif",
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ["if total >= 10 then"],
			explanation: 'If statements require "then" after the condition.',
		},
		category: "selection",
	},
	{
		description: "This program counts from 1 to 10 and displays each number.",
		code: [
			"for count = 1 to 10",
			"    print(count)",
			"next counter",
			'print("Finished")',
		],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["next count"],
			explanation:
				'The loop variable name in "next" must match the one in the for statement.',
		},
		category: "iteration-for",
	},
	{
		description:
			"This program creates a procedure that adds two numbers and displays the result.",
		code: [
			"procedure addNumbers(a, b)",
			"    total = a + b",
			"    print(total)",
			"endprocedure",
			"addNumbers(5, 7",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ["addNumbers(5, 7)"],
			explanation: "The procedure call is missing its closing bracket.",
		},
		category: "subprograms",
	},
	{
		description:
			"This program creates a function that doubles a number and returns the result.",
		code: [
			"function double(num)",
			"    result = num * 2",
			"    print(result)",
			"endfunction",
			"answer = double(10)",
			"print(answer)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["return(result)"],
			explanation: "Functions must return a value, not print it.",
		},
		category: "subprograms",
	},
	{
		description:
			"This program repeatedly asks for a PIN until the user enters '1234'.",
		code: [
			'pin = input("Enter PIN")',
			"do",
			'    pin = input("Try again")',
			'until pin = "1234"',
			'print("Correct")',
		],
		answer: {
			lineNumber: 4,
			errorType: "syntax",
			corrections: ['until pin == "1234"'],
			explanation:
				"The comparison operator should be == (equality) not = (assignment).",
		},
		category: "iteration-do-until",
	},
	{
		description:
			"This program checks if a number is between 1 and 100 inclusive and displays an appropriate message.",
		code: [
			'num = input("Enter a number")',
			"if num >= 1 AND num <= 100 then",
			'    print("Valid")',
			"else",
			'    print("Invalid")',
			"end",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["endif"],
			explanation: 'If statements must end with "endif" not "end".',
		},
		category: "selection",
	},
	{
		description:
			"This program extracts the last 4 characters from a string and displays them.",
		code: [
			'text = input("Enter text")',
			"last4 = text.left(4)",
			"print(last4)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["last4 = text.right(4)"],
			explanation: "Use right() to get the last characters, not left().",
		},
		category: "strings",
	},
	{
		description: "This program converts text to lowercase and displays it.",
		code: [
			'text = input("Enter text")',
			"lowerText = text.lowercase",
			"print(lowerText)",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["lowerText = text.lower"],
			explanation: 'The property name is "lower" not "lowercase".',
		},
		category: "strings",
	},
	{
		description:
			"This program creates a 2D array for storing a 3x3 grid and sets position [0,0] to 'X'.",
		code: ["array grid[3][3]", 'grid[0,0] = "X"', "print(grid[0,0])"],
		answer: {
			lineNumber: 1,
			errorType: "syntax",
			corrections: ["array grid[3, 3]"],
			explanation:
				"Array dimensions should be separated by a comma, not separate brackets.",
		},
		category: "arrays",
	},

	{
		description: "This program calculates how many times 5 goes into 17.",
		code: ["num = 17", "num2 = 5", "answer = num MOD num2", "print(answer)"],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["answer = num DIV num2"],
			explanation:
				"DIV gives the quotient (how many times it goes in); MOD gives the remainder.",
		},
		category: "operators",
	},
	{
		description: "This program calculates the remainder when dividing 17 by 5.",
		code: ["num = 17", "num2 = 5", "answer = num DIV num2", "print(answer)"],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["answer = num MOD num2"],
			explanation:
				"MOD gives the remainder; DIV gives the quotient (how many times it goes in).",
		},
		category: "operators",
	},
	{
		description:
			"This program converts the ASCII code 65 to its corresponding character and displays it.",
		code: ["code = 65", "character = ASC(code)", "print(character)"],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["character = CHR(code)"],
			explanation:
				"CHR converts code to character; ASC converts character to code.",
		},
		category: "strings",
	},
	{
		description:
			"This program converts the character 'A' to its ASCII code and displays it.",
		code: ['char = "A"', "asciiCode = CHR(char)", "print(asciiCode)"],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["asciiCode = ASC(char)"],
			explanation:
				"ASC converts character to code; CHR converts code to character.",
		},
		category: "strings",
	},
	{
		description:
			"This program opens a file, writes 'Hello' to it, and closes it.",
		code: ['f = open("output.txt")', 'f.writeLine("Hello")', "close()"],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["f.close()"],
			explanation: "The close subprogram must be called on the f variable.",
		},
		category: "files",
	},
	{
		description:
			"This program creates a new file called 'data.txt' and writes a line to it.",
		code: ['f = newFile("data.txt")', 'f.writeLine("First line")', "f.close"],
		answer: {
			lineNumber: 3,
			errorType: "syntax",
			corrections: ["f.close()"],
			explanation: "Subprograms require brackets even with no arguments.",
		},
		category: "files",
	},

	{
		description:
			"This program checks if it's the weekend (Saturday or Sunday) and displays 'Weekend!' otherwise 'Weekday'.",
		code: [
			'day = input("Enter day")',
			'if day == "Saturday" OR day = "Sunday" then',
			'    print("Weekend!")',
			"else",
			'    print("Weekday")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['if day == "Saturday" OR day == "Sunday" then'],
			explanation: "Both comparisons in an OR expression must use == not =.",
		},
		category: "selection",
	},
	{
		description:
			"This program checks if a password is NOT equal to 'admin' and displays 'Access denied' if true.",
		code: [
			'password = input("Enter password")',
			'if NOT password = "admin" then',
			'    print("Access denied")',
			"endif",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ['if NOT password == "admin" then'],
			explanation:
				"The comparison operator should be == (equality) not = (assignment).",
		},
		category: "selection",
	},
	{
		description:
			"This program calculates the cube of a number (number to the power of 3).",
		code: [
			'num = input("Enter a number")',
			"cube = num * 3",
			'print("Cube is")',
			"print(cube)",
		],
		answer: {
			lineNumber: 2,
			errorType: "logic",
			corrections: ["cube = num ^ 3"],
			explanation: "The power operator is ^ (caret), not * (multiplication).",
		},
		category: "operators",
	},
	{
		description:
			"This program extracts a substring from position 2 to position 5 (inclusive) from a string.",
		code: [
			'text = input("Enter text")',
			"sub = text.substring(2 5)",
			"print(sub)",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["sub = text.substring(2, 5)"],
			explanation: "Subprogram arguments must be separated by a comma.",
		},
		category: "strings",
	},
	{
		description:
			"This program counts from 10 down to 1 and displays each number (countdown).",
		code: ["for i = 10 to 1", "    print(i)", "next i", 'print("Blast off!")'],
		answer: {
			lineNumber: 1,
			errorType: "logic",
			corrections: ["for i = 10 to 1 step -1"],
			explanation: 'For loops counting down require "step -1".',
		},
		category: "iteration-for",
	},
	{
		description:
			"This program checks if a year is a leap year (divisible by 4) and displays an appropriate message.",
		code: [
			'year = input("Enter year")',
			"if year MOD 4 == 0 then",
			'    print("Leap year")',
			"else",
			'    print("Not a leap year")',
			"end if",
		],
		answer: {
			lineNumber: 6,
			errorType: "syntax",
			corrections: ["endif"],
			explanation:
				'If statements must end with "endif" as one word, not "end if".',
		},
		category: "selection",
	},
	{
		description:
			"This program casts a number to a string and displays it with text.",
		code: [
			"num = 42",
			"numStr = string(num)",
			'print("The number is " + numStr)',
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["numStr = str(num)"],
			explanation: 'The function name is "str" not "string".',
		},
		category: "variables",
	},
	{
		description:
			"This program calculates the area of a circle using the formula π × r².",
		code: [
			"const pi = 3.14",
			'radius = input("Enter radius")',
			"area = pi * radius",
			'print("Area is")',
			"print(area)",
		],
		answer: {
			lineNumber: 3,
			errorType: "logic",
			corrections: ["area = pi * radius * radius", "area = pi * radius ^ 2"],
			explanation:
				"The formula for circle area requires radius squared (r²), not just radius.",
		},
		category: "operators",
	},
	{
		description:
			"This program uses a switch statement to display the number of days in a month.",
		code: [
			'month = input("Enter month")',
			"switch month",
			'    case "Jan":',
			'        print("31 days")',
			'    case "Feb":',
			'        print("28 days")',
			"endswitch",
		],
		answer: {
			lineNumber: 2,
			errorType: "syntax",
			corrections: ["switch month:"],
			explanation: "Switch statements require a colon after the variable.",
		},
		category: "switch",
	},
	{
		description:
			"This program creates an array of names and displays the second element (index 1).",
		code: [
			"array names[3]",
			'names[0] = "Alice"',
			'names[1] = "Bob"',
			'names[2] = "Charlie"',
			"print(names(1))",
		],
		answer: {
			lineNumber: 5,
			errorType: "syntax",
			corrections: ["print(names[1])"],
			explanation:
				"Array elements are accessed with square brackets [], not round brackets ().",
		},
		category: "arrays",
	},
];
