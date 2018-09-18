
$(document).ready(function() {


$(".first-change").on("click", function(e) {
  nextSection();
});

function goToSection(i) {
  $("fieldset:gt(" + i + ")")
    .removeClass("current")
    .addClass("next");
  $("fieldset:lt(" + i + ")").removeClass("current");

    $("fieldset")
      .eq(i) // Reduce the set of matched elements to the one at the specified index.
      .removeClass("next")
      .addClass("current");
}

function nextSection() {
  var i = $("fieldset.current").index();
  if (i < 2) {
    goToSection(i + 1);
  }
}

$("#forgot").click(function(){
        $("#under").addClass( "move" );
        $("#fieldsets").addClass( "out" );
    });

$( "#back-link" ).click(function() {
  $( "#fieldsets" ).addClass( "back").removeClass("out");
  $("#under").addClass( "gone" );

});



  $("#first-form").submit(function(e) {
    var form = $(this);
    var postform = true;
    var fields = $(this).find("*[required]");
    var username = $("#username").val();
    var password = $("#password").val();
    error = true;

    $.ajax({
                url: "js/users.json",
                dataType: "json"
              })
              .done(function( data ) {

                // find the email in the returned array
                var exists = -1;
                username = username.toLowerCase();
                password = password.toLowerCase();

                for (var i = 0; i < data.length; i++) {
                    if (username == data[i].username && password == data[i].password ) {
                      exists++;
                    }
                  }
                  // did the email address exist?
                if ( exists != -1 ) {
                  $("label").addClass("exists");   
                  nextSection();
                }
              });
  
  });




        $("#username-pass").blur(function() {
            var val = $(this).val();
            var field = $(this);

            // remove any classes from previous validation
            field.closest("label").removeClass("error not-exist not-exist-second exists");

            // first, validate as email address - otherwise, no need to check against existing email addresses
            if ( validateField(field)) {
             // get existing email addresses
              $.ajax({
                url: "js/users.json",
                dataType: "json"
              })
              .done(function( data ) {

                // find the email in the returned array
                var exists = -1;
                val = val.toLowerCase();

                for (var i = 0; i < data.length; i++) {
                    if (val == data[i].username) {
                      exists++;
                    }
                  }
                  // did the email address exist?
                if ( exists == -1 ) {
                  field.closest("label").addClass("not-exist-second");

                } else {
                  field.closest("label").addClass("exists");
                    $("form").submit(function(e) {
                      $(".first-section").removeClass("show1").addClass("hide1");
                      $(".second-section").addClass( "show2" );
                    }); 

                }
              });
            } else {
              field.closest("label").addClass("error");
            }
          });










    
  // check against existing email addresses

    $("#password").blur(function() {
    var val = $(this).val();
    var field = $(this);

    // remove any classes from previous validation
    field.closest("label").removeClass("error not-exist exists");

    // first, validate as email address - otherwise, no need to check against existing email addresses
    if ( validateField(field)) {
     // get existing email addresses
      $.ajax({
        url: "js/users.json",
        dataType: "json"
      })
      .done(function( data ) {
       // data = data.map(v => v.toLowerCase());
        // find the email in the returned array
        var exists = -1;
        val = val.toLowerCase();


        for (var i = 0; i < data.length; i++) {
            if ( val == data[i].password ) {
              exists++;
          
            }
          }   console.log(exists)
          // did the email address exist?
        if ( exists == -1 ) {

           $( ".hidden-wrong" ).toggleClass("show-wrong");

        } else {
         field.closest("label").addClass("exists");
        }
      });
    } else {
      field.closest("label").addClass("error");
    }
  });

     $("#username").blur(function() {
            var val = $(this).val();
            var field = $(this);

            // remove any classes from previous validation
            field.closest("label").removeClass("error not-exist exists");

            // first, validate as email address - otherwise, no need to check against existing email addresses
            if ( validateField(field)) {
             // get existing email addresses
              $.ajax({
                url: "js/users.json",
                dataType: "json"
              })
              .done(function( data ) {
            
                // find the email in the returned array
                var exists = -1;
                val = val.toLowerCase();

                for (var i = 0; i < data.length; i++) {
                    if (val == data[i].username) {
                      exists++;
                    }
                  }
                  // did the email address exist?
                if ( exists == -1 ) {
                  field.closest("label").addClass("not-exist");

                } else {
                 field.closest("label").addClass("exists");

                }
              });
            } else {
              field.closest("label").addClass("error");
            }
          });






    // form validation
  $("form").submit(function(e) {
    var form = $(this);
    var postform = true;
    var fields = $(this).find("*[required]");;

    // alright, go through the fields one by one
    fields.each(function() {

      var valid = validateField( $(this) );

      // was the field validated?
      if ( !valid ) {
        postform = false;
      }
    });

    // so what's the result of the POST???
    if ( !postform ) {

      // if any field wasn't validated, stop the POST of the form
      e.preventDefault();

    } else {

        e.preventDefault();
    }
  });



function validateField( field ) {

  // remove error messages from eventual earlier validation attempts
  field.closest("label").removeClass("error");

  // save/set some values
  var type = field.attr("type");
  var val = field.val();
  var valid = true;

  // is it a text?
  if ( type == "text" && (val == undefined || val == null || val == "") ) {
    valid = false;
  // is it a normal text field?
  }  else if ( type == "password" && (val == undefined || val == null || val == "") ) {
    valid = false;
  }

  // was the field validated?
  if ( !valid ) {
    // no - add the error-appareance
    field.closest("label").addClass("error");
  }

  return valid;
}

});