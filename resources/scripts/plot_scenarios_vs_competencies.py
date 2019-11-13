#!/usr/bin/env python3

"""Plot subspecialties

Takes output of `subject-form-based-responses.sql` query as input via stdin
"""

import matplotlib.pyplot as plt

import csv, os.path, sys

from plot_scenario_ite_correlation import plot

COMPETENCIES = [
    "Overall milestone",
    "Systems Based Practice",
    "Practice Based Learning",
    "Professionalism",
    "Medical Knowledge",
    "Patient Care",
    "Communication",
]


def main():
    data = list(csv.DictReader(sys.stdin))

    outdir = None
    try:
        outdir = sys.argv[1]
    except IndexError:
        print("No outdir specified, will display figures", file=sys.stderr)

    for competency in COMPETENCIES:
        plt.figure()
        x = "Scenario average"
        y = "{} average".format(competency)
        plt.xlabel(x)
        plt.ylabel(y)
        plot(data, x, y)
        plt.tight_layout()

        if outdir is not None:
            plt.savefig(os.path.join(outdir, "{}.png".format(competency)))

    if outdir is None:
        plt.show()


if __name__ == "__main__":
    main()
