<?php 
	session_start(); 
	require "init.php";
	
	$formLocation = "evaluation_forms/" //some random unique string
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
  </head>

  <body>
	<?php require 'header.php'; ?>
	<form method="post" action="process_form.php">
		<h3 class="sub-header form-input"><input type="text" id="formTitle" name="formTitle" placeholder="Form Title" /></h3>
		<button type="submit">Submit Form</button>
		<div class="form">
		</div>
		<button type="button" id="addQuestion">Add Question</button>
	</form>
	
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script>
		var radioHtml = "<td class='tdRdoBtn'><label><input type='radio' disabled/><br /><input class='form-input form-option form-option-text' placeholder='Option Text'><br /><input class='form-input form-option form-option-value' type='number' placeholder='Option Value'></label></td>";
		var questionHtml = "<table class='table table-striped form-input form-question'><tr><td colspan='10'><b class='form-question-name'></b><input type='text' class='form-input form-question-text' placeholder='Question Text' /></td></tr><tr><td colspan='10'><p>Question Type</p><select class='form-control form-question-type'><option value='radio'>Radio</option><option value='text'>Text</option></select></td></tr><tr class='form-options'>"+radioHtml+"</tr><tr><td colspan='10'><button class='form-question-delete'>Delete Question</button></td></tr></table>";
		
		$(document).ready(function(){
			addQuestion();
		});
		
		$(".form").on("change", ".form-question-type", function(){
			if($(this).val() === "radio"){
				$(this).parent().parent().next(".form-options").html(radioHtml);
				//$(this).parents(".form-question").attr("id", "q1").find(".form-question-name").html("Q1:");
			}
			else if($(this).val() === "text"){
				$(this).parent().parent().next(".form-options").html("<td><textarea disabled></textarea></td>");
				//$(this).parents(".form-question").attr("id", "t1").find(".form-question-name").html("T1:");
				var questionId = $(this).parents(".form-question").attr("id");
				$(this).parents(".form-question").find("textarea").attr("name", questionId+":textResponse");
			}
		});
		
		$(".form").on("change", ".form-option-value", function(){
			if($(this).val() != ""){
				if($(this).parent().parent().next().length == 0){
					$(this).parent().parent().parent().append(radioHtml);
				}
			}
			else{
				if($(this).parent().parent().prev().find(".form-option-value").val() == "" || $(this).parent().parent().next().find(".form-option-value").val() == ""){
					$(this).parent().parent().remove();
				}
			}
			
			var questionId = $(this).parents(".form-question").attr("id");
			var optionValue = $(this).val();
			
			$(this).parent().find(".form-option-text").attr("name", questionId+":"+optionValue);
			
		});
		
		$(".form").on("click", ".form-question-delete", function(){
			$(this).parents(".form-question").remove();
		});
		
		$("#addQuestion").click(function(){
			addQuestion();
		});
		
		function addQuestion(){
			if($(".form").children().length == 0){
				questionId = "q1";
			}
			else{
				var questionId = $(".form").children().last().attr("id");
				var questionIdNum = parseFloat(questionId.substring(1));
				questionIdNum++;
				questionId = questionId.substring(0, 1)+questionIdNum;
			}
			
			$(".form").append(questionHtml);
			$(".form").children().last().attr("id", questionId);
			$(".form").children().last().find(".form-question-name").html(questionId.toUpperCase()+": ");
			$(".form").children().last().find(".form-question-text").attr("name", questionId+":name");
			$(".form").children().last().find(".form-question-type").attr("name", questionId+":type");
		}
    </script>
  </body>
</html>
