<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <?php
    
    // $ch = curl_init();
$url = urlencode("chateau d'ars indre");
// curl_setopt($ch, CURLOPT_URL, "https://www.google.fr/search?hl=fr&q=".$url."&tbm=isch");
// curl_setopt($ch, CURLOPT_HEADER, false);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// $ret=curl_exec($ch);
// curl_close($ch);
$section = file_get_contents("https://www.google.fr/search?hl=fr&q=".$url."&tbm=isch");
$pattern = '/src="([^"]*)/';
preg_match_all($pattern, $section, $result, PREG_SET_ORDER, 0);

?>
<a href="https://www.qwant.com/?q=wiki+<?php echo $url; ?>&t=all">
<img src="<?php echo ($result[0][1]);  ?>"" alt="<?php echo $url; ?> " width="200px"></a>
</body>
</html>