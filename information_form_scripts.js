//Changes the study dropdown when a degree is changed.
function changeStudyOnDegree(degree, study)
{
  //Example fields of study for the degrees.
  var studies = {
                  "Computer Science":["Software Engineering", "Cyber Security", "Web Development"],
                  "Religion":["Theology", "Biblical Studies", "Worship"],
                  "Business":["Project Management", "Human Resources", "Marketing"]
                };

  //Resets the study dropdown options.
  study.length = 0;

  if (degree.value!=="")
  {
    //If the degree is not empty enable and populate the study dropdown.
    study.disabled = false;
    var study_list = studies[degree.value];
    for (i = 0; i<study_list.length; i++)
    {
      addSelectOptions(study, study_list[i], study_list[i]);
    }
  }
  else
  {
    //Else disable the study dropdown and reset to original message.
    study.disabled=true;
    addSelectOptions(study, "Select degree type above", "")
  }
}

//Adds options to a select element.
function addSelectOptions(select, output, value)
{
  var new_option = document.createElement('option');
  new_option.text = output;
  new_option.value = value;
  select.appendChild(new_option);
}

//Allows users to autocomplete the addresses they enter.
function populateAdddreses()
{
  var address = document.getElementById('address');
  var autocomplete_addresses = new google.maps.places.Autocomplete(address,{types: ['address']});
  google.maps.event.addListener(autocomplete_addresses, 'place_changed', function(){
    var place = autocomplete_addresses.getPlace();
  })
}

//Validates the request information form.
function validateForm()
{
  var form_info = {
                   degree:{form_value:document.forms["informationForm"]["degree"].value, empty_message:"Please select a degree!"},
                   study:{form_value:document.forms["informationForm"]["study"].value, empty_message: "Please select a field of study"},
                   firstname:{form_value:document.forms["informationForm"]["first-name"].value, empty_message: "Please enter your first name!"},
                   lastname:{form_value:document.forms["informationForm"]["last-name"].value, empty_message:"Please enter your last name!"},
                   email:{form_value:document.forms["informationForm"]["email-address"].value, empty_message:"Please enter an email address!"},
                   phone:{form_value:document.forms["informationForm"]["phone"].value, empty_message:"Please enter a phone number!"},
                   address:{form_value:document.forms["informationForm"]["address"].value, empty_message:"Please enter an address!"},
                 };

  //Makes sure form values are not empty.
  for (var key in form_info)
  {
    if(form_info.hasOwnProperty(key))
    {
      var is_empty = isFieldEmpty(form_info[key]["form_value"], form_info[key]["empty_message"]);
      if(is_empty)
      {
        return false;
      }
    }
  }

  //Checks for email validity
  var is_email_valid = isEmailValid(form_info["email"]["form_value"]);
  if(!is_email_valid)
  {
    return false;
  }

  //Checks for phone number validity
  var is_phone_valid = isPhoneValid(form_info["phone"]["form_value"]);
  if(!is_phone_valid)
  {
    return false;
  }

  //Checks for address validity
  isAddressValid();

  return false;
}


//Checks to make sure that a field is not empty.
function isFieldEmpty(input, message)
{
  if(input=="")
  {
    alert(message);
    return true;
  }

  return false;
}

//Checks to see if the entered email is valid.
function isEmailValid(email)
{
   var validemail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (validemail.test(email))
   {
     return true;
   }

   alert("Please enter a valid email address!")
   return false;
}

//Checks to see if a phone number is valid.
function isPhoneValid(phone)
{
  var validphone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phone.match(validphone))
  {
     return true;
  }

  alert("Please enter a valid phone number!");
  return false;
}

//Checks to see if an address is valid using Google Maps API
function isAddressValid()
{
  var address = document.getElementById("address");
  var google_geocoder = new google.maps.Geocoder();

  // Geocode the address
    google_geocoder.geocode({'address': address.value},
    function(results, status) {
      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        address.value=results[0].formatted_address;
        alert("Form submitted sucessfully!");
        document.getElementById("informationForm").submit();
      }
      else {
        alert("Please enter a valid address!");
      }
  });

  return false;
}

//Redirects user to the apply now page.
function applyNow()
{
  window.location.href='https://apply.liberty.edu/';
}

//Populates addresses that users can enter
populateAdddreses();

//Makes sure that studies are populated correctly on page load.
changeStudyOnDegree(document.getElementById("degree"), document.getElementById("study"));
