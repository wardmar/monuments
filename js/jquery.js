// Code by Laure
// SVG Map by Alexis

// Initialisation JQuery
$(document).ready(function() {

//////// //////// //////// //////// //////// //////// //////// ////////
///// PARAMETRES A ENVOYER AU FICHIER PHP grâce à la requête AJAX /////
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\

    // lorsqu'on clique sur la carte
    var lieu = '';
    // lorsqu'on clique sur une époque dans la frise chronologique
    var epoque = '';
    // lorsqu'on clique une catégorie dans la frise des catégories
    var categorie = '';
    // si un type de recherche est coché
    var type = '';
    // on sait quoi chercher avec le contenu du champ de recherche
    var recherche = '';
    // si on considère qu'une requête ramène de quoi remplir une page de résultat, offset correspond à son numéro
    var offset = 0;


////// Pour traitement JS uniquement //////
    var nom_epoque = '';
    var nom_categorie = '';
    var lieu_survol = '';

// Au chargement de la page, on nettoie :
  $('#recherche').val('');
  $('#nom').prop('checked', true);


//////// //////// //////// //////// /////////
////////////////   CARTE  \\\\\\\\\\\\\\\\\\\
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\

// Affichage : un délai évite le chargement d'une carte géante et noire avant application du CSS //
    $('aside').fadeIn(1000);

// Affichage d'une étiquette informative mobile au survol //
    $('#map').on('mouseover','path',function(e){
      // Pour que l'étiquette "suive la souris", on récupère le paramètre "événement"
      // qui contient les coordonnées de la souris au moment du déclenchement de l'événement
      x = e.pageX;
      y = e.pageY - $('#map').offset().top;
      // pageX et pageY nous donnent la position de la souris au moment où la souris entre dans le champ du path
      // c'est une position relative à la page (or ici, top est défini relativement à son conteneur)
      // // voir aussi clientX et screenX
      lieu_survol = $(this).attr('id');
      if (lieu_survol != 'fond') {
        $('#etiquet-var').text(lieu_survol);
        $('#etiquet-var').css('left', x);
        $('#etiquet-var').css('top', y);
        // Une fois prête, on affiche
        $('#etiquet-var').fadeIn(100);
      }
      else {
        // Si on survole le fond, on cache l'étiquette qui ne sert qu'à embrouiller
        $('#etiquet-var').hide();
      }
    })

        // L'étiquette disparaît aussi si on sort de la carte
        $('#map').on('mouseout','path',function(){
          $('#etiquet-var').hide();
        })

// Affichage d'une étiquette ancrée et plus durable au clic //
// Affichage aussi, heureusement, d'un résultat ! //
    $('#map').on('click','path',function(){
      // Sur n'importe quel clic, on réinitialise l'offset : on refait une requête toute neuve
      offset = 0;
      // L'attribut du path coché donne commodément des informations exploitables pour la requête : un nom de région ou numéro de dpt
      lieu = $(this).attr('id');
      // Sauf si on clique sur le fond, on lance la requête
      // if (lieu != 'fond') {
        $('#listMonuments').html('');
        if (niveau < 2) niveau++;
        // Voici notre étiquette fixe
        $('#etiquet-fix').text(lieu);
        $('#etiquet-fix').fadeIn(100);
        // Le département coché devient rose, mais il faut auparavant redonner à tout autre département sa couleur initiale
        $('#map path').removeClass();
        $(this).addClass('depRose');
        // Le clic prend précédence sur le champ de recherche (c'est la dernière action)
        // Pour éviter les embrouilles dans le traitement, on décoche les boutons radio : la recherche ne sera pas active
        if ($('#commune').is(':checked')) { $('#commune').prop('checked', false); }
        // Appel à la fonction lançant la requête Ajax, en passant tous les paramètres, vides ou pleins
        listMonuments(lieu, epoque, categorie, type, recherche, offset);
      // } // si on clique sur le fond, la réinitialisation est prise en charge par la fonction "au clic" dans jquery.js
    })
    $('#map').on('click','rect',function() {
        $('#etiquet-fix').hide()
        $('#listMonuments').html('')
        lieu = ''
        listMonuments(lieu, epoque, categorie, type, recherche, offset);
    })

//////// //////// //////// //////// /////////
////////////////  CHRONO  \\\\\\\\\\\\\\\\\\\
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\

    $('#chronoFrise').on('click','path',function(){
      if ($('#type[name="epoque"]').is(':checked')) { $('#type').prop('checked', false); }
      offset = 0;
      // les époques peuvent se cumuler : si c'est le cas et qu'on coche plutôt qu'on ne décoche, on ajoute
      if ((epoque != '') && (!$(this).hasClass('coche') )) {
        // On affiche pour l'utilisateur le 'name', qui reprend le nom de l'époque
        // Et on range l'id correspondant à CodeEpoque dans la variable 'epoque', qui va servir à notre requête
        epoque += ';' + $(this).attr('id');
        nom_epoque += ' ; ' + $(this).attr('name');
      } // si on décoche, il faut retirer (c'est du pur javascript):
      else if ($(this).hasClass('coche')) {
        epoque = epoque.replace($(this).attr('id'), '');
        nom_epoque = nom_epoque.replace($(this).attr('name'), '');
        // on enlève les ';' solitaires avec un regex qui prend en compte : un ';' en début de chaîne, en fin de chaîne
        epoque = epoque.replace(/^;|;$/, '');
        nom_epoque = nom_epoque.replace(/^( ; )|( ; )$/, '');
        // on remplace également deux ';;' par un seul
        epoque = epoque.replace(/;;/, ';');
        nom_epoque = nom_epoque.replace(/( ;  ; )/, ' ; ');
      }
      else { // dernier cas : rien n'est rangé dans époque, on n'a pas besoin de ';', ni d'ajouter à l'existant
        epoque = $(this).attr('id');
        nom_epoque = $(this).attr('name');
      }
      // un clic => on ajoute la classe 'coche' à l'élément cliqué, devient bleu pour le visuel
      // deux clics => perd sa classe 'coche', reprend sa couleur d'origine
      $(this).toggleClass('coche');

      // Si le bouton radio 'epoque' était coché, on décoche (le clic sur la frise a précédence)
      if ($('#epoque').is(':checked')) {
        $('#epoque').prop('checked', false);
        $(':button').prop('disabled', true);
      }
      listMonuments(lieu, epoque, categorie, type, recherche, offset);
      $('#etiquet-frises').html(nom_epoque + '<span id="nom-cat"> ' + nom_categorie + '</span>');
    })


//////// //////// //////// //////// /////////
/////////////// CATEGORIES \\\\\\\\\\\\\\\\\\
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\

    $('#friseCat').on('click','path',function(){
      offset = 0;
      // même traitement que les époques
      if ((categorie != '') && (!$(this).hasClass('coche') )) {
        nom_categorie += ' ; ' + $(this).attr('id');
        categorie += ';' + $(this).attr('name');
      } else if ($(this).hasClass('coche')) {
        categorie = categorie.replace($(this).attr('name'), '');
        categorie = categorie.replace(/^;|;$/, '');
        categorie = categorie.replace(/;;/, ';');
        nom_categorie = nom_categorie.replace($(this).attr('id'), '');
        nom_categorie = nom_categorie.replace(/^( ; )|( ; )$/, '');
        nom_categorie = nom_categorie.replace(/( ;  ; )/, ' ; ');
      } else {
        nom_categorie = $(this).attr('id');
        categorie = $(this).attr('name');
      }
      $(this).toggleClass('coche');
      if ($('#type').is(':checked')) { $('#type').prop('checked', false); }
      listMonuments(lieu, epoque, categorie, type, recherche, offset);
      $('#etiquet-frises').html(nom_epoque + '<span id="nom-cat"> ' + nom_categorie + '</span>');
    });



//////// //////// //////// //////// /////////
////////////// CHAMP SEARCH \\\\\\\\\\\\\\\\\
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\
    $(':radio').click(function() {
      $(':button').prop('disabled', false);
    })
    $(':button').click(function() {
      verifSearchType()
    })
    // Sur touche entrée alors que bouton est sélectionné
    $(document).keypress(function(e) {
      offset = 0;
      if (e.which == 13) {
        verifSearchType()
      }
    });

    function verifSearchType() {
      // !!$(selector) est vrai si non vide et non undefined (rien de ce que j'ai essayé auparavant n'a marché)
      // bon vu que
      if ( (!!$(':radio:checked').val()) && $('#recherche').val() != '' ) {
        type = $(':radio:checked').val();
        recherche = $('#recherche').val();
        offset = 0;
        listMonuments(lieu, epoque, categorie, type, recherche, offset);
      }
      else {
        $('#recherche').css('box-shadow', '1px 1px 2px #901826;')
        $(':radio').css('box-shadow', '1px 1px 2px #901826;')
      }
    }
    // Sur clic des radio buttons : indications via placeholder

      // "par époque"
      $('#epoque').change(function() {
        $('#recherche').attr('placeholder', '12');
      })

      // "par commune"
      $('#commune').change(function() {
        $('#recherche').attr('placeholder', 'st andre');
      })

      // "par nom"
      $('#nom').change(function() {
        $('#recherche').attr('placeholder', 'tour eiffel');
      })

//////// //////// //////// //////// /////////
//////////////// RESULTAT \\\\\\\\\\\\\\\\\\\
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\

function listMonuments(lieu, epoque, categorie, type, recherche, offset) {

    console.log("lieu:" + lieu + " époque:" + epoque + " catégorie:" + categorie + " type:" + type + " recherche:" + recherche + " offset:" + offset)
    // On définit la requête
    if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

    // Si tout est prêt, on indique où afficher le retour (les 'echo' dans le php)
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#listMonuments").html(this.responseText);
        }
    };
    // On ouvre (formule) la requête : on précise la méthode et l'url du fichier à ouvrir
    // (on pourrait également passer les paramètres : 'async', nom d'utilisateur, mot de passe
    // Ici requête = méthode GET avec une URL bourrée de paramètres, mais rien de trop long
    // Si les variables à passer étaient trop volumineuses pour du GET, on aurait fait un POST
    xmlhttp.open("GET","php/getListe.php?lieu="+lieu+
                                        "&epoque="+epoque+
                                        "&categorie="+categorie+
                                        "&type="+type+
                                        "&recherche="+recherche+
                                        "&offset="+offset,
                                        true);
    // Envoie la requête au serveur (jamais de paramètre avec GET, toujours des paramètres avec POST)
    xmlhttp.send();
}

var idInfo = '';
$('#listMonuments').on('click', '.ligne', function() {
  idInfo = $(this).find("div").attr("id");
  // "[id^=info]"
  detailMonument($('#'+idInfo).text());
  $('#'+idInfo).fadeIn();
  // $('#'+idInfo).css('color', 'black')
});


function detailMonument(id) {
  $.ajax({
      type: "GET",
      url: "php/getInfo.php?id="+id,
      dataType: "html",   //expect html to be returned
      success: function(response){
          $('#'+idInfo).html(response);
      }
  });
}


//////// //////// //////// //////// /////////
/////////////// NAVIGATION \\\\\\\\\\\\\\\\\\
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\

  // $('#suivant').click(function(){}) ne marche pas, il faut passer par le "on".
  // Idem pour tous les autres. Pourquoi ?
    $(document).on('click','#suivant', function() {
      navig(1);
      // Pour éviter un Suivant en cascade, on met un délai de 1 seconde
    })
    $(document).on('click','#precedent', function() {
      // Pour éviter un Précédent en cascade.. et on ne remonte pas plus loin que la "page 1"
      if (offset > 0) navig(-1);
    })

    function navig(dir) {
      // on ajoute ou retire un selon la direction passée en paramètre (suivant ou précédent)
      offset += dir;
      // on relance la requête avec l'offset incrémenté
      listMonuments(lieu, epoque, categorie, type, recherche, offset);
      console.log('offset = ' + offset);
    }

//////// //////// //////// //////// //////// //////// ////////
//// AUTRE SYNTAX EQUIVALENTE POUR LA REQUETE AJAX :    ////
  //   $.ajax({    //create an ajax request to display.php
  //     type: "GET",
  //     url: "php/getListe.php?lieu="+lieu+"&epoque="+epoque+"&categorie="
  //                                  +categorie+"&type="+type+"&recherche="
  //                                  +recherche+"&offset="+offset,
  //     dataType: "html",   //expect html to be returned
  //     success: function(response){
  //         $("#listMonuments").html(response);
  //     }
  // });
//\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\ \\\\\\\\\

});
