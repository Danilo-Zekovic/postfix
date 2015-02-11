/*
 * Danilo Zekovic
 * 1/28/2015
 * A postfix expression evaluator works on arithmetic expressions taking
 * the following form: op1 op2 operator
 */

//------------------------------------------
// stack constructor
function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.length = length;
}

function push(element) {
  this.dataStore[this.top++] = element;
}

function pop() {
  return this.dataStore[--this.top];
}

function peek() {
  return this.dataStore[this.top-1];
}

function length() {
  return this.top;
}

function clear() {
  this.top = 0;
}
//-------------------------------------------
// function to turn infix to postfix
function getToken() {

  // for menaging multy digit numbers
  var number = "";
  var postStr = "";   // create an empty string to store final values
  // stack to push operators and pop them when needed
  var operators = new Stack(); 

  // loop through all the characters in inputed string
  for (var i = 0; i<input.length; ++i){
    var x = input.charAt(i); // get character by character

    // separate numbers from other characters
    if( x == " "){
      // do nothing 
      continue;
    // if it is not a number
    }else if(isNaN(x)){
      if(number != ""){postStr = postStr + " " + number;}
      postStr = character(operators,x,postStr);
      number = "";
    }else{         // if it is
      number = number + x;
    }    // end if-else
  }    // end for 

  if(number!=""){postStr = postStr + " " + number;}

  // empty the stack and add all of the operators to the string
  while (operators.length() >  0){
    postStr = postStr + " " + operators.pop();
  }

  return postStr;
}



// returns the precedence level of operation
function sVal(symbol){
  if(symbol == '+' || symbol == '-'){
    return 0;
  }else if (symbol == '*' || symbol == '/'){
    return 1;
  }
}

// function to deal with operations
// 
var character = function(operators, x, postStr){
  // if symbol is not pushed or added to string it stays true 
  var notSorted = true; 

  // loop until character is sorted
  while (notSorted){

      // if stack empty or "(" is at the top push operator to stack
      if (operators.length() == 0 || operators.peek() == '('){  //2
	operators.push(x);
	notSorted = false;
      // if "(" push it to stack
      }else if (x == '('){   // 3
        operators.push(x);
        notSorted = false;	
      // if ")" pop the stack til "("
      }else if (x == ')') {       //4
	var y = operators.pop();
        while( y != '('){
	  postStr = postStr + " " + y;
	  y = operators.pop();
	}
	notSorted = false;
      // if incoming symbol has higher precedence then the top of the stack
      // push it to the stack
      }else if (sVal(operators.peek()) < sVal(x) ){     // 5
	operators.push(x);
	notSorted = false;
      // if incoming symbo has same precedence as the top of the stack
      // pop it and then push the new one
      }else if(sVal(operators.peek()) == sVal(x)){	      //6
	postStr = postStr + " " + operators.pop();
	operators.push(x);
	notSorted = false;
      // if the incoming symbol has lower precedence then the top of stack
      // pop the stack til it is not higher anymore and
      // repeat other steps
      }else if(sVal(operators.peek()) > sVal(x)){        // 7
	postStr = postStr + " " + operators.pop();
      } // end else if
  }// end while
      return postStr;
} // end function

// to evaluate the expresion
var evaluate = function(string){

  // array to elements split at space
  var stuff = string.trim().split(" ");
  // stack to push the numbers that will be evaluated
  var evalStack = new Stack();
  // to store the curent element from stuff
  var element = "";

  for (var i = 0; i < stuff.length; i++){
    
    element = stuff[i];

    // test is it a number or not
    if (!isNaN(element)){
      // if it is a number push it to the stack
      evalStack.push(element);
    }else if(element=="*" || element=="+" || element=="-" || element=="/"){
      
      // if it is a operator find the case and evaluate
      var part = 0; // one part of the expression that is evaluated
      switch(element){
        case ("*"):
	  part = evalStack.pop() * evalStack.pop();
	  evalStack.push(part); 
	  break;
	case ("/"):
	  var denominator = evalStack.pop();
	  part = evalStack.pop() / denominator;
	  evalStack.push(part);
	  break;
	case ("+"):
	  part = parseInt(evalStack.pop()) +parseInt(evalStack.pop());
	  evalStack.push(part);
	  break;
	case ("-"):
	  var subtrahend = parseInt(evalStack.pop());
	  part = parseInt(evalStack.pop()) - subtrahend;
	  evalStack.push(part);
	  break;
      }    // end switch
    }    // end if-else
  }    // end for
  return evalStack.pop();
}    // end evaluate

//------------------------------------------------------------------------

// prompt the user for expresion
print("Enter a infix expression: ");
var input = readline();
print("This is user input: " + input);

var expression = getToken(input);

print("Postfix:" + expression);
print("Expresion evaluated: " + evaluate(expression));
print(">>>>>>>>>> the end <<<<<<<<<<");

