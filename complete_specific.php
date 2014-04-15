<?php 
	//TODO: Make button to show hover text when on a mobile device.
	session_start(); 
	require "init.php";
	if(!isset($_GET["request"]))
		header("Location: dashboard.php");
	else
		$requestId = $_GET["request"];
	
	$request = $mysqli->query("select * from requests left join users on requests.resident=users.username where requestId='{$requestId}';")->fetch_assoc();
	$evaluation = $mysqli->query("select * from evaluations where requestId='{$requestId}';")->fetch_assoc();
	$form = $mysqli->query("select location from forms inner join requests on forms.formId=requests.formId where requestId='{$requestId}';")->fetch_assoc(); 
	$formLocation = $form["location"];
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">

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
	<style>
		textarea{
			width:100%;
			resize: none;
		}
		.description{ background-color: #FFDDAA; }
    </style>
  </head>

  <body>

<?php include 'header.php'; ?>

  <div class="container-fluid">
    <div class="row">
      <h2 class="sub-header">Complete Evaluation</h2>
    </div>
    <div class="table-responsive">
      <h4 class="sub-header">Currently Completing</h4>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Resident</th>
              <th>Request Date</th>
              <th>Training Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><?= $requestId ?></td>
              <td><?= $request["firstName"] ?> <?= $request["lastName"] ?></td>
              <td><?= $request["requestDate"] ?></td>
              <td><?= $request["trainingLevel"] ?></td>
            </tr>         
          </tbody>
        </table>
        <br>
        <h4 class="sub-header">Evaluation</h4>
      </div>
      <form role="form" method="post" action="process_completion.php">
        <div class="table-responsive">
 		<?php require "form_reader.php"; ?>
 		</div>
        <button type="submit" name="requestId" value="<?= $requestId ?>" class="btn btn-default">Submit</button>
      </form>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script>
		$("form").submit(checkForm);
		
		function checkForm(){
			var validForm = true;
			var alertText = "";
			$("input:radio").each(function(){
				var name = $(this).attr("name");
				if($("input:radio[name="+name+"]:checked").length == 0){
					$(this).focus();
					alertText = "Please complete each question";
					validForm = false;
				}
			});
			$("textarea").each(function(){
				if(this.value === ""){
					$(this).focus();
					alertText = "Please complete each question";
					validForm = false;
				}
			});
			if(!validForm)
				alert(alertText);
			return validForm;
		}
		
		$(".toggleDescriptions").click(function(){
			var questionName = $(this).data("id");
			$("."+questionName).toggle();
		});
    </script>
  </body>
</html>
