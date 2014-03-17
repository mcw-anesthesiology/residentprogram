<?php 
	session_start(); 
	ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	if(empty($_SESSION["username"])){ 
	header("Location: index.php"); 
	}
	if(!isset($_GET["request"]))
		header("Location: dashboard.php");
	else
		$requestId = $_GET["request"];
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
      <form role="form" method="post" action="process_completion.php?request=<?= $requestId ?>">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
					<td>I am evaluating the resident</td>
					<td><input type="radio" name="q1" value="1">based on one case</input></td>
					<td><input type="radio" name="q1" value="2">based on one day</input></td>
					<td><input type="radio" name="q1" value="3">for the rotation month</input></td>
              </tr>
              <tr>					
					<td>Based upon my work with this resident, I feel that they are performing at the following training level.</td>
					<td><input type="radio" name="q2" value="1">Intern</input></td>
					<td><input type="radio" name="q2" value="2"></input></td>
					<td><input type="radio" name="q2" value="3">CA-1</input></td>
					<td><input type="radio" name="q2" value="4"></input></td>
					<td><input type="radio" name="q2" value="5">CA-2</input></td>
					<td><input type="radio" name="q2" value="6"></input></td>
					<td><input type="radio" name="q2" value="7">CA-3</input></td>
					<td><input type="radio" name="q2" value="8">Attending</input></td>
              </tr>
              <tr>					
					<td>This resident communicates effectively with patient, family, colleagues, staff; a team player.</td>
					<td><input type="radio" name="q3" value="1">Intern</input></td>
					<td><input type="radio" name="q3" value="2"></input></td>
					<td><input type="radio" name="q3" value="3">CA-1</input></td>
					<td><input type="radio" name="q3" value="4"></input></td>
					<td><input type="radio" name="q3" value="5">CA-2</input></td>
					<td><input type="radio" name="q3" value="6"></input></td>
					<td><input type="radio" name="q3" value="7">CA-3</input></td>
					<td><input type="radio" name="q3" value="8">Attending</input></td>
              </tr>
              <tr>					
					<td>The resident demonstrates a commitment to the institution, themselves and society by maintaining personal, emothional, physical and mental health.</td>
					<td><input type="radio" name="q4" value="1">Yes</input></td>
					<td><input type="radio" name="q4" value="2">No</input></td>
					<td><input type="radio" name="q4" value="3">Did not observe</input></td>
              </tr>
              <tr>					
					<td>This resident demonstrated procedural skills appropriate for the following level of training.</td>
					<td><input type="radio" name="q5" value="1">Intern</input></td>
					<td><input type="radio" name="q5" value="2"></input></td>
					<td><input type="radio" name="q5" value="3">CA-1</input></td>
					<td><input type="radio" name="q5" value="4"></input></td>
					<td><input type="radio" name="q5" value="5">CA-2</input></td>
					<td><input type="radio" name="q5" value="6"></input></td>
					<td><input type="radio" name="q5" value="7">CA-3</input></td>
					<td><input type="radio" name="q5" value="8">Attending</input></td>
              </tr>
              <tr>					
					<td>This resident possesses a fund of knowledge appropriate for the following level of training; they are able to apply knowledge to clinical situations appropriate to the level of training indicated below.</td>
					<td><input type="radio" name="q6" value="1">Intern</input></td>
					<td><input type="radio" name="q6" value="2"></input></td>
					<td><input type="radio" name="q6" value="3">CA-1</input></td>
					<td><input type="radio" name="q6" value="4"></input></td>
					<td><input type="radio" name="q6" value="5">CA-2</input></td>
					<td><input type="radio" name="q6" value="6"></input></td>
					<td><input type="radio" name="q6" value="7">CA-3</input></td>
					<td><input type="radio" name="q6" value="8">Attending</input></td>
              </tr>
              <tr>
					<td>This resident responded rapidly and appropriately to critical situations; they demonstrated sound clinical judgment reflective of the following level of training.</td>
					<td><input type="radio" name="q7" value="1">Intern</input></td>
					<td><input type="radio" name="q7" value="2"></input></td>
					<td><input type="radio" name="q7" value="3">CA-1</input></td>
					<td><input type="radio" name="q7" value="4"></input></td>
					<td><input type="radio" name="q7" value="5">CA-2</input></td>
					<td><input type="radio" name="q7" value="6"></input></td>
					<td><input type="radio" name="q7" value="7">CA-3</input></td>
					<td><input type="radio" name="q7" value="8">Attending</input></td>
              </tr>
              <tr>
					<td>This resident completed safe, thorough and comprehensive handoffs</td>
					<td><input type="radio" name="q8" value="1">Yes</input></td>
					<td><input type="radio" name="q8" value="2">No</input></td>
					<td><input type="radio" name="q8" value="3">Did not observe</input></td>
              </tr>
              <tr>
					<td>This resident was appropriately able to locate, appraise and assimilate evidence. They effectively used sources to support own learning. They appear motivated to read literature and apply knowledge to case discussion and management.</td>
					<td><input type="radio" name="q9" value="1">Intern</input></td>
					<td><input type="radio" name="q9" value="2"></input></td>
					<td><input type="radio" name="q9" value="3">CA-1</input></td>
					<td><input type="radio" name="q9" value="4"></input></td>
					<td><input type="radio" name="q9" value="5">CA-2</input></td>
					<td><input type="radio" name="q9" value="6"></input></td>
					<td><input type="radio" name="q9" value="7">CA-3</input></td>
					<td><input type="radio" name="q9" value="8">Attending</input></td>
              </tr>
              <tr>
					<td>The resident easily adapted to new rotations, systems, situations and practices reflective of the following level of training. Demonstrated the ability to effectively call on system resources to coordinate optimal patient care. Practiced cost-effective health care that does not compromise the quality of patient care.</td>
					<td><input type="radio" name="q10" value="1">Intern</input></td>
					<td><input type="radio" name="q10" value="2"></input></td>
					<td><input type="radio" name="q10" value="3">CA-1</input></td>
					<td><input type="radio" name="q10" value="4"></input></td>
					<td><input type="radio" name="q10" value="5">CA-2</input></td>
					<td><input type="radio" name="q10" value="6"></input></td>
					<td><input type="radio" name="q10" value="7">CA-3</input></td>
					<td><input type="radio" name="q10" value="8">Attending</input></td>
              </tr>
              <tr>
					<td>The resident has met the goals and objectives of the rotation relative to their level of training.</td>
					<td><input type="radio" name="q11" value="1">Yes, met expectations</input></td>
					<td><input type="radio" name="q11" value="2">Met expectations with concerns</input></td>
					<td><input type="radio" name="q11" value="3">Did not meet expectations</input></td>
              </tr>
              <tr>
					<td>Comments on the resident's performance -- their strengths and weaknesses. Be sure to explain all "unacceptable" and "needs improvement" ratings from the previous questions.</td>
					<td><textarea name="t1"></textarea></td>
              </tr>
              <tr>
					<td>Recommendations for future development of this resident.</td>
					<td><textarea name="t2"></textarea></td>
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
