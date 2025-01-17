<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="sitelock-site-verification" content="1956" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Resident evaluation system">
		<meta name="author" content="Jacob Mischka">
		<link rel="shortcut icon" href="/favicon.ico">

		<title>{{ config('app.name') }}</title>

	@if(App::environment("production"))
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-70580800-1', 'auto');
			ga('send', 'pageview');
		</script>
	@endif

		<link href="{{ mix("vendor-styles.css") }}" rel="stylesheet" />
		<link href="{{ mix("global-styles.css") }}" rel="stylesheet" />

		<style>
			.form-signin .form-signin-heading,
			.form-signin .checkbox {
				margin-bottom: 10px;
			}
			.form-signin .checkbox {
				font-weight: normal;
			}
			.form-signin .form-control {
				position: relative;
				height: auto;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				padding: 10px;
				font-size: 16px;
			}
			.form-signin .form-control:focus {
				z-index: 5;
			}

			body {
				padding-top: 0px !important;
				padding-bottom: 0px !important;
				background-color: #ECEFF1;
			}

			.hero-section {
				position: fixed;
				top: 0;
				left: 0;
				height: 100vh;
				width: 100vw;
				background-image: url("/img/hero-small.jpg");
				background-size: cover;
				background-repeat: no-repeat;
				background-position: 0px center;
				z-index: -1;
			}


			.hero-container {
				background-color: rgba(69, 90, 99, 0.75);
				padding: 50px;
				height: 100%;
				width: 100%;
			}

			.hero-container > h1,
			.hero-container > p {
				margin-left: 50px;
				margin-right: 50px;
			}

			.hero-container > h1,
			.hero-container > h1 > a {
				color: #ECEFF1;
			}

			.hero-container > p {
				color: #CFD8DC;
			}

			.content-section {
				background-color: #ECEFF1;
				width: 100%;
				margin-top: 300px;
				padding: 50px 0px 20px;
				min-height: 100vh;
				position: relative;
			}

			.form-signin {
				margin-top: 40px;
			}

			.login-submit-container,
			.reset-password-container {
				text-align: center;
			}

			.btn-block {
				margin: 5px 0px;
			}

			.login-submit-container {
				margin-top: 40px;
			}

			.login-info-alert {
				margin-top: 60px;
			}

			@media (min-width: 992px) {
				.login-submit-container {
					margin-top: 100px;
				}
			}
		</style>
		@yield("head")
	</head>
	<body>
		<div class="hero-section">
			<div class="hero-container">

				<h1><a href="/">Resident Program</a></h1>
				<p class="load">
					Trainee evaluation system.
				</p>
			</div>
		</div>
		<div class="content-section">
			<div class="container">
	@if(session("error"))
				<div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
					<div class="alert alert-danger alert-dismissable" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						{!! session("error") !!}
					</div>
				</div>
	@endif
				@yield("body")
			</div>
		</div>
		<script src="{{ mix('polyfills.js') }}"></script>
		<script>
			function checkCookies(container, email) {
				if (!cookiesEnabled()) {
					var alert = document.createElement('div');
					alert.className = 'alert alert-danger';
					alert.innerHTML = '<p>Cookies are required for Resident Program to function correctly. '
						+ 'Please <a target="_blank" rel="noopener noreferrer" href="https://www.whatismybrowser.com/guides/how-to-enable-cookies/auto">enable cookies</a> in your web browser.</p>'
						+ '<p>Please feel free to contact me at <a href="mailto:' + email + '">'
						+ email
						+ '</a> if you have any questions.</p>';
					container.insertBefore(alert, container.children[0]);
				}
			}

			function cookiesEnabled() {
				var enabled = Boolean(navigator.cookieEnabled);
				if (enabled) {
					document.cookie = 'testcookie';
					enabled = document.cookie.indexOf('testcookie') !== -1;
				}

				return enabled;
			}

			checkCookies(
				document.getElementsByClassName('content-section')[0].children[0],
				'{{ config('app.admin_email') }}'
			);
		</script>
	</body>
</html>
