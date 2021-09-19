<?php
    session_start();

   $texto = $_SESSION['id']. '#' . $_POST['titulo'] .'#'. $_POST['categoria'] .'#'. $_POST['descricao'] . PHP_EOL;
   $arquivo = fopen('appDesk.txt', 'a');
   fwrite($arquivo, $texto);
   fclose($arquivo);
   header('Location: abrir_chamado.php');