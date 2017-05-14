<?php
    set_time_limit(5);
    $param = $_GET['input'];
    $res = exec("ping -W 3 -c 3 ".$param."");
    if($res) {
        echo "True";
    } else {
        echo "False";
    }
?>
