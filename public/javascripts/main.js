
let DataArray = [];
let Data_StoreID = [98053 , 98007, 98077, 98055, 98011, 98046];
let Data_SalesPersonID = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[21,22,23,24]];
let Data_CdID = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451]


let DataObject = function () {
    this.ID = 98053//Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.SalesPersonID = 1;
    this.CdID = 123456;
    this.PricePaid = 55555; 
    this.Date = Date.now();  
}

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("buttonCreate").addEventListener("click", function () {

        DataArray.push(new DataObject);
        const divDataListClient = document.getElementById('divDataListClient');
        deleteText('divDataListClient');
        
        var ul = document.createElement('ul');
        DataArray.forEach(function (element,) {   // use handy array forEach method
            var li = document.createElement('li');
            li.innerHTML = element.ID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
            element.SalesPersonID + "  &nbsp &nbsp  &nbsp &nbsp "   +
            element.CdID + "  &nbsp &nbsp  &nbsp &nbsp "  
            + element.PricePaid + " &nbsp &nbsp  &nbsp &nbsp  " + element.Date;
            ul.appendChild(li);
        });
        divDataListClient.appendChild(ul)     
    });
    // document.getElementById("buttonAdd").addEventListener("click", function () {
    //     let newData = new DataObject();

    //     fetch('/AddData', {
    //         method: "POST",
    //         body: JSON.stringify(newData),
    //         headers: {"Content-type": "application/json; charset=UTF-8"}
    //         })
    //         .then(response => response.json()) 
    //         .then(json => console.log(json),
    //         createList()
    //         )
    //         .catch(err => console.log(err));
    // });


    document.getElementById("buttonSubmit").addEventListener("click", function () {
        createList();      
    });
    document.getElementById("buttonSUBMIT500").addEventListener("click", function () {
        createList();      
    });

  

});  
// end of wait until document has loaded event  *************************************************************************

function deleteText(my_div){
    const element = document.getElementById(`${my_div}`);
    element.innerText = '';
}


function createList() {
// update local array from server

    fetch('/getAllData')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then( responseData => fillUL(responseData))    //update our array and li's
    .catch(err => console.log('Request Failed', err)); // Catch errors

};

function fillUL(data) {
    DataArray = data;

        // clear prior data
    var divDataList = document.getElementById("divDataList");
    while (divDataList.firstChild) {    // remove any old data so don't get duplicates
        divDataList.removeChild(divDataList.firstChild);
    };

    var ul = document.createElement('ul');
    DataArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.ID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
        element.SalesPersonID + "  &nbsp &nbsp  &nbsp &nbsp "   +
        element.CdID + "  &nbsp &nbsp  &nbsp &nbsp "  
        + element.PricePaid + " &nbsp &nbsp  &nbsp &nbsp  " + element.Date;
        ul.appendChild(li);
    });
    divDataList.appendChild(ul)
}

  
