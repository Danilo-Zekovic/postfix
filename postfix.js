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
  this.top = [];
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.getToken = getToken;
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

function getToken() {
  print("getToken");
  for (var i = 0; i<input.length; ++i){
    var x = input.charAt(i); 
    print(x);
    // if
  }
}







// prompt the user for expresion
var input = readline();
print(input);
var foo = new Stack();


foo.getToken(input);


var j = 2;
var s = 3;
var so = j.concat(s);

print("the end");

