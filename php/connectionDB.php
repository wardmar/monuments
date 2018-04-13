<?php

try
{
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e)
{
        die('Erreur : ' . $e->getMessage());
}


// $conn = mysqli_connect('localhost','Dev','luwasx18500','Monu');
// if (!$conn) {
//     die('Could not connect: ' . mysqli_error($conn));
// }

?>
