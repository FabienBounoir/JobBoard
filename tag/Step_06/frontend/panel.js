const urlServer = "http://localhost:8080"     //server Adresse + port

const checkUrl = "/authentification"  //chemin pour tester le token de connexion

const changePasswordUrl = "/password" //chemin pour l'api lors de la modification du mot de passe 

const changeInformationUrl = "/newInformation"  //chemin pour changer les information du profil

//Test si l'email rentré est valide
function checkEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

//crée cookie
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//recuperer valeur cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//ajoute dans chaque input les information du compte connecté
function afficherInputCompte(){

    $("#inputLastName").val(getCookie("nom"));

    $("#inputFirstName").val(getCookie("prenom"));

    $("#inputEmail").val(getCookie("email"));

    $("#inputPhone").val(getCookie("telephone"));

    $("#inputUsername").val(getCookie("identifiant"));

    if(getCookie("sexe") == "F")
    {
        $("#inlineRadioF").prop("checked", true );
    }
    else
    {
        $("#inlineRadioM").prop("checked", true );
    }

}

//test si l'utilisateur à le droit d'acceder a cette page
function testUtilisateurValide(){

    const tokenConnexion = {
        "token":getCookie("token"),
    }

    var settings = {
        "url": urlServer + checkUrl,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(tokenConnexion),
    };
      
    $.ajax(settings).done(function (response) {
        if(response.code == "200")
        {   
            $("#form").html(messageForm())
            $("#submitButtonConnect").click(() =>{
                verificationFormConnect()
            })

            navConnexion(getCookie("identifiant"))

            $("#deconnexionBouton").click(function(e) {  //@todo corriger bug modal ne se ferme pas.
                Deconnexion()
            })
        }
        else if(response.code == "400")
        {
            // document.location.href="annonces.html";
            document.getElementById("panelInformation").innerHTML = '<div class="container">'+
            '<div class="row">'+
                '<div class="justify-content-center>'+
                    '<div class="error-template">'+
                        '<h1>Oops!</h1>'+
                        '<h2>403 utilisateur non Authentifié !!</h2>'+
                        '<div class="error-details">'+
                            '<iframe src="https://funhtml5games.com?embed=marioeditor" style="width:1024px;height:540px;border:none;" frameborder="0" scrolling="no"></iframe>'+
                        '</div>'+
                        '<div class="error-actions">'+
                            '<a href="annonces.html" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>'+
                                'Take Me Home </a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
       '</div>'
        
        }
    });

}

//function qui permet l'envoie des information modifier au server
function modifierInformation(){

    if($("#inputFirstName").val().trim() != "" && $("#inputLastName").val().trim() != "" && /^[0-9]{10}$/.test($("#inputPhone").val()) && $("#inputUsername").val().trim() != "")
    {
        var boutons = document.getElementsByName('genre');
        var radioValue;
        for(var i = 0; i < boutons.length; i++){
            if(boutons[i].checked){
            radioValue = boutons[i].value;
            }
        }

        const informationUser = {
            "token": getCookie("token"),
            "firstName": $("#inputFirstName").val(),
            "lastName":$("#inputLastName").val().trim(),
            "tel": $("#inputPhone").val(),
            "identifiant":$("#inputUsername").val(),
            "email": $("#inputEmail").val(),
            "gender": radioValue
        }
    
        var settings = {
            "url": urlServer + changeInformationUrl,
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(informationUser),
        };
          
        $.ajax(settings).done(function (response) {
            if(response.code == "200")
            {   
                setCookie("nom",$("#inputLastName").val().trim(),3);
                setCookie("prenom",$("#inputFirstName").val(),3);
                setCookie("email",$("#inputEmail").val(),3);
                setCookie("telephone",$("#inputPhone").val(),3);
                setCookie("identifiant",$("#inputUsername").val(),3);
                setCookie("sexe",radioValue,3);

                $("#messageInformation").html('<p class="text-center"><code>⟼ mise à jour des information reussi ⟻</code></p>');
                $("#inputPassword").val("");
                $("#inputNewPassword").val("");
                $("#inputConfirmNewPassword").val("");
            }
            else
            {
                $("#messageInformation").html('<p class="text-center"><code>⟼ la mise à jour des information a échoué ⟻</code></p>');
            }
        })
    }
    else
    {
        $("#messageInformation").html('<p class="text-center"><code>⟼ information invalide ⟻</code></p>');
    }
}

//function qui permet l'envoie de la modification du password au server
function modifierPassword(){

    if($("#inputConfirmNewPassword").val().trim() == $("#inputNewPassword").val().trim() && $("#inputNewPassword").val().trim() != "" && $("#inputPassword").val().trim() != "")
    {
        const tokenConnexion = {
            "oldPassword": $("#inputPassword").val(),
            "token": getCookie("token"),
            "newPassword": $("#inputConfirmNewPassword").val()
        }

        console.log("json test: " + JSON.stringify(tokenConnexion))

        var settings = {
            "url": urlServer + changePasswordUrl,
            "method": "PUT",
            "timeout": 0,
            "headers": {
            "Content-Type": "application/json"
            },
            "data": JSON.stringify(tokenConnexion),
        };
        
        $.ajax(settings).done(function (response) {
            if(response.code == "200")
            {   
                $("#messagePassword").html('<p class="text-center"><code>⟼ modification du mot de passe reussi ⟻</code></p>');
                $("#inputPassword").val("");
                $("#inputNewPassword").val("");
                $("#inputConfirmNewPassword").val("");
            }
            else
            {
                $("#messagePassword").html('<p class="text-center"><code>⟼ la mise à jour du mot de passe a échoué ⟻</code></p>');
            }
        })
    }
    else
    {
        $("#messagePassword").html('<p class="text-center"><code>⟼ champ invalide ⟻</code></p>');
    }
}

//Function executer lorsque la page a fini de charger
$(document).ready(function() {

    testUtilisateurValide()

    afficherInputCompte()

    $("#buttonSaveInformation").click(() =>{
        modifierInformation()
    })

    $("#buttonSavePassword").click(() =>{
        modifierPassword()
    })

}); 