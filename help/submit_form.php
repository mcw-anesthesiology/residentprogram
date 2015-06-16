<?php
$form_validated=0;
if(isset($_POST['textbox1']))
{
    $form_validated=1;
}
if($form_validated)
{
    $mail_text_main = substr(addslashes($_POST['textbox1']),0,1000000);
    $first_random = rand(100000,9999999999);
    $second_random = rand(10000000000,9999999999999);
    $submission_time = time();
    $fname = $submission_time . "." . $first_random . "." . $second_random;
    // Set up variables
    $mail_text1 = "Reference Code: " . $fname . "\r\n";
    $mail_text1.= "Additional identifying information from the submission has been recorded to the server logs." . "\r\n";
    $mail_text1.= "=== ALL TEXT SHOWN BELOW IS FROM THE ONLINE SUBMISSION ===\r\n";
    $mail_text1.= $mail_text_main;
    $disk_text = "Submitting IP: " . $_SERVER['REMOTE_ADDR'] . "\r\n";
    $disk_text.= "Submission Time: " . $_SERVER['REQUEST_TIME'] . "\r\n";
    $disk_text.= "Submission Web Browser: " . $_SERVER['HTTP_USER_AGENT'] . "\r\n\r\n";
    $disk_text.= $disk_text . $mail_text1;
    $disk_filename = "/var/www/vhosts/residentprogram.com/httpdocs/help/output/" . $fname . ".txt";
    
    // File operations
    $filehandle = fopen($disk_filename,"w") or die("System error. This cannot be fixed by the user.  Please contact an administrator. Filename: " . $disk_filename);
    fwrite($filehandle, $disk_text);
    fclose($filehandle);
    chmod($disk_filename, 0400);
    
    // Email operations
    
    $mail_subject = "Anonymous Helpdesk Form Submission";
    $mail_recipients[0] = "_anesth-chiefs@mcw.edu";
    $mail_recipients[1] = "tjebert@mcw.edu";
    $mail_recipients[2] = "tfikejs@mcw.edu";
    $mail_sender = "help@residentprogram.com";
    $mail_headers = "From: " . $mail_sender . "\r\n" .
    'Reply=To: ' . $mail_sender . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    foreach($mail_recipients as $mail_to)
    mail($mail_to,$mail_subject,$mail_text1,$mail_headers);
    echo <<< TOEND001
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title>Form Submitted</title>
    <style type="text/css">
  textarea {
   font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
   font-size: 12pt;
  }</style>
  </head>
  <body><span style="font-family: Helvetica,Arial,sans-serif;font-weight: bold;font-size: medium"
      id="Title1">Form
      successfully submitted. Thank you.<br>
      <br>
    </span> <span style="font-family: Helvetica,Arial,sans-serif;font-size: medium"
      id="Paragraph1">
      Your submission reference number: $first_random<br><em>
        <span style="text-decoration: underline;font-size: small">Write this
          number down if you want to reference these comments in future contact.</span></em><br>
      <br>
    </span> <span style="font-family: Helvetica,Arial,sans-serif;font-size: medium"
      id="Paragraph2">
      You may now close this window.<br>
    </span>
    
  </body>
</html>
TOEND001;
}
else
{
    echo $_POST['textbox1'] . "\r\n";
    echo <<< TOEND002
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title>Form Submitted</title>
    <style type="text/css">
  textarea {
   font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
   font-size: 12pt;
  }</style>
  </head>
  <body><span style="font-family: Helvetica,Arial,sans-serif;font-weight: bold;font-size: medium"
      id="Title1">Error
      - Form was not submitted.&nbsp; Please contact an administrator or try
      again.<br>
    </span><span style="font-family: Helvetica,Arial,sans-serif;font-size: medium"
      id="Paragraph1"></span><span
      style="font-family: Helvetica,Arial,sans-serif;font-size: medium"
      id="Paragraph2"><br>
    </span>
  </body>
</html>
TOEND002;
}
?>
