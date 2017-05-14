<?php
    $param1 = $_GET['input1'];
    $param2 = $_GET['input2'];
    $param3 = $_GET['input3'];

    $param1 = htmlspecialchars($param1);
    $param3 = htmlspecialchars($param3);
?>
<input value="<?php echo $param1; ?>">
<input value="<?php echo $param2; ?>">
<input value="<?php echo $param3; ?>">
