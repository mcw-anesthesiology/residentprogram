<h3>Merit checklists</h3>

<p>
	Merit checklists are intended as a way to document some of the wide variety
	of accomplishments performed by our faculty members during the academic
	year.
</p>

<p>
	Visit <a href="{{ url('/merit') }}">the merits page</a>
	using the <i>Faculty merit</i> link in the navigation bar at the top of the
	page to begin, resume, or complete the checklist.

	@if (Auth::check() && !Auth::user()->isType('faculty'))
		You will be able to do on behalf of any of the faculty members whom you
		oversee.
	@endif
</p>

<p>
	In completing the information in this checklist, you are creating a
	document to which you can refer in the future. Please fill out each section
	completely and accurately.
</p>

<p>
	Please check off any items that apply to involvement throughout the past
	academic year. The checklist may consist of multiple pages, each page
	containing related subsections. Some checklist items may have follow-up
	questions, please complete them to the best of your ability.
</p>

<p>
	Some items may allow you to specify a list of items. You can add an item
	using the <i>Add item</i> button below the list, or remove an entry using
	the <i>Remove item</i> button to the left of the list item. Lists must have
	at least one item to be considered complete.
</p>

<p>
	Any incomplete required questions will be marked using a red border. All
	items must be valid before submitting the form, so if you are unable to
	submit please click the <i>Show checklist validation</i> button to list the
	remaining items that need attention.
</p>

<p>
	Progress should be saved automatically as you make changes, but you can
	manually save your current progress using the <i>Save</i> button at the
	bottom of the form and you will be able to continue from where you left
	off. To navigate through the pages of the checklist, please use the
	<i>Next</i> page and <i>Back</i> buttons on the top and bottom of the form.
	On the final page, the next button will be replaced by a <i>Submit</i>
	button, which you can use to submit the form when you're finished.
</p>

<p>
	If you encounter any technical issues or have questions about the checklist itself, please let us know using the
	<a href="{{ url('/contact') }}">contact form</a>
	or by emailing
	<a href="mailto:{{ config('app.admin_email') }}">{{ config('app.admin_email') }}</a>
	and we'll get back to you as soon as possible.
</p>
