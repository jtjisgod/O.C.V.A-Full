<?php
    $param = $_GET['input'];
    echo system("ls -al ".$param." 2>&1")
?>
