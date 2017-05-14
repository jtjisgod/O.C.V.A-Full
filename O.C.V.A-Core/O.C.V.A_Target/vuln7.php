<?php
    $param = $_GET['input'];
    echo system("ping -c 3 -W 3 ".$param." 2>&1")
?>
