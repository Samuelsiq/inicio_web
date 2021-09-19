<?php

    session_start();


    $usuarioValido = false;
    $usuarioId = null;
    $usuarioAdm= null;
    $usuariosApp = [
                ['email'=> 'samuelferrer19@gmail.com', 'senha' => 123 , 'id' => 0, 'adm'=> 1],
                ['email'=> 'user@teste.com', 'senha' => 123, 'id' => 1, 'adm' => 0]
    ];

    foreach ($usuariosApp as $usuario){
        if ( $usuario['email'] == $_POST['email']
            && $usuario['senha'] == $_POST['senha']){
            $usuarioValido = true;
            $usuarioId = $usuario['id'];
            $usuarioAdm = $usuario['adm'];
        }
        if (!$usuarioValido){
            $_SESSION['autenticado'] = 'NAO';
            header('Location: index.php?login=erro');
        }else{
            $_SESSION['autenticado'] = 'SIM';
            $_SESSION['id'] = $usuarioId;
            $_SESSION['adm'] = $usuarioAdm;

            header('Location: home.php');
        }
    }