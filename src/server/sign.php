<?php


class admin{
    static function sign ($password) {
        $needpassword = R::findOne("password", "id=1");
        $needpassword=$needpassword->password;
        if ($password == $needpassword){
            echo json_encode(true);
        }
        else echo json_encode(false);
    }


    static function addNumber ($number) {
        if (R::findOne("numbers", "number=?" , [$number])) {
            echo json_encode(false);
        }
        else {
            $add=R::dispense("numbers");
            $add->number=$number;
            R::store($add);

            echo json_encode(true);
        }
    }


    static function showNumbers(){
      $numbers = R::findAll("numbers");
      $array = array();
      $counter = 0;
      foreach ($numbers as $item){
          $array[$counter] = $item->number;
          $counter++;
      }

      echo json_encode($array);
    }


    static function deleteItem($number) {
        R::exec("DELETE FROM numbers WHERE number=?", [$number]);
        echo json_encode("Deleting $number successful.");
    }

}
