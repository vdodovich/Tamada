<?php
header('Access-Control-Allow-Origin: *');
require "db_conect.php";
require "sign.php";


$action = $_POST["action"];
$value = $_POST["value"];


if ($action=="sign") {
    admin::sign($value);
}

else if ($action=="add-number"){
   admin::addNumber($value);
}

else if ($action=="show-numbers"){
    admin::showNumbers();
}

else if ($action=="deleteItem"){
    admin::deleteItem($value);
}

