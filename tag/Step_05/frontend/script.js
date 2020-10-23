//server Adresse + port
const url = "http://localhost:8080"

//url pour recuperer les annonces
const annonce = "/annonces"

//url pour recuperer les information de l'annnonce
const information = "/information/"

const add = "/add"

var idAnnonce = ""

//crée les annonces
var createJobads = function (job) {
    let cardjob = '<div id="job" class="container annonce job' + job.idAnnonce + ' col-sm-8 mx-auto ">'+
                    '<h1>' + job.titre + '</h1>'+
                    '<p>' + job.description.substr(0,69) + ' ... </p>'+
                    '<p><a id="' + job.idAnnonce + '" class="detailJob btn btn-primary text-white" role="button">Learn More</a></p>'+
                '</div>'

    return cardjob
}

//crée les information de l'annonce selectionner
var informationCard = function (data) {
    let informationAds = '<div class="annonce row mb-3">'+
                    '<div class="col-md-8 themed-grid-col">'+
                    '<a id=backPage class="btn btn-primary text-white" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-90deg-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                        '<path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>'+
                     '</svg></a>'+
                        '<h1>' + data[0].titre +'</h1>'+
                        '<p>' + data[0].description+ '</p>'+
                            '<p><button type="button" class="btn btn-success " data-toggle="modal" data-target="#exampleModalLong">'+
                            '  Postuler  '+
                          '</button></p>'+
                    '</div>'+
                    '<div class="col-md-4 themed-grid-col border-left">'+
                        '<p><code>↳ date:</code> ' + data[0]['date_format(date, "%d/%m/%Y à %H:%i")'] +
                        '<br><br><code>↳ Entreprise:</code> ' + data[0].nom +
                        '<br><br><code>↳ adresse:</code> ' + data[0].rue + " "+ data[0].codePostal + " "+ data[0].ville + " "+
                        '<br><br><code>↳ site:</code> <a href="https://' + data[0].site +'"  > https://' + data[0].site + '</a></p>'+
                        '<br><code>↳ Salaire:</code> ' + data[0].salaire +
                    '</div>'

    return informationAds
}

//methode qui genere le formulaire
var formCreator = function() {
    let form = '<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">'+
                '<div class="modal-dialog" role="document">'+
                    '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>'+
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
                            '<label class="text-dark" for="inputAdresse">Email address</label>'+
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

//verifie si le formulaire et valide
var verificationForm = function(){

    //verification des information du form
    if($("#inputNom").val().trim() != "" && $("#inputFirstName").val().trim() != "" && /^[0-9]{10}$/.test($("#inputTel").val()) && checkEmail($("#inputEmail").val()) && $("#inputMessage").val().trim() != "")
    {
        const personne = {
            "nom": $("#inputNom").val(),
            "prenom": $("#inputFirstName").val() ,
            "email": $("#inputEmail").val() ,
            "tel": $("#inputTel").val() ,
            "message": $("#inputMessage").val(),
            "idAnnonce": idAnnonce,
        }

        var settings = {
            "url": "http://localhost:8080/add",
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
    else
    {
        $(".buttonSubmit").html('<p class="text-center"><code>⟼ Un champ et incorrect ⟻</code></p><a id=submitButton class="btn btn-primary">Submit</a>');
        $("#submitButton").click(() =>{
            verificationForm()
        })
    }
}

//function qui verifie si l'email est valide en Regex
function checkEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

//Méthode executer lorsque le html est charger
$(document).ready(function() {
    //recupere toutes les annonces
        $.get(url + annonce , function(data) {
            for(let job of data){
                $("#jobs").append(createJobads(job));
            }
        }).done( function() {
            //button qui affiche les detailles du job
            $(".detailJob").click(function(e) {
                $("#jobs").hide();
                idAnnonce = $(this).attr("id")
                $.get(url + information + $(this).attr("id"), function(data) {
                    $("#detailJob").html(informationCard(data) + formCreator());
                $("#detailJob").show()
                }).done( function() {
                $("#backPage").click(() =>{
                    $("#jobs").show();
                    $("#detailJob").html("");
                });

                $("#submitButton").click(() =>{
                    verificationForm()
                })
            })
        })
    })
}); 