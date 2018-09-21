<style>
	th, td {
		padding: 0.5em;
	}

	th {
		text-align: left;
	}
</style>

<p>
	Dear {{ $firstName }} {{ $lastName }},
</p>

<p>
	Because you work for or with the Medical College of Wisconsin Department of
	Anesthesiology, you have been added as a user of both
	<a href="https://www.mcwanet.com">MCWAnet.com</a> and
	<a href="{{ url('/') }}">ResidentProgram.com</a>.
	Welcome! These websites are independent of MCW or hospital networks, and you
	should be able to access them from any device that connects to the internet.
</p>
<p>
	The username
@if (!empty($password))
	and temporary password
@endif
	listed below can be used to access either
	website.
@if (!empty($password))
	Once you have successfully logged in, we strongly recommend that you
	change your password to something that is easier to remember. You can do that
	here: <a href="{{ url('/user') }}">{{ url('/user') }}</a>.
@endif
</p>

<table>
	<thead>
		<tr>
			<th>{{ env('APP_URL') }}</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>Username</th>
			<td>
				<kbd>{{ $username }}</kbd>
			</td>
		</tr>
@if (!empty($password))
		<tr>
			<th>Password</th>
			<td>
				<kbd>{{ $password }}</kbd>
			</td>
		</tr>
@endif
	</tbody>
</table>

@if (config('app.include_intranet_welcome'))
<h2>About A-Net</h2>

<p>A-Net is the MCW Department of Anesthesiology's intranet.<p>

<p><b>Some highlights of what our intranet offers:</b></p>

<ul>
	<li>
		<a href="https://www.mcwanet.com/directory/">An online, searchable Department directory</a>;
		<a href="https://www.mcwanet.com/resources/department-directory/">or a printable one</a>
	</li>
	<li>
		<a href="https://www.mcwanet.com/calendar/">A central Department calendar</a>
		that includes the academic calendar, meetings, and deadlines
	</li>
	<li>
		<a href="https://www.mcwanet.com/policies-protocols/">Department policies and protocols</a>
	</li>
	<li>
		Online forms to
		<a href="https://www.mcwanet.com/resources/expenses-reimbursement/">request reimbursements</a>,
		<a href="https://www.mcwanet.com/submit-news/">submit news</a>, and more
	</li>
	<li>
		Current and past issues of the Department e-newsletter,
		<a href="https://www.mcwanet.com/the-volatile-messenger/">The Volatile Messenger</a>
	</li>
	<li><a href="https://www.mcwanet.com/news/">A central location for Department news and updates</a></li>
	<li><a href="https://www.mcwanet.com/faculty_resources/">Resources for faculty</a></li>
</ul>
@endif

<h2>About Resident Program</h2>

<p>
	Resident Program is our Department evaluation system, for both trainee evaluations by faculty
	and faculty evaluations by trainees.
</p>

<p><b>On Resident Program, you can:</b></p>

<ul>
@if ($userType == 'resident' || $userType == 'fellow')
	<li>Request evaluations</li>
	<li>Create, save, and submit faculty evaluations</li>
	<li>Review completed evaluations</li>
@elseif ($userType == 'faculty' || $userType == 'staff')
	<li>Create or complete requested trainee evaluations</li>
	<li>View your own or your mentee's evaluations</li>
	@if ($userType == 'faculty')
	<li>Create, save, and submit yearly Faculty Merit checklists</li>
	@endif
@elseif ($userType == 'admin')
	<li>Manage users, evaluations, forms, and most other features of the site</li>
	<li>Request evaluations on behalf of others</li>
	<li>Review completed evaluations</li>
	<li>A lot of other things!</li>
@endif
</ul>

<p>
	You can find more information about Resident Program here:
	<a href="{{ url('/help') }}">{{ url('/help') }}</a>.
</p>

<h2>Adding shortcuts to your phone</h2>

<p>
	After opening MCWAnet.com (remember to check "Remember Me" when signing in):
<p>

<table>
	<tbody>
		<tr>
			<th>Safari:</th>
			<td>
				Press the <kbd><samp>Share</samp></kbd> icon in the browser menu at the bottom of the screen.
				Scroll to the right a bit in the share prompt to find the <kbd><samp>Add to Home Screen</samp></kbd> option.
			</td>
		<tr>
			<th>Chrome:</th>
			<td>
				Select <kbd><samp>Add to home screen</samp></kbd> from the browser menu in the upper-right, to the
				right of the address bar
				(<a href="https://developer.chrome.com/multidevice/android/installtohomescreen">Chrome help page</a>).
			</td>
		</tr>
		<tr>
			<th>Firefox:</th>
			<td>
				Press the home icon in the address bar if present, or press <kbd><samp>Add Page Shortcut</samp></kbd>
				from the <kbd><samp>Page</samp></kbd> menu in the browser options menu
				(<a href="https://support.mozilla.org/en-US/kb/how-add-shortcut-website-android">Firefox help page</a>).
			</td>
		</tr>
		<tr>
			<th>Samsung browser:</th>
			<td>
				Press the plus icon in the address bar followed by the <kbd><samp>Homescreen</samp></kbd> icon
				(<a href="https://samsunginter.net/docs/homescreen">Samsung help page</a>).
			</td>
		</tr>
	</tbody>
</table>

<h2>Contact us</h2>

<p>Please contact us with any technical issues, or with suggestions you have for either site.</p>

<p>
	Michele Duranso, Communication Specialist:
	<a href="mailto:mduranso@mcw.edu">mduranso@mcw.edu</a>
	or 414-805-6105.
</p>

<p>
	Jacob Mischka, Programmer Analyst:
	<a href="mailto:{{ config('app.admin_email') }}">{{ config('app.admin_email') }}</a>.
</p>

<p>Thank you and welcome to Anesthesiology!</p>
