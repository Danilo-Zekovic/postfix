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
  //this.getToken = getToken;
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
  print("getToken");
  var number = "";
  var postStr = "";   // create an empty string to store final values
  // stack to push operators and pop them when needed
  var operators = new Stack(); 
  // loop through all the characters in inputed string
  for (var i = 0; i<input.length; ++i){
    var x = input.charAt(i); // get character by character
    print("x: " + x);
    if( x == " "){
      // do nothing 
      continue;
    // if it is not a number
    }else if(isNaN(x)){
      postStr = postStr + " " + number;
      postStr = character(operators,x,postStr);
      number = "";
    }else{         // if it is
      print("is number " + x);
      number = number + x;
    }
  }
  postStr = postStr + " " + number;
  // empty the stack and add all of the operators to the string
  print(operators.length());
  while (operators.length() >  0){
    postStr = postStr + operators.pop();
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
	print(2);
        operators.push(x);
	notSorted = false;
      // if "(" push it to stack
      }else if (x == '('){   // 3
        print(3);
        operators.push(x);
        notSorted = false;	
      // if ")" pop the stack til "("
      }else if (x == ')') {       //4
	print(4);
	var y = operators.pop();
        while( y != '('){
	  postStr = postStr + y;
	  y = operators.pop();
	}
	notSorted = false;
      // if incoming symbol has higher precedence then the top of the stack
      // push it to the stack
      }else if (sVal(operators.peek()) < sVal(x) ){     // 5
	print(5);
        operators.push(x);
	notSorted = false;
      // if incoming symbo has same precedence as the top of the stack
      // pop it and then push the new one
      }else if(sVal(operators.peek()) == sVal(x)){	      //6
	print(6 + operators.peek());
        postStr = postStr + operators.pop();
	print(6.1 + operators.peek() + postStr);
	operators.push(x);
	print(6.2 + operators.peek());
	notSorted = false;
      // if the incoming symbol has lower precedence then the top of stack
      // pop the stack til it is not higher anymore and
      // repeat other steps
      }else if(sVal(operators.peek()) > sVal(x)){        // 7
	print(7);
        print(7.1);
	postStr = postStr + operators.pop();
      } // end else if
  }// end while
      return postStr;
} // end function




// prompt the user for expresion
var input = readline();
print(input);
//var foo = new Stack();


//foo.getToken(input);
var foo = getToken(input);
print(foo);
print("the end");

