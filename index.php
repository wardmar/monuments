<!-- Mockup by Gautier Alexis Caroline Laure -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/ico" href="img/monu_hist.ico">
  <link rel="stylesheet" media="screen and (min-width: 781px)" href="css/screen.css">
  <link rel="stylesheet" media="screen and (max-width: 780px)" href="css/phone.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/map.css">
  <link rel="stylesheet" href="css/fonts.css">
  <link href="https://fonts.googleapis.com/css?family=Caesar+Dressing|Raleway|Redressed" rel="stylesheet">
  <title>Monuments d'ici et d'hier</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
  <script type="text/javascript" src="js/script.js" async></script>
  <script type="text/javascript" src="js/jquery.js" defer></script>
</head>
<body>

  <header>
        <h1>Monuments d'ici et d'hier</h1>
        <?php include_once 'img/chrono.svg'; ?>
        <div id="legendes">
              <span id="pre">Prehistoire</span>
              <span id="proto">Proto <small>histoire</small></span>
              <span id="anti">Antiquité</span>
              <span id="m-age">Moyen-Age</span>
              <span id="temps">Temps modernes</span>
        </div>
        <?php include_once "img/categories.svg"; ?>
        <p id="etiquet-frises"></p>
  </header>

  <main>
   <aside id="select" hidden>
         <p id="etiquet-fix" hidden>France</p>
         <p id="etiquet-var" hidden></p>
         <div id="map" >
           <?php include "img/map.svg"; ?>
         </div>
           <input type="search" name="search" placeholder="Chercher" id="recherche" autofocus/>
           <input type="button" name="go" value="Go!" disabled/>
           <div id="radio">
             <label for="commune">par commune</label>
             <input type="radio" name="type" value="commune" id="commune" class="type">
             <label for="epoque"> par époque</label>
             <input type="radio" name="type" value="époque" id="epoque" class="type">
             <label for="nom"> par nom</label>
             <input type="radio" name="type" value="nom" id="nom" class="type" checked>
           </div>
         <!-- </form> -->
    </aside>

    <div id="fenetre">

      <div id = "listMonuments">
        <!-- Liste des monuments issus de la recherche -->
      </div>

    </div>

  </main>

</body>
</html>
