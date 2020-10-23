//server Adresse + port
const url = "http://localhost:8080" 
//url pour recuperer les annonces
const annonce = "/annonces"
//url pour recuperer les information de l'annnonce
const information = "/information/"

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
    let information = '<div class="annonce row mb-3">'+
                    '<div class="col-md-8 themed-grid-col">'+
                    '<a id=backPage class="btn btn-primary text-white" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-90deg-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                        '<path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>'+
                     '</svg></a>'+
                        '<h1>' + data[0].titre +'</h1>'+
                        '<p>' + data[0].description+ '</p>'+
                            '<p><button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">'+
                            '  Postuler  '+
                          '</button></p>'+
                    '</div>'+
                    '<div class="col-md-4 themed-grid-col">'+
                        '<p>- date : 30-10-2000<br><br>- Entreprise: google.fr<br><br>- site: google.fr</p>'+
                    '</div>'

    return information
}

$(document).ready(function() {
    //recupere toutes les annonces
        $.get(url + annonce , function(data) {
            for(let job of data){
                $("#jobs").append(createJobads(job));
            }
        }).done( function() {
            $(".detailJob").click(function(e) {
                $("#jobs").hide();
                $.get(url + information + $(this).attr("id"), function(data) {
                    $("#detailJob").html(informationCard(data));
                $("#detailJob").show()
                }).done( function() {
                $("#backPage").click(() =>{
                    $("#jobs").show();
                    $("#detailJob").html("");
                });
            })
        })
    })
}); 

