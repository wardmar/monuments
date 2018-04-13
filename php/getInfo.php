<!-- GoogleImage by Alexis -->
<!--  -->

<?php

class Info {
  public $IdMon;

  public function getInfo() {
      $this->conn = connexion();
      $requete = $this->conn->prepare('SELECT * FROM Info WHERE IdMon = "'. $info->IdMon . '"');
      $this->afficheResultat($requete);
      $conn=null;
    }

  // gère l'affichage des infos détaillées pour le monument sélectionné
  public function afficheResultat($requete) {
    // $requete->execute();
    // $requete->setFetchMode(PDO::FETCH_ASSOC);
    // while($ligne = $requete->fetch()) {
    //     echo '<div class="ligne">';
    //     echo '<div id="info'. $ligne['DetailSiecle'] . '<img src="http://via.placeholder.com/900x650"></div>">';
    //     echo '<p>' . $ligne['DetailSiecle'] . '</p>';
    //     echo '</div>';
    // }
    // $forSearch = urlencode($ligne['Appellation'] . $ligne['Commune']);
    $forSearch = urlencode('Commune');
    $pageGoogle = file_get_contents("https://www.google.fr/search?hl=fr&q=".$forSearch."&tbm=isch");
    $pattern = '/src="([^"]*)/';
    preg_match_all($pattern, $pageGoogle, $GoogleImage, PREG_SET_ORDER, 0);
    echo '<div id="flexblock">
            <div id="details">
              <p>datation :</p>
              <p>adresse :</p>
              <p>affectataire :</p>
              <p>auteur :</p>
              <p>inscrit/classé :</p>
            </div>
            <div id="essentiel">
              <p>appellation :</p>
              <p>détail protection :</p>
            </div>
            <a href="https://www.qwant.com/?q=wiki+' . $forSearch . '?>&t=all">
              <img src="'. $GoogleImage[0][1] .'" alt="'.$QwantSearch.'"></a>
          </div>';
  }
}

$info = new Info;
$info->IdMon = $_GET['id'];
// $info->getInfo();
$info->afficheResultat();

?>
