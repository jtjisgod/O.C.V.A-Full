<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>

        <div> ######## CSRF / XSS ######## </div>
        <div><a href="./vuln1.php?input=echo">VULN1</a></div>
        <div><a href="./vuln2.php?input=echo">VULN2</a></div>
        <div><a href="./vuln3.php?input=echo&amp;a=123">VULN3</a></div>
        <div><a href="./vuln4.php?input=echo&amp;a=123">VULN4</a></div>
        <div><a href="./vuln5.php?input1=id&amp;input2=pass&amp;input3=looo">VULN5</a></div>

        <br>
        <br>

        <div> ######## Command Line Injection ######## </div>
        <div><a href="./vuln6.php?input=./">VULN6</a></div>
        <div><a href="./vuln7.php?input=127.0.0.1">VULN7</a></div>
        <div><a href="./vuln8.php?input=127.0.0.1">VULN8</a></div>

    </body>
</html>
