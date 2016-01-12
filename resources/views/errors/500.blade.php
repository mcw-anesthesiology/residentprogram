<!DOCTYPE html>
<html>
    <head>
        <title>Be right back</title>

        <link href="/css/main.css" rel="stylesheet" type="text/css">
		<link href="//fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
				font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
				font-size: 24px;
				margin: 40px;
            }

            .title {
                font-size: 48px;
                margin-bottom: 40px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">I'm sorry, there seems to have been a problem</div>
				<p>
					Please try again.
					If you continue to experience problems, please let me know via <a href="{{ url("/contact") }}">the contact page</a>
					if it still works, or by contacting me directly at <a href="mailto:{{ config("app.admin_email") }}">{{ config("app.admin_email") }}</a>.
				</p>
            </div>
        </div>
    </body>
</html>
