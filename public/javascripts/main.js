
let DataArray = [];
let Data_StoreID = [98053 , 98007, 98077, 98055, 98011, 98046];
let Data_SalesPersonID = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[21,22,23,24]];
let Data_CdID = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451]

let DataObject = function () {

    
    this.ID = Data_StoreID[Math.floor(Math.random() * 6)] //98053  //Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    
    if(this.ID == 98053){
        this.SalesPersonID = Data_SalesPersonID[0][Math.floor(Math.random() * 4)]
    } else if (this.ID == 98007){
        this.SalesPersonID = Data_SalesPersonID[1][Math.floor(Math.random() * 4)]
    } else if (this.ID == 98077){
        this.SalesPersonID = Data_SalesPersonID[2][Math.floor(Math.random() * 4)]
    } else if (this.ID == 98055){
        this.SalesPersonID = Data_SalesPersonID[3][Math.floor(Math.random() * 4)]
    } else if (this.ID == 98011){
        this.SalesPersonID = Data_SalesPersonID[4][Math.floor(Math.random() * 4)]
    } else {
        this.SalesPersonID = Data_SalesPersonID[5][Math.floor(Math.random() * 4)]
    }
    
    this.CdID = Data_CdID[Math.floor(Math.random() * 10)];

    this.PricePaid = Math.floor(Math.random() * (15 - 5 + 1)) + 5; 
    this.Date = new Date();
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



    document.getElementById("buttonSubmit").addEventListener("click", function () {
        let newData = new DataObject();  
        fetch('/AddData', {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json),
            )
            .catch(err => console.log(err));
        });   


    document.getElementById("buttonSUBMIT500").addEventListener("click", function () {
        
        var check = true; 
        
        for(let i = 0; i < 500; i++){
            var newData = new DataObject();
            if(check === false){
                newData.Date.setMinutes(newData.Date.getMinutes() + Math.floor(Math.random() * (30 - 5 + 1)) + 5)
            }
            check= false
            fetch('/AddData', {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json),
                
                createList()
                )
                .catch(err => console.log(err));      
            }
        });
        document.getElementById("buttonDelete").addEventListener("click", function () {
            deleteSalesPerson(document.getElementById("deleteID").value);      
        });
    });



// end of wait until document has loaded event  *************************************************************************

function deleteText(my_div){
    const element = document.getElementById(`${my_div}`);
    element.innerText = '';
}


function createList() {
// update local array from server

    fetch('/getAll')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then( responseData => fillUL(responseData))    //update our array and li's
    .catch(err => console.log('Request Failed', err)); // Catch errors

};

function fillUL(data) {
    DataArray = data;

        // clear prior data
    var divDataList = document.getElementById("divDataListServer");
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
function deleteSalesPerson(SalesPersonID) {

    fetch('/DeleteSalesPerson/' + SalesPersonID, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json),
      createList()
      )
      .catch(err => console.log(err));
}

  
