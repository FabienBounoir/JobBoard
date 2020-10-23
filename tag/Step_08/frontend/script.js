const url = "http://localhost:8080"     //server Adresse + port

const annonce = "/annonces"             //Chemin pour recuperer les annonces

const information = "/information/"     //Chemin pour recuperer les information de l'annnonce

const formSend = "/form-send"           //Chemin ou le form est envoyer à l'api

const connexionUrl = "/connexion"       //Chemin pour tester si l'utilisateur peut se connecter

const registerUrl = "/register"         //Chemin pour s'enregistrer

const authentificationUrl = "/authentification"  //chemin pour tester le token de connexion

var idAnnonce = ""                      //Contient id de l'annonce que l'utilisateur selectionne

//Crée les annonces
var createJobads = function (job) {

    let cardjob = '<div class="card mb-4 box-shadow">'+
    '<div class="card-header">'+
      '<h4 class="my-0 font-weight-normal">' + job.titre + '</h4>'+
    '</div>'+
    '<div class="card-body">'+
      '<ul class="list-unstyled mt-3 mb-4">'+
        '<li><p>' + job.description.substr(0,100) + ' ... </p></li>'+
      '</ul>'+
      '<p><a id="' + job.idAnnonce + '" class="detailJob btn btn-lg btn-block btn-primary text-white" role="button">Learn More</a></p>'+
    '</div>'+
  '</div>'

    return cardjob
}

//Crée les information de l'annonce selectionner
var informationCard = function (data) {
    // let informationAds = '<div class="annonce rounded-40 border border-info row mb-3">'+
    //                 '<div class="col-md-8 themed-grid-col">'+
    //                 '<a id=backPage class="btn btn-primary text-white" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-90deg-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
    //                     '<path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>'+
    //                  '</svg></a>'+
    //                     '<h1>' + data[0].titre +'</h1>'+
    //                     '<p>' + data[0].description+ '</p>'+
    //                         '<p><button type="button" class="btn btn-success " data-toggle="modal" data-target="#form">'+
    //                         '  Postuler  '+
    //                       '</button></p>'+
    //                 '</div>'+
    //                 '<div class="col-md-4 themed-grid-col border-left">'+
    //                     '<p><code>↳ date:</code> ' + data[0]['date_format(date, "%d/%m/%Y à %H:%i")'] +
    //                     '<br><br><code>↳ Entreprise:</code> ' + data[0].nom +
    //                     '<br><br><code>↳ adresse:</code> ' + data[0].rue + " "+ data[0].codePostal + " "+ data[0].ville + " "+
    //                     '<br><br><code>↳ site:</code> <a href="' + data[0].site +'"  >' + data[0].site + '</a></p>'+
    //                     '<br><code>↳ Salaire:</code> ' + data[0].salaire +
    //                 '</div>'+
    //                 '<div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="LongTitle" aria-hidden="true">'

    let informationAds = '<div class="annonce rounded-40 border border-info row mb-3">'+
                    '<div class="col-md-8 themed-grid-col">'+
                    '<a id=backPage class="btn btn-primary text-white" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-90deg-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                        '<path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>'+
                     '</svg></a>'+
                        '<h1>' + data[0].titre +'</h1>'+
                        '<p>' + data[0].description+ '</p>'+
                            '<p><button type="button" class="btn btn-success " data-toggle="modal" data-target="#form">'+
                            '  Postuler  '+
                          '</button></p>'+
                    '</div>'+
                    '<div class="col-md-4 themed-grid-col border-left">'+
                        '<p><code>↳ date:</code> ' + data[0]['date_format(date, "%d/%m/%Y à %H:%i")'] +
                        '<br><br><code>↳ Entreprise:</code> ' + data[0].nom +
                        '<br><br><code>↳ adresse:</code> ' + data[0].rue + " "+ data[0].codePostal + " "+ data[0].ville + " "+
                        '<br><br><code>↳ site:</code> <a href="' + data[0].site +'"  >' + data[0].site + '</a></p>'+
                        '<br><code>↳ Salaire:</code> ' + data[0].salaire +
                    '</div>'+
                    '<div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="LongTitle" aria-hidden="true">'

    return informationAds
}

//Methode qui genere le formulaire
var formCreator = function() {
    let form = '<div class="modal-dialog" role="document" id="formTest">'+
                    '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h5 class="modal-title text-dark" id="LongTitle">Formulaire</h5>'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '<span aria-hidden="true">×</span>'+
                        '</button>'+
                    '</div>'+
                    '<div class="modal-body">'+
                    '<form id=myForm method="post" >'+
                        '<div class="form-group">'+
                            '<label class="text-dark" for="InputLastName">Last Name</label>'+
                            '<input type="text" class="form-control" id=inputNom aria-describedby="nomHelp" placeholder="Enter Last Name" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="text-dark" for="InputFirstName">First Name</label>'+
                            '<input type="text" class="form-control" id=inputFirstName placeholder="Enter First Name" required>'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="text-dark" for="inputAdresse">Email form-sendress</label>'+
                            '<input type="email" class="form-control" id=inputEmail placeholder="name@example.com" required>'+
                        '</div>'+ 
                        '<div class="form-group">'+
                            '<label class="text-dark" for="tel-input" class="col-2 col-form-label">Telephone</label>'+
                            '<input type="tel" class="form-control" type="tel" placeholder="XXXXXXXXXX" id=inputTel required pattern="[0-9]{10}">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label class="text-dark" for="tel-input" class="col-2 col-form-label">Message</label>'+
                            '<textarea class="form-control" id=inputMessage required></textarea>'+
                        '</div>'+
                        '<div class="buttonSubmit">'+
                            '<a id=submitButton class="btn btn-primary">Submit</a>'+
                        '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                '</div>'+
                '</div>'

    return form
}

var messageForm = function() {
    let form = '<div class="modal-dialog" role="document" id="formTest">'+
                    '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h5 class="modal-title text-dark" id="LongTitle">Formulaire</h5>'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                        '<span aria-hidden="true">×</span>'+
                        '</button>'+
                    '</div>'+
                    '<div class="modal-body">'+
                    '<form id=myForm method="post" >'+
                        '<div class="form-group">'+
                            '<label class="text-dark" for="tel-input" class="col-2 col-form-label">Message</label>'+
                            '<textarea class="form-control" id=inputMessage required></textarea>'+
                        '</div>'+
                        '<div class="buttonSubmit">'+
                            '<a id=submitButtonConnect class="btn btn-primary">Submit</a>'+
                        '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                '</div>'+
                '</div>'

    return form
}


//Verifie si le formulaire et valide
var verificationForm = function(){
    console.log("nom=" + $("#inputNom").val())
    console.log("prenom=" + $("#inputFirstName").val())
    console.log("email=" + $("#inputEmail").val())
    console.log("tel=" + $("#inputTel").val())
    console.log("message=" + $("#inputMessage").val())

    //verification des information du form
    if($("#inputNom").val().trim() != "" && $("#inputFirstName").val().trim() != "" && /^[0-9]{10}$/.test($("#inputTel").val()) && checkEmail($("#inputEmail").val()) && $("#inputMessage").val().trim() != "")
    {
        console.log("form valide")
        
        const personne = {
            "nom": $("#inputNom").val(),
            "prenom": $("#inputFirstName").val() ,
            "email": $("#inputEmail").val() ,
            "tel": $("#inputTel").val() ,
            "message": $("#inputMessage").val(),
            "idAnnonce": idAnnonce,
        }

        envoyerForm(personne)        
    }
    else
    {
        $(".buttonSubmit").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p><a id=submitButton class="btn btn-primary">Submit</a>');
        $("#submitButton").click(() =>{
            verificationForm()
        })
    }
}

var envoyerForm = function(personne) {

    var settings = {
        "url": url + formSend,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(personne),
    };
      
    $.ajax(settings).done(function (response) {
        if(response.message == "success")
        {
            $(".buttonSubmit").html('<p class="text-center" ><code>⟼ Form envoyée ⟻</code></p>');

        }
    });
}

// methode qui verifie le form lorsque la personne est connecté
var verificationFormConnect = function(){
    //verification des information du form
    if($("#inputMessage").val() != "")
    {        
        const personne = {
            "nom": getCookie("nom"),
            "prenom": getCookie("prenom"),
            "email": getCookie("email"),
            "tel": getCookie("telephone"),
            "message": $("#inputMessage").val(),
            "idAnnonce": idAnnonce,
        }
        envoyerForm(personne)        
    }
    else
    {
        $(".buttonSubmit").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p><a id=submitButton class="btn btn-primary">Submit</a>');
    }
}
 
//Methode qui genere la fenetre de connexion
var fenetreConnection = function() {
    let connectCreator = '<div class="modal fade show" style="display: block;">'+
                            '<div class="modal-dialog" role="document">'+
                                '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                    '<h5 class="modal-title text-dark" id="exampleModalLongTitle">Connection</h5>'+
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                    '<span aria-hidden="true">×</span>'+
                                    '</button>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                '<form id=myForm method="post" >'+
                                    '<div class="form-group">'+
                                        '<label class="text-dark" for="InputIdentifiantLabel">Identifiant</label>'+
                                        '<input type="text" class="form-control" id=inputIdentifiant aria-describedby="nomHelp" placeholder="Identifiant" required>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<label class="text-dark" for="InputPasswordLabel">Mot de passe</label>'+
                                        '<input type="password" class="form-control" id=inputPassword placeholder="Mot de passe" required>'+
                                    '</div>'+
                                    '<div class="form-group">'+
                                        '<a class="underlineHover" href="inscription.html">s\'inscrire</a>'+
                                    '</div>'+ 
                                    '<div class="connexionInfo">'+
                                    '</div>'+
                                    '<div class="connexionBouton">'+
                                        '<a id=buttonConnexion class="btn btn-warning">Connexion</a>'+
                                    '</div>'+
                                '</form>'+
                                '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'

    return connectCreator
}

//Affichage le pop up de connexion
var connexionPage = function() {
    $("#ConnexionPage").html(fenetreConnection());
    $("#ConnexionPage").show()

    $("#buttonConnexion").click(() =>{
        Connexion()
    })
}

//Verifie si la connexion est OK
var Connexion = function(){

    if($("#inputIdentifiant").val() != "" && $("#inputPassword").val() != "")
    {
        const connexion = {
            "identifiant": $("#inputIdentifiant").val(),
            "password": $("#inputPassword").val() ,
        }

        var settings = {
            "url": url + connexionUrl,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(connexion),
        };
          
        $.ajax(settings).done(function (response) {
            console.log(response)
            if(response.code == "200")
            {   

                setCookie("nom",response.rowse[0].nom,3);
                setCookie("prenom",response.rowse[0].prenom,3);
                setCookie("email",response.rowse[0].mail,3);
                setCookie("telephone",response.rowse[0].telephone,3);
                setCookie("token",response.token,3);
                setCookie("identifiant",response.rowse[0].identifiant,3);
                setCookie("sexe",response.rowse[0].sexe,3);

                $("#form").html(messageForm())
                $("#submitButtonConnect").click(() =>{
                    verificationFormConnect()
                })

                navConnexion(response.rowse[0].identifiant,response.rowse[0].admin)

                $("#deconnexionBouton").click(function(e) {
                    console.log("test de Deconnexion")
                    Deconnexion()
                })


            }
            else if(response.code == "400")
            {
                $(".connexionInfo").html('<p class="text-center" ><code>'+response.erreur+'</code></p>');
            }
        });
    }
    else
    {
        $(".connexionInfo").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p>');
    }
}

//function qui gere la deconnexion de l'utilisateur
var Deconnexion = function(){

    supprimerCookie()
    navDeconnexion()

    $("#connectBouton").click(function(e) {
        connexionPage()
    })

    $("#buttonRegister").click(function(e) {
        VerifRegister()
    })

    $("#form").html(formCreator())
    $("#submitButton").click(() =>{
        console.log("tu as confirmer ton formulaire mais tu n'es pas connecter")
        verificationForm()
    })
}

//methode qui supprime le cookie avec son nom
var supprimerCookie = function(){
    rmCookie("nom")
    rmCookie("prenom")
    rmCookie("email")
    rmCookie("telephone")
    rmCookie("identifiant")
    rmCookie("sexe")
    rmCookie("token")
}

//Modification du nav pour ajouter le compte & modifier le bouton en Deconnexion
function navConnexion(data, admin=false) {
    $("#ConnexionPage").modal('hide');
    let navCreator
    if(admin == false)
    {
        navCreator = '<a class="navbar-brand" href="annonces.html"><h4 class="rainbow-text" >JobBoard</h4></a>'+
                    '<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">'+
                    '<span class="navbar-toggler-icon"></span>'+
                    '</button>'+

                    '<div class="navbar-collapse collapse" id="navbarsExample05" style="">'+
                    '<ul class="navbar-nav mr-auto">'+
                        '<li class="nav-item active">'+
                        '<h2 class="rainbow-text" >🤖</h2>'+
                        '</li>'+
                    '</ul>'+
                    '<a href="panel.html"><button id=panelbouton class="btn btn-outline-primary my-2 my-sm-0 ">' + data +'</button></a>'+
                        '<div id="NavConnexion">'+
                            '<button id=deconnexionBouton class="btn btn-outline-danger my-2 my-sm-0 ">Deconnexion</button>'+
                        '</div>'+
                    '</div>'
    }
    else
    {
    navCreator = '<a class="navbar-brand" href="annonces.html"><h4 class="rainbow-text" >JobBoard</h4></a>'+
                '<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">'+
                '<span class="navbar-toggler-icon"></span>'+
                '</button>'+

                '<div class="navbar-collapse collapse" id="navbarsExample05" style="">'+
                '<ul class="navbar-nav mr-auto">'+
                    '<li class="nav-item active">'+
                    '<h2 class="rainbow-text" >🤖</h2>'+
                    '</li>'+
                '</ul>'+
                '<a href="admin.html"><button id=adminButton class="btn btn-outline-warning my-2 my-sm-0 ">Admin</button></a>'+
                '<a href="panel.html"><button id=panelbouton class="btn btn-outline-primary my-2 my-sm-0 ">' + data +'</button></a>'+
                    '<div id="NavConnexion">'+
                        '<button id=deconnexionBouton class="btn btn-outline-danger my-2 my-sm-0 ">Deconnexion</button>'+
                    '</div>'+
                '</div>'
    }

    $(".navbar").html(navCreator);
}

//Modification du nav pour enlever le compte
function navDeconnexion() {

    let navCreator = '<a class="navbar-brand" href="annonces.html"><h4 class="rainbow-text" >JobBoard</h4></a>'+
    '<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">'+
      '<span class="navbar-toggler-icon"></span>'+
    '</button>'+

    '<div class="navbar-collapse collapse" id="navbarsExample05" style="">'+
      '<ul class="navbar-nav mr-auto">'+
        '<li class="nav-item active">'+
          '<h2 class="rainbow-text" >🤖</h2>'+
        '</li>'+
      '</ul>'+
        '<div id="NavConnexion">'+
          '<button id=connectBouton class="btn btn-outline-warning my-2 my-sm-0 " data-toggle="modal" data-target="#ConnexionPage">Se connecter</button>'+
        '</div>'+
    '</div>'

    $(".navbar").html(navCreator);
}

//Test si l'email rentré est valide
function checkEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

//methode appelé lorsque l'utilisateur click sur les detailles du job
function detailJob(data){
    let creationDetailJob = ""

    //test si le cookie de connexion existe
    if(getCookie("nom") == null && getCookie("prenom") == null && getCookie("email") == null && getCookie("telephone") == null)
    {
        //utilisateur pas connecté
        creationDetailJob = informationCard(data) + formCreator()
        $("#submitButton").click(() =>{
            verificationForm()
        })
    }
    else
    {
        //utilisateur connecté
        creationDetailJob = informationCard(data) + messageForm()
        $("#submitButtonConnect").click(() =>{
            verificationFormConnect()
        })
    }

    $("#detailJob").html(creationDetailJob);
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

//supprimer cookie de connexion en le ciblant par son nom
function rmCookie(name){
    document.cookie = name + "=" + ";"  + 'expires=Thu, 01 Jan 1970 00:00:00 UTC' + "; path=/";
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

//function qui verifie que le formulaire et valide
function VerifRegister(){

    //test si les champ Entrer sont valides
    if(checkEmail($("#inputEmail").val()) && $("#inputFirstName").val().trim() != "" && $("#inputLastName").val().trim() != "" && /^[0-9]{10}$/.test($("#inputPhone").val()) && $("#inputUsername").val().trim() != "" && $("#inputPassword").val().trim() != "" && $("#inputPassword").val() == $("#inputConfirmPassword").val())
    {
        var boutons = document.getElementsByName('genre');
        var radioValue;
        for(var i = 0; i < boutons.length; i++){
            if(boutons[i].checked){
            radioValue = boutons[i].value;
            }
        }

        console.log(radioValue)

        const user = {
            "firstName": $("#inputFirstName").val().trim(),
            "lastName": $("#inputLastName").val().trim(),
            "email": $("#inputEmail").val(),
            "tel": $("#inputPhone").val(),
            "userName": $("#inputUsername").val(),
            "password": $("#inputPassword").val(),
            "gender": radioValue
        }

        var settings = {
            "url": url + registerUrl,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(user),
        };
          
        $.ajax(settings).done(function (response) {
            console.log(response)
            if(response.code == "200")
            {   
                console.log("ok")
                document.location.href="annonces.html";
            }
        });
    }
    else
    {
        $("#messageRegister").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p>');
    }
}

//function qui verifie si utilisteur et connecter grace au token (executer des que la page html et chargé)
function authentification(){
    const tokenConnexion = {
        "token":getCookie("token"),
    }

    var settings = {
        "url": url + authentificationUrl,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(tokenConnexion),
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response)
        if(response.code == "200")
        {   
            $("#form").html(messageForm())
            $("#ConnexionPage").html(fenetreConnection());
            $("#submitButtonConnect").click(() =>{
                verificationFormConnect()
            })
            
            navConnexion(getCookie("identifiant"), response.requeteAdmin[0].admin)

            $("#deconnexionBouton").click(function(e) {  //@todo corriger bug modal ne se ferme pas.
                Deconnexion()
            })
        }
        else if(response.code == "400")
        {
            console.log("connexion automatique Impossible")
        }
    });
}

//Function executer lorsque la page a fini de charger
$(document).ready(function() {

    //click sur le bouton de connexion
    $("#connectBouton").click(function(e) {
        connexionPage()
    })

    $("#buttonRegister").click(function(e) {
        VerifRegister()
    })
    
    //recupere toutes les annonces
        $.get(url + annonce , function(data) {
            for(let job of data){
                $("#jobs").append(createJobads(job));
            }
            authentification()
        }).done( function() {
            //bouton qui affiche les detailles du job selectionner
            $(".detailJob").click(function(e) {
                $("#carousel").hide()
                $("#jobs").hide();
                idAnnonce = $(this).attr("id")
                $.get(url + information + $(this).attr("id"), function(data) {
                    detailJob(data)
                $("#detailJob").show()
                }).done( function() {
                $("#backPage").click(() =>{
                    $("#jobs").show();
                    $("#carousel").show()
                    $("#detailJob").html("");
                });

                $("#submitButtonConnect").click(() =>{
                    verificationFormConnect()
                })

                $("#submitButton").click(() =>{
                    verificationForm()
                })

            })
        })
    })
}); 