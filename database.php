<?php
    $connection = mysqli_connect(
        "localhost",
        "root",
        "",
        "tasks-app"
    );

    if(!$connection) {
        die("Error: " . mysqli_connect_error());
    } else {
       // echo "Connection successful";
    }
?>