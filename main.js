$(document).ready(function () {
    var i = 0;
    var txt = 'happen.';
    var speed = 800;
    
    function typeWriter() {
      if (i < txt.length) {
        document.getElementById("text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();


    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
    //Firebase set up
    var config = {
        apiKey: "AIzaSyBA1nSuU5FGlJ5WtTSaThJI8j_CyhCVJE0",
        authDomain: "portfolio-okoj.firebaseapp.com",
        databaseURL: "https://portfolio-okoj.firebaseio.com",
        projectId: "portfolio-okoj",
        storageBucket: "portfolio-okoj.appspot.com",
        messagingSenderId: "624418073384"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $(".btn").on("click", function (event) {
        event.preventDefault();

        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var message = $("#comments").val().trim();

        database.ref().push({
            name: name,
            email: email,
            message: message
        });

        $("#name").val("");
        $("#email").val("");
        $("#comments").val("");

        database.ref().on("value", function (snapshot) {

            var name = snapshot.val().name;
            var email = snapshot.val().email;
            var message = snapshot.val().message;
        })

    })
})