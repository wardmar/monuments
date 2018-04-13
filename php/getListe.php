<!-- SQL table epoque made by Caroline -->
<!-- SQL table categories made by Laure -->
<!-- class Recherche by Laure -->
<?php

  class Recherche {
    public $epoque; // soit clic sur frise chrono, soit champ de recherche (si "par époque" coché)
    public $categorie; // bouton cliqué : église, château, site archéologique...
    public $lieu; //$_POST['lieu']; // région ou département cliqué sur la carte
    public $search;
    private $offset;
        // private $offset = $_GET['offset'];
        // est impossible car l'assignement arrive à la première lecture
        // seule une constante est alors possible, pas une variable
    private $type;
    private $conn;

    public function setValues() {
      $this->offset = $_GET['offset'];
      $this->type = $_GET['type'];
      $this->lieu = $_GET['lieu'];
      $this->categorie = $_GET['categorie'];
      $this->epoque = $_GET['epoque'];
      $this->search = $_GET['recherche'];
    }

    private function lanceRequete($SQLquery) {
      // $this->afficheDebug($SQLquery);
      $this->conn = connexion();
      $requete = $this->conn->prepare($SQLquery);
      $this->afficheResultat($requete);
      $this->conn=null;
    }

    public function query() {

// // // // // // // // // // // // // époque // // // // // // // // // // // // // //
        if (($this->epoque <> '') && ($this->type <> 'époque')) {
          // regexp '[abc]' signifie soit a soit b soit c : nos codes époques n'ont qu'un chiffre donc ok
          $queryEpoque = 'AND Monuments.CodeEpoque REGEXP "[' . $this->epoque . ']" ';
        } elseif ($this->type == 'époque') {
          $queryEpoque = 'AND Monuments.Siecle LIKE "%' . $this->search . '%" ';
        } else { $queryEpoque = ''; }

// // // // // // // // // // // // // lieu // // // // // // // // // // // // // //
        if ((strlen($this->lieu) < 4) && (strlen($this->lieu) > 0)              // clic sur département
            && ($this->type <> 'commune')) // pas de recherche "par commune"
        {
              $queryLieu = 'AND Monuments.INSEE REGEXP "^'. $this->lieu . '" ';
        }
        elseif ( (strlen($this->lieu) >= 4) && ($this->type <> 'commune') )     // clic sur région
        {
              $queryLieu = 'INNER JOIN Regions
                  ON LEFT(Monuments.INSEE, 2) = Regions.CodeDpt
                  AND Regions.Region = "' . $this->lieu . '" ';
        }
        elseif ($this->type == 'commune')                                       // recherche "par commune"
        {
              $queryLieu = 'AND Codes.Commune REGEXP "' . $this->search . '"';
        }
        else { $queryLieu = ''; }                                               // non renseigné

// // // // // // // // // // // // // mot-clé // // // // // // // // // // // // // //
        if ( ($this->type == 'nom') && ($this->search <> '') ) {
          $querySearch = 'AND Monuments.Appellation LIKE "%' . $this->search . '%" ';
        }
        else { $querySearch = ''; }

// // // // // // // // // // // // // catégorie // // // // // // // // // // // // // //
        if ($this->categorie <> '') {
          // La catégorie a été mise sur 2 chiffres, les différentes catégories étant isolées par des points-virgules
          // On veut tester chaque catégorie : on veut le cumul
          $categories = explode(';', $this->categorie);
          foreach ($categories as $key => $categorie) {
            if ($key == 0) $queryCat = 'AND Monuments.CodeCat LIKE "%' . $categorie . '%" ';
            // .= pour concaténer à lui-même
            else $queryCat .= 'OR Monuments.CodeCat LIKE "%' . $categorie . '%" ';
          }
        } else { $queryCat = ''; }
            $SQLquery = 'SELECT DISTINCT INSEE, Commune, Appellation, Siecle, IdMon FROM
                    (SELECT Monuments.Appellation AS Appellation,
                            Monuments.DetailSiecle AS Siecle,
                            Codes.Commune AS Commune,
                            Monuments.INSEE AS INSEE,
                            Codes.CodePostal AS Code,
                            Monuments.IdMon AS IdMon
                        FROM Monuments INNER JOIN Codes
                            ON Monuments.INSEE = Codes.INSEE '
                            . $querySearch . $queryEpoque . $queryCat . $queryLieu .
                    ') AS t LIMIT 15 OFFSET ' . ($this->offset * 15) ;
            $this->lanceRequete($SQLquery);
    } // query()

    // fonction appelée par d'autres fonctions dans la classe, donc privée
    // gère l'affichage de la liste de résultats
    private function afficheResultat($requete) {
      $requete->execute();
      $requete->setFetchMode(PDO::FETCH_ASSOC);
      $nbligne = 0;
      while($ligne = $requete->fetch()) {
          echo '<div class="ligne">';
          // selon la requête le département est renseigné ou non (utile ou non)
          if (strlen($this->lieu) > 3) $lieu = '<em>' . substr($ligne['INSEE'], 0, 2) . '</em> ' . $ligne['Commune'];
          else                        $lieu = $ligne['Commune'];
          echo '<p class="valeur">' . $lieu . '</p>';

          echo '<p class="valeur">' . substr($ligne['Appellation'], 0, 70) . '</p>';
          echo '<p class="valeur">' . substr($ligne['Siecle'], 0, 30) . '</p>';
          echo '<div id="info'. $ligne['IdMon'] . '">'. $ligne['IdMon'] . '</div>';
          echo '</div>';
          $nbligne++;
      }
      if ($this->offset > 0) echo '<input type="button" class="navig" id="precedent" value="Précédent">';
      if ($nbligne == 15) echo '<input type="button" class="navig" id="suivant" value="Suivant">';
      if ($nbligne == 0) echo '<br>Pas de résultat pour cette recherche.';
    } // afficheResultat()

    private function afficheDebug($query) {
      echo $query;
    }
  } // class Recherche

// connexion() contient tout ce qui est fixe dans l'ouverture de la requête base de donnée
function connexion() {
  // Comme on require un fichier depuis un fichier appelé par ajax depuis un autre répertoire etc
  // Bref comme c'est compliqué et que le chemin n'est jamais le bon
  // Avec dirname(__FILE__) on part du dossier dans lequel est ce fichier-ci pour chercher nos required
    require dirname(__FILE__) . '/param.php';
    require dirname(__FILE__) . '/connectionDB.php';

  // La connexion bien ouverte, on la renvoie à l'appeleur, ici dans la classe
    return $conn;
}

$recherche = new Recherche;
$recherche->setValues();
$recherche->query();

 ?>
