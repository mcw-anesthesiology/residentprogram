# Resident Program

Resident Program is primarily a trainee and evaluation site, though it supports
a variety of educational and program management features developed as needed.

This README gives a rather brief overview of its primary capabilities,
though is far from complete.
Likewise, a sadly minuscule amount of technical documentation is included,
a result of the system being developed internally by a single developer
and added onto rapidly as requirements evolved.
Apologies for that.

The system is a Laravel (PHP) web application, with its frontend primarily
written in Vue.

## Background

It was developed for the Medical College of Wisconsin Department of
Anesthesiology Residency and Fellowship programs in response to the
Accreditation Council for Graduate Medical Education's introduction of
Milestone and Core Competency-based system for medical education.
More information can be found on the [ACGME website][agcme-milestones].

## Evaluations

Evaluations are associated with evaluation periods, which can be predefined
blocks of time such as 4-week training blocks, months, or custom ad-hoc time
frames.
Trainee evaluations are tied to the trainee's current level of training at the
time of evaluation request.

Evaluation requests can be created by trainees or administrative staff and sent
to faculty, who will be notified of the request, or can be created by faculty
at-will.
Requests can be scheduled to be sent by administrators ahead of time, for
example at the end of a quarter.

### Evaluation forms

Evaluation forms can be created using a visual form builder interface.
Forms of various evaluator/subject types are supported, including
resident/intern evaluation forms to be completed by faculty, fellow forms,
faculty evaluation forms to be completed by trainees, self evaluation forms,
and forms for peers or staff to relate their experiences on working with
trainees.

Evaluation forms are saved as XML files in `storage/app/`

### Milestones and Competencies

When creating a trainee form, numeric multiple choice questions can be
associated with predefined milestones and competencies. The term "milestones"
in the system is an unfortunate misnomer, and in fact refers to the various
sub-competencies defined by the ACGME and not the milestone levels of those
sub-competencies.
Tying a question to a milestone and/or competency will allow
the system to generate a competency report for trainees, combining the scores
for each evaluation into a numeric value for each competency and sub-competency
for reporting to the ACGME after review by the Clinical Competency Committee.
This generation of values is invaluable in a large department consisting of
many trainees, allowing a more objective way to score a trainee's current
experience and education level than a committee simply deciding on where one
falls on a given milestone spectrum.
Of course, a trainee's performance cannot be determined by numbers alone, and
reports also include aggregations of textual responses containing more in-depth
explanations.

### Faculty evaluations

In order to preserve anonymity of trainees and to prevent potential retribution
by faculty members, evaluations of faculty are anonymous.
In attempt to strike a balance between prompt, actionable feedback and
anonymity, faculty evaluations are revealed to their subjects in batches of
configurable size, or at the end of an academic year.

### Mentors

Trainees can be assigned mentors, faculty members who are allowed to view
evaluation responses on the trainee's behalf.
A trainee's mentor can see the evaluations for that trainee completed by other
faculty members, keeping track of that trainee's evaluated performance as
their training progresses.

## Questionnaires

Generic non-evaluative questionnaires can be presented to users to capture more
structured information than is allowed by the simpler evaluation forms.
Questionnaires are defined as JSON directly by developers, no interactive
editor exists.
The JSON schema is defined in `resources/assets/schemas/questionnaire.json`,
and accordance to this schema is validated before being accepted by the system.

### Case log

A rudimentary case logging system is included, based on the questionnaire schema.
The JSON schema is defined in `resources/assets/schemas/case-log-details.json`.

### Merit report

A specialized questionnaire for faculty to complete their yearly academic and
scholarly activities is given special status.
The JSON schema is defined in `resources/assets/schemas/merit-report.json`.

## Running

See `resources/scripts/init-environment.sh` for the general flow of installing
dependencies and getting the site running.

[agcme-milestones]: https://www.acgme.org/What-We-Do/Accreditation/Milestones/Resources
