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

function getToken() {
  print("getToken");
  var postStr = "";
  var operators = new Stack();
  for (var i = 0; i<input.length; ++i){
    var x = input.charAt(i); 
    print("x: " + x);
    // if it is not a number
    if(isNaN(x)){
      
      if (operators.length() == 0 || operators.peek() == '('){  //2
	print(2);
        operators.push(x);
      }else if (x == '('){   // 3
        print(3);
        operators.push(x); 
      }else if (x == ')') {       //4
	print(4);
	var y = operators.pop();
        while( y != '('){
	  postStr = postStr + y;
	  y = operators.pop();
	}
      }else if (sVal(operators.peek()) < sVal(x) ){     // 5
	print(5);
        operators.push(x);
      }else if(sVal(operators.peek()) == sVal(x)){	      //6
	print(6 + operators.peek());
        postStr == postStr + operators.pop();
	print(6.1 + operators.peek() + postStr);
	operators.push(x);
	print(6.2 + operators.peek());
      }else if(sVal(operators.peek()) > sVal(x)){        // 7
	print(7);
        while(sVal(operators.peek()) > sVal(x) && operators.length != 0){
	  print(7.1);
	  postStr = postStr + operators.pop();
	}
	operators.push(x);
      }



/*
      // something
      //print("not # " + x);
      if(x == '*' || x == '/'){
        operators.push(x);
      }else{
        if(operators.peek()=='*' || operators.peek()=='/'){
	  //sdfsd
	  postStr = postStr + operators.pop();
	  operators.push(x); 
	}else{
	  operators.push(x);
	}       
      }*/
    }else{         // if it is
      //sadasd
      //print("is number " + x);
      postStr = postStr + " " + x;
    }
  }
  
  // empty the stack and add all of the operators to the string
  print(operators.length());
  while (operators.length() >  0){
    postStr = postStr + operators.pop();
  }
  return postStr;
}




function sVal(symbol){
  if(symbol == '+' || symbol == '-'){
    return 0;
  }else if (symbol == '*' || symbol == '/'){
    return 1;
  }
}




// prompt the user for expresion
var input = readline();
print(input);
//var foo = new Stack();


//foo.getToken(input);
var foo = getToken(input);
print(foo);
print("the end");

