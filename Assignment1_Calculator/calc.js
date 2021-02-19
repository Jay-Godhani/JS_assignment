function ans(){
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    // Checking input is a number or not.
    try{
        if(isNaN(n1)){
            throw "Error : First input is not a number or it is empty"
        }
        if(isNaN(n2)){
            throw "Error : Second input is not a number or it is empty"
        }
    }
    catch(error){
        document.getElementById("error").innerHTML = error;
        return;
    }
    let choice = document.getElementsByName("operator");
    let ch;
    let res;
    // Checking which radio button is selected to determine the operator.
    for (i=0; i<choice.length ; i++){
        if (choice[i].checked)
        ch = parseFloat(choice[i].value);
    }
    switch(ch){
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
            try{//Checking value of divisor. It must not be 0.
                if(n2===0){
                    throw "Error : Number cannot be divided by 0";
                }
                res = divide(n1,n2);
            }
            catch(error){
                document.getElementById("error").innerHTML = error;
                return;
            }
            break;
        default :// If operator is not selected error message will be displayed.
            document.getElementById("error").innerHTML = "Error : Operator not selected";
            return;
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
    document.getElementById("error").innerHTML = "No Error"; // To reset the field to "no error" if execution of function is sucessfull.
    document.getElementById("result").value = res; // For displaying output in text box
}