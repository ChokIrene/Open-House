$(document).ready(function () {
   
    const APIKEY = "63edbcfa478852088da6832b";
    getContacts();
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();
  
    
    $("#contact-submit").on("click", function (e) {
      
      e.preventDefault();
  
     
      let contactfirstName = $("#contact-firstName").val();
      let contactlastName = $("#contact-lastName").val();
      let contactEmail = $("#contact-Email").val();
      let contactphoneNumber = $("#contact-phoneNumber").val();
  
      
      let jsondata = {
        "first_name": contactfirstName,
        "last_name": contactlastName,
        "email": contactEmail,
        "phone_number": contactphoneNumber,
        
        
      };
  
      console.log(contactEmail);
    
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://openhouse-22ef.restdb.io/rest/user-profile",
        "method": "POST", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          
          
          $("#contact-submit").prop( "disabled", true);
       
          $("#add-contact-form").trigger("reset");
        }
      }
  
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#contact-submit").prop( "disabled", false);
        
        
        $("#add-update-msg").show().fadeOut(3000);
  
         
        getContacts();
      });
    });
  
  
    
    function getContacts(limit = 10, all = true) {
  
      
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://openhouse-22ef.restdb.io/rest/user-profile",
        "method": "GET", 
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache",
        }
      }
  
     
      $.ajax(settings).done(function (response) {
        
        let content = "";
  
        for (var i = 0; i < response.length && i < limit; i++) {
         
          
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].email}</td>
          <td>${response[i].message}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;
  
        }
  
      
    $("#contact-list").on("click", ".update", function (e) {
      e.preventDefault();
      let contactfirstName = $(this).data("first_name");
      let contactlastName = $(this).data("last_name");
      let contactEmail = $(this).data("email");
      let contactphoneNumber = $(this).data("phone_number");
  
  
    
      $("#contact-firstName").val(contactfirstName);
      $("#contact-lastName").val(contactlastName);
      $("#contact-Email").val(contactEmail);
      $("#contact-phoneNumber").val(contactphoneNumber); 
      
  
    })
  
    
    $("#update-contact-submit").on("click", function (e) {
      e.preventDefault();
      //retrieve all my update form values
      let contactfirstName = $("#contact-firstName").val();
      let contactlastName = $("#contact-lastName").val();
      let contactEmail = $("#contact-Email").val();
      let contactphoneNumber = $("#contact-phoneNumber").val();
      
  
      
      
      updateForm(contactfirstName, contactlastName, contactEmail, contactphoneNumber);
    });
  
   
    function updateForm(contactFirstname, contactLastname, contactEmail, contactPhonenumber) {
     
      var jsondata = { "first_name": contactfirstName, "last_name": contactlastName, "email": contactEmail, "phone_number": contactphoneNumber};
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://openhouse-22ef.restdb.io/rest/user-profile/${id}`,//update based on the ID
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }
  
     
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#update-contact-container").fadeOut(5000);
        
        getContacts();
      });
    }
  
  })
  })