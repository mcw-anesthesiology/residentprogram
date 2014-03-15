<?php 
  session_start(); 
  ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
  if(empty($_SESSION["username"])){ 
    header("Location: index.php"); 
  }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

<?php include 'header.php'; ?>

    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Complete Evaluation</h2>
      </div>
      <form role="form" method="post" action="process_completion.php">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <td>The resident demonstrates a commitment to the institution, themselves and society by maintaining personal, emotional, physical and mental health.</td>
                <td>
                <div class="btn-group" name="q1">
                  <button type="button" class="btn btn-default">Yes</button>
                  <button type="button" class="btn btn-default">No</button>
                  <button type="button" class="btn btn-default">Did No Obesrve</button>
                </div>
                </td>
              </tr>
              <tr>
                <td>This resident completed safe, thorough and comprehensive handoffs.</td>
                <td>
                <div class="btn-group" name="q2">
                  <button type="button" class="btn btn-default">Yes</button>
                  <button type="button" class="btn btn-default">No</button>
                  <button type="button" class="btn btn-default">Did No Obesrve</button>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
  </body>
</html>
