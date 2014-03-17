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
	<style>
		textarea{
			width:100%;
			resize: none;
		}
    </style>
  </head>

  <body>

<?php include 'header.php'; ?>

    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Complete Evaluation</h2>
      </div>
      <form role="form" method="post" action="process_completion.php?request=<?= $requestId ?>">
        <div class="table-responsive">
 		<!-- Question 1 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="3"><b>Q1:</b> I am evaluating the resident</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q1" value="1"><br>based on one case</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q1" value="2"><br>based on one day</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q1" value="3"><br>for the rotation month</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 2 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="8"><b>Q2:</b> Based upon my work with this resident, I feel that they are performing at the following training level.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="1"><br>Intern</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="2"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="3"><br>CA-1</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="4"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="5"><br>CA-2</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="6"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="7"><br>CA-3</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q2" value="8"><br>Attending</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 3 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="8"><b>Q3:</b> This resident communicates effectively with patient, family, colleagues, staff; a team player.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="1"><br>Intern</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="2"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="3"><br>CA-1</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="4"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="5"><br>CA-2</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="6"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="7"><br>CA-3</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q3" value="8"><br>Attending</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 4 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="3"><b>Q4:</b> The resident demonstrates a commitment to the institution, themselves and society by maintaining personal, emothional, physical and mental health.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q4" value="1"><br>Yes</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q4" value="2"><br>No</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q4" value="3"><br>Did Not Obesrve</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 5 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="8"><b>Q5:</b> This resident demonstrated procedural skills appropriate for the following level of training.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="1"><br>Intern</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="2"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="3"><br>CA-1</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="4"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="5"><br>CA-2</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="6"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="7"><br>CA-3</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q5" value="8"><br>Attending</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 6 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="8"><b>Q6:</b> This resident possesses a fund of knowledge appropriate for the following level of training; they are able to apply knowledge to clinical situations appropriate to the level of training indicated below.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="1"><br>Intern</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="2"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="3"><br>CA-1</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="4"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="5"><br>CA-2</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="6"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="7"><br>CA-3</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q6" value="8"><br>Attending</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 7 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="8"><b>Q7:</b> This resident responded rapidly and appropriately to critical situations; they demonstrated sound clinical judgment reflective of the following level of training.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="1"><br>Intern</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="2"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="3"><br>CA-1</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="4"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="5"><br>CA-2</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="6"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="7"><br>CA-3</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q7" value="8"><br>Attending</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 8 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="3"><b>Q8:</b> This resident completed safe, thorough and comprehensive handoffs.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q8" value="1"><br>Yes</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q8" value="2"><br>No</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q8" value="3"><br>Did Not Obesrve</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 9 -->
			<table class="table table-striped">
				<tbody>
					<tr>
						<td colspan="8"><b>Q9:</b> This resident was appropriately able to locate, appraise and assimilate evidence. They effectively used sources to support own learning. They appear motivated to read literature and apply knowledge to case discussion and management.</td>
					</tr>
					<tr>	
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="1"><br>Intern</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="2"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="3"><br>CA-1</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="4"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="5"><br>CA-2</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="6"><br></label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="7"><br>CA-3</label></td>
						<td class="tdRdoBtn" colspan="1"><label><input disabled type="radio" name="q9" value="8"><br>Attending</label></td>
					</tr>
				</tbody>
			</table>
		<!-- Question 10 -->
			<table class="table table-striped">
				<tbody>
              		<tr>
						<td>Comments on the resident's performance -- their strengths and weaknesses. Be sure to explain all "unacceptable" and "needs improvement" ratings from the previous questions.</td>
              		</tr>
              		<tr>
						<td><textarea name="t1"></textarea></td>
              		</tr>
				</tbody>
			</table>
		<!-- Question 10 -->
			<table class="table table-striped">
				<tbody>
              		<tr>
						<td>Recommendations for future development of this resident.</td>
              		</tr>
              		<tr>
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