function ans(){
    try{
//n1 and n2 has global scope as they are declared as var and can be used in different function.
        var n1 = parseInt(document.getElementById("num1").value);
        var n2 = parseInt(document.getElementById("num2").value);
// Checking input is a number and falls into given range.
        if(isNaN(n1)){
            throw " First input is not a number or it is empty"
        }
        if(isNaN(n2)){
            throw " Second input is not a number or it is empty"
        }
// Checking if number is safe integer or not, if not then throwing error with a safe range of input.
//Using template literal to display max and min safe integer.
        if( !Number.isSafeInteger(n1) || !Number.isSafeInteger(n2)){
            throw ` Entered input is bigger than : ${Number.MAX_SAFE_INTEGER} or 
            smaller than ${Number.MIN_SAFE_INTEGER}. Please enter number in safe range.`
        }
        var op = operator();
        result(op,n1,n2);
    }
    catch(error){
        document.getElementById("error").innerHTML = `Error :${error}`;
        return;
    }
}

//Function for checking which radio button is selected to determine the operator.
function operator(){
    const choice = document.getElementsByName("operator"); // declared const because value of choice will not change.
    let ch;
    for (i=0; i<choice.length ; i++){
        if (choice[i].checked)
        ch = parseInt(choice[i].value);
    }
    return ch;
}

// Function for calculating final result
function result(op,n1,n2){
    let res;
    switch(op){
        case 1:
            res = add(n1,n2);
            break;
        case 2:
            res = sub(n1,n2);
            break;
        case 3:
            res = multiply(n1,n2);
            break;
        case 4:
            try{//Checking value of divisor. It should not be 0.
                if(n2===0){
                    throw " Number cannot be divided by 0";
                }
                res = divide(n1,n2);
                break;
            }
            catch(error){
                document.getElementById("error").innerHTML = `Error :${error}`;
                return;
            }
        default :// If operator is not selected error message will be displayed.
            document.getElementById("error").innerHTML = `Error : Operator not selected`;
            return;
    }
    document.getElementById("error").innerHTML = "No Error"; // To reset the field to "no error" if execution of function is sucessfull.
    document.getElementById("result").value = res; // For displaying output in text box
}

// Functions for every operator 

function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function resetError(){
    document.getElementById("error").innerHTML = "No Error";
}