var url = "http://localhost:8080"

$(document).ready(function() {
            $(".detailJob").click(function(e) {
                $("#jobs").hide();
                    $("#detailJob").html('<div class="annonce row mb-3">'+
                    '<div class="col-md-8 themed-grid-col">'+
                        '<h1>SITE INTERNET</h1>'+
                        '<p> recherche web designer pour la réalisation d\'un site internet qui servira à mettre en avant des annonces pour des jobs</p>'+
                            '<p><a id=backPage class="btn btn-primary text-white" > Back</a></p>'+
                    '</div>'+
                    '<div class="col-md-4 themed-grid-col">'+
                        '<p>- date : 1-10-2020<br><br>- Entreprise: google.fr<br><br>- site: google.fr</p>'+
                    '</div>'+
                '</div>');
                $("#detailJob").show()

                $("#backPage").click(() =>{
                    $("#jobs").show();
                    $("#detailJob").html("");
                });
            })
}); 