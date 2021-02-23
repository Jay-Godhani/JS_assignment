'use strict';
//Creating employee class
class Employee {
    constructor (empname,address,empId,desig){
        this.empname = empname;
        this.address = address;
        this.empId = empId;
        this.desig = desig;
    }
}

let add = document.getElementById("add");
add.addEventListener("click", addemployee)

//This is main function which will add data into localstorage in form of Array
function addemployee (){
    const { empname, address, empId, desig, feedback } = getDetails();
    if (empname === "" || empId === "" || desig === undefined || address === "") { //checking the entered data is not empty.
        feedback.innerHTML = "Error : Please Enter all Data then click add details.";
        return;
    }
    let employeeobj = new Employee(empname,address,empId,desig); // Creating object of employee class
    
    /* Checking localstorage if array already exist or not, if not then it 
    will create a array and push employee object into the array
    Otherwise it will simply push the new employee object into the array and store it in local Storage*/
    
    if(localStorage.getItem('dbJson')==null){
        var employeeArray = [];
        employeeArray.push(employeeobj);
        localStorage.setItem('dbJson', JSON.stringify(employeeArray));
        feedback.innerHTML = "Data Added sucessfully";
    }
    else{
        let dbJsonArraystr = localStorage.getItem('dbJson');
        employeeArray = JSON.parse(dbJsonArraystr);
        employeeArray.push(employeeobj);
        localStorage.setItem('dbJson', JSON.stringify(employeeArray));
        feedback.innerHTML = "Data Added sucessfully";
    }
}

//Below function will get all the required values from html page and local storage
function getDetails() {
    const empname = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const empId = document.getElementById("emp-id").value;
    const desig = getDesignation();
    const feedback = document.getElementById("feedback");
        return { empname, address, empId, desig, feedback }
}

// Below Function is used to determine which radio button is selected.
export function getDesignation (){
    const Designation = document.getElementsByName("Designation");
    let ch;
    for (let i=0; i<Designation.length ; i++){
        if (Designation[i].checked)
        ch = Designation[i].value;
    }
    return ch;
}
