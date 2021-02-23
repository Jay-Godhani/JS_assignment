'use strict';
import {searchDetails} from './view.js';

// Below Function is used to determine which radio button is selected.
function getDesignation (){
    const Designation = document.getElementsByName("Designation");
    let ch;
    for (let i=0; i<Designation.length ; i++){
        if (Designation[i].checked)
        ch = Designation[i].value;
    }
    return ch;
}

document.getElementById('search').addEventListener("click",searchDetails);
document.getElementById('update').addEventListener("click",updateDetails);
document.getElementById('search').addEventListener("click",()=>{
    document.getElementById('update-entry').classList.remove('details-view-editing');
});

// This function will upadte data to localstorage.
function updateDetails(){
    const { dbJsonArray, searchedempId, editname, editempId, editaddress, editdesig } = getDetailstoEdit();
    function* editEmployee() {      // This is a generator function for iteration through dbJsonArray
        let idx = 0;
        while (dbJsonArray[idx]){
            yield dbJsonArray[idx];
            idx++;
        }
    }
    for (let val of editEmployee() ){
        updateRecord(val);
        localStorage.setItem('dbJson', JSON.stringify(dbJsonArray));
        document.getElementById('update-entry').classList.add('details-view-editing');
    }
// This function will update the value of enetered employeeID and save it to dbJsonArray
    function updateRecord(val) {
        if (searchedempId == val.empId) {
            if (editname !== "") {
                val.empname = editname;
            }
            if (editempId !== "") {
                val.empId = editempId;
            }
            if (editaddress !== "") {
                val.address = editaddress;
            }
            if (editdesig !== undefined) {
                val.desig = editdesig;
            }
            document.getElementById('feedback').innerHTML = `Data Updated sucessfully for ${val.empId}`;
        }
    }
}
//Below function will get all the required values from html page and local storage
function getDetailstoEdit() {
    const editname = document.getElementById('edit-name').value;
    const editaddress = document.getElementById('edit-address').value;
    const editempId = document.getElementById('edit-emp-id').value;
    const editdesig = getDesignation();
    const searchedempId = document.getElementById("search").value;
    const dbJsonArraystr = localStorage.getItem('dbJson');
    const dbJsonArray = JSON.parse(dbJsonArraystr);
    return { dbJsonArray, searchedempId, editname, editempId, editaddress, editdesig };
}