<?php
    $email = $_POST["email"];
    $password = $_POST["password"];

    if($email != "" && $password != ""){
        echo "Email or password is null (return to <a href='https://jar-js.vercel.com/'>home</a>)";
    }

    $body = "
        
    ";

    mail($email,"JarJS Create Acount",$body)
?>