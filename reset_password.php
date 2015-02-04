<?php
    session_start();
    $_POST["action"] = "recoverPassword";
    include "init.php";
    $hash = $_GET["hash"];
    $result = $mysqli->query("select id from reset_password where hash='{$hash}'");
    if($result->num_rows != 1)
        header("Location: index.php");

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php
        include "head.html";
    ?>
</head>

  <body>

    <div class="container">

        <form class="form-signin" role="form" method="post" action="edit_password.php">
            <h2 class="form-signin-heading">Recover Password</h2>
            <input class="form-control" type="password" placeholder="New Password" name="newPassword" required autofocus>
            <input class="form-control" type="password" placeholder="Confirm Password" name="newPassword2" required>
            <input type="hidden" name="hash" value="<?= $hash ?>">
            <button class="btn btn-lg btn-primary btn-block" type="submit" name="action" value="recoverPassword">Change Password</button>
        </form>

    </div> <!-- /container -->


    <?php
        include "scripts.html";
    ?>
  </body>
</html>
