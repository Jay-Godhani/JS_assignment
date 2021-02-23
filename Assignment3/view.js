'use strict';
let view = document.getElementById("search-detail");
view.addEventListener("click", searchDetails)
//This is the main function which will fetch employeeID and show all details of that employee
function searchDetails (){
    if(localStorage.getItem('dbJson')==null){       //Checking if localstorage is empty or not 
        document.getElementById('view-error').innerHTML = 'Error : Storage is empty, First of all please Enter data.';
    }
    else{
        const { dbJsonArray, searchedempId, empname, address, empId, desig, error } = getViewDetails();
        function* viewEmployee() {      // This is a generator function for iteration through dbJsonArray
            let idx = 0;
            while (dbJsonArray[idx]){
                yield dbJsonArray[idx];
                idx++;
            }
            error.classList.remove('error-hide');
            document.getElementById('emp-details').classList.add('error-hide');
            error.innerHTML = 'Error : No record found';
        }
        for (let val of viewEmployee() ){
//This if will search for entered employeeID into localstorage if data is available then it will show all details otherwise a Error message.
            if(searchedempId == val.empId){
                document.getElementById('emp-details').classList.remove('error-hide');
                empname.innerHTML = `Name :${val.empname}`;
                address.innerHTML = `Address :${val.address}`;
                empId.innerHTML = `Employee Id :${val.empId}`;
                desig.innerHTML = `Designation :${val.desig}`;
                error.classList.add('error-hide');
                break;
            }
        }
    }
}
//Below function will get all the required values from html page and local storage
function getViewDetails() {
    const searchedempId = document.getElementById("search").value;
    const dbJsonArraystr = localStorage.getItem('dbJson');
    const dbJsonArray = JSON.parse(dbJsonArraystr);
    const empname = document.getElementById('seached-name');
    const address = document.getElementById('seached-address');
    const empId = document.getElementById('seached-ID');
    const desig = document.getElementById('seached-designation');
    const error = document.getElementById('view-error');
    return { dbJsonArray, searchedempId, empname, address, empId, desig, error };
}

export {searchDetails};

/* Can create a Iterator instead of generator as below.
const employeeIterable = {
            [Symbol.iterator](){
                return {
                    [Symbol.iterator](){
                        return this;
                    },
                    next () {
                        const current = dbJsonArray[idx];
                        idx++;
                        if (current){
                            return {value : current , done : false};
                        }
                        else{
                            return {value : current, done : true};
                        }
                    }
                }
            }
        }*/