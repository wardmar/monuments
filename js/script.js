// variables pour revenir d'un cran en arrière lorsqu'on clique dans l'eau :
// le niveau de la carte à charger : France, région, département :
    var niveau = 0;
// le nom de la carte à charger
    var carte = '';

function showMap(lieu) {

  switch (lieu) {

    case "Bretagne":
      $('#map').load('img/dep/bretagne.svg')
      niveau = 1;
      break;
    case "Pays-de-la-Loire":
      $('#map').load('img/dep/payloire.svg')
      niveau = 1;
      break;
    case "Ile-de-France":
      $('#map').load('img/dep/iledef.svg')
      niveau = 1;
      break;
    case "Provence-Alpes-Cote-dAzur":
      $('#map').load('img/dep/provence.svg')
      niveau = 1;
      break;
    case "Corse":
      $('#map').load('img/dep/corse.svg')
      niveau = 1;
      break;
    case "Normandie":
      $('#map').load('img/dep/normandie.svg')
      niveau = 1;
      break;
    case "Hauts-de-France":
      $('#map').load('img/dep/hautdef.svg')
      niveau = 1;
      break;
    case "Grand-Est":
      $('#map').load('img/dep/grandest.svg')
      niveau = 1;
      break;
    case "Occitanie":
      $('#map').load('img/dep/occitanie.svg')
      niveau = 1;
      break;
    case "Auvergne-Rhone-Alpes":
      $('#map').load('img/dep/auvergne.svg')
      niveau = 1;
      break;
    case "Centre-Val-de-Loire":
      $('#map').load('img/dep/centre.svg')
      niveau = 1;
      break;
    case "Nouvelle-Aquitaine":
      $('#map').load('img/dep/nouvelleaqui.svg')
      niveau = 1;
      break;
    case "Bourgogne-Franche-Comte":
      $('#map').load('img/dep/bourgogne.svg')
      niveau = 1;
      break;
    case "France":
    // à revoir
      // if (niveau == 2) {
      //   niveau--
      //   lieu = $('#map svg').attr('id')
      //   carte = $('#map svg').attr("src")
      //   $('#map').load(carte)
      // }
      $('#map').load('img/map.svg')
      break;
    default:
      niveau = 2;
  }
}
