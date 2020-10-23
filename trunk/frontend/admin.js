const urlServer = "http://localhost:8080"     //server Adresse + port

const selectTableUrl = "/selectTable/"  //chemin recuperer la table selectionner

const checkUrl = "/authentification"  //chemin pour tester le token de connexion

const deleteUrl = "/delete"            //chemin pour supprimer une table

const addElement = "/addLine/"          //ajouter depuis la page admin une ligne dans une table

const modifierURl = "/modifier"         //chemin de l'api pour modifier la Table

var key =""


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
        if(response.code == "200" && response.requeteAdmin[0].admin == 1)
        {   
            navConnexion(getCookie("identifiant"),response.requeteAdmin[0].admin)

            $("#deconnexionBouton").click(function(e) {
                Deconnexion()
            })
        }
        else if(response.code == "400" || response.requeteAdmin[0].admin == 0)
        {
            // document.location.href="annonces.html";
            document.getElementById("admin").innerHTML = '<div class="container">'+
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

//function qui recupere la table selectionner
function selectTable(){
    var boutons = document.getElementsByName('options');
        var radioValue;
        for(var i = 0; i < boutons.length; i++){
            if(boutons[i].checked){
            radioValue = boutons[i].value;
            }
        }
    console.log(radioValue)
    return radioValue
}

//function qui recupere la table selectionner
function getTable(table)
{
    let tableCreator = ""
    $.get(urlServer + selectTableUrl + table , function(data) {
        
        console.log(data)
    var keys = Object.keys(data[0])
    key = keys

    tableCreator =  "<table class='table table-responsive table-bordered table-striped'>"+
                        "<thead>"+
                            "<tr>"
    
    for(const prop of keys)
    {
        tableCreator += "<th>"+ prop +"</th>"
    }

    tableCreator +=     "</tr>"+
                        "</thead>"+
                        "<tbody>"
          
    for(let i = 0; i < Object.keys(data).length ; i++)
    {
        tableCreator +=  "<tr id=\""+ i +"\">"

        for(const prop of Object.keys(data[i]))
        {
            tableCreator += "<th id="+ i +" class=\"h6\" >"+ data[i][prop] +"</th>"
        }

        tableCreator += '<th id='+ i +' >'+
                        '<svg class="modifier" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>'+
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>'+
                        '</svg></th>'+
                        '<th id='+ i +' class=\"close\" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-octagon-fill" fill="red" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg></th></tr>'
    
    }

    for(const prop of keys)
    {
        tableCreator += '<th id="X"><input type="text" id="input'+ prop +'" name='+ prop +' placeholder="' + prop + '" class="form-control"></th>'
    }

    tableCreator +=   '<th id="X" class=\"add\"><svg id="ad" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/></svg></th>'+
                     "</tbody>"+ 
                    "</table>"

    $("#Table").html(tableCreator)

    updateButton()

    })
}

//methode qui met a jour les bouton dans la table
function updateButton()
{
    $(".close").click(function(e) {
        let id = $(this).attr("id")
        //console.log("idchamp: " + $(this).attr("id").first().value())
        let search = "th[id='" + id + "']"
        console.log(search)
        let bal = $(search).first()[0].innerText
        deleteTable(bal,selectTable())
    })

    $(".add").click(function(e) {
        let id = $(this).attr("id")
        console.log(id)
        addLine(id)
    })

    $(".modifier").click(function(e) {
        modifierColumn($(this).parent())
        console.log($(this).parent())
    })
}

//methode utiliser pour modifier une column
function modifierColumn(html){

    let search = "th[id='" + html.attr("id") + "']"
    let bal = $(search)

    html[0].innerHTML = '<svg class="modifierConfirm" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                        '<path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>'+
                        '</svg>'


    for(let i=1; i < (bal.length-2) ;i++)
    {
        let test = bal[i].innerHTML
        // console.log(bal[i].innerHTML)
        bal[i].innerHTML = '<input value="'+ test +'" type="text" class="form-control">'
    }

    // htmlselector.html('<input value='+ html +' type="text">')
    $(".modifierConfirm").click(function(e) {
        console.log("fghjk")
        confirmModification($(this).parent())
    })
}

//methode qui confirme la modification de la ligne 
function confirmModification(parent){
    let search = "th[id='" + parent.attr("id") + "']"
    let bal = $(search)

    let Table = "{"

    Table += '"'+ key[0] +'":"'+ bal[0].innerHTML +'", '

    for(let i=1; i < (bal.length-2) ;i++)
    {

        // let balise = bal[i].children[0].value
        // console.log(test+ "   " + key[i])
        Table += '"'+ key[i] +'":"'+ bal[i].children[0].value +'", '

    }
    Table += '"table":"'+ selectTable() + '"'
    
    // Table = Table.slice(0,-2)

    Table += "}"
    console.log(Table)
    sendModification(Table)
}

//methode qui envoie les modification de la ligne
function sendModification(Table){
    var settings = {
        "url": urlServer + modifierURl,
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": Table,
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response)
        if(response.code == "200")
        {   
            getTable(selectTable())
        }
        if(response.code == "400")
        {   
            $("#infoRequete").html("<code>" + response.message + "</code>")
        }
    })
}

// ajouter une ligne dans une table selectionner
function addLine(id) {

    let Table = "{"
    let search = ""

    for(const prop of key)
    {
        search = "input[id='input" + prop + "']"

        if($(search)[0].value != "")
        {
            Table += '"'+ prop +'":"'+ $(search)[0].value +'", '
            // console.log(Table)
        }
    }
    
    Table = Table.slice(0,-2)

    Table += "}"
    console.log(Table)

    var settings = {
        "url": urlServer + addElement + selectTable(),
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": Table,
    };
      
    $.ajax(settings).done(function (response) {
        console.log(response)
        if(response.code == "200")
        {   
            getTable(selectTable())
        }
        if(response.code == "400")
        {   
            $("#infoRequete").html("<code>" + response.message + "</code>")
        }
    })
}

//supprimer une ligne d'une table selectionner
function deleteTable(id,table) {
    const Table = {
        "id":id,
        "table":table
    }

    var settings = {
        "url": urlServer + deleteUrl,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(Table),
    };
      
    $.ajax(settings).done(function (response) {
        if(response.code == "200")
        {   
            getTable(selectTable())
        }
    })
}

//Function executer lorsque la page a fini de charger
$(document).ready(function() {

    testUtilisateurValide()
    getTable(selectTable())

    $("#choixTable").click(function(e) {
        getTable(selectTable())
        console.log(this)
    })

    console.log(this)

});