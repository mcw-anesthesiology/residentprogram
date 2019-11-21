#!/usr/bin/env python3


import matplotlib.pyplot as plt

import csv, os.path, sys

from plot_scenario_ite_correlation import plot

COMPETENCIES = [
    "Overall Milestone",
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
        plt.suptitle("Competency: {}".format(competency))
        x = "{} average".format(competency)
        y = "IPA score average"
        plt.xlabel("Milestone response average")
        plt.ylabel(y)
        r_value, _p_value, std_err, points = plot(data, x, y)
        plt.title(
            "(R={}, R²={}, StdErr={}, #={})".format(
                round(r_value, 5),
                round(r_value ** 2, 5),
                round(std_err, 5),
                len(points),
            )
        )
        plt.tight_layout(pad=2)

        if outdir is not None:
            plt.savefig(os.path.join(outdir, "{}.png".format(competency)))

        plt.figure()
        plt.suptitle("Competency: {}".format(competency))
        x = "{} average".format(competency)

        plt.subplot(2, 1, 1)
        y = "Basic IPA score average"
        plt.xlabel("Milestone response average")
        plt.ylabel(y)
        r_value, _p_value, std_err, points = plot(data, x, y)
        plt.title(
            "(R={}, R²={}, StdErr={}, #={})".format(
                round(r_value, 5),
                round(r_value ** 2, 5),
                round(std_err, 5),
                len(points),
            )
        )

        plt.subplot(2, 1, 2)
        y = "Advanced IPA score average"
        plt.xlabel("Milestone response average")
        plt.ylabel(y)
        r_value, _p_value, std_err, points = plot(data, x, y)
        plt.title(
            "(R={}, R²={}, StdErr={}, #={})".format(
                round(r_value, 5),
                round(r_value ** 2, 5),
                round(std_err, 5),
                len(points),
            )
        )

        plt.tight_layout(pad=2)

        if outdir is not None:
            plt.savefig(
                os.path.join(
                    outdir, "{} - Separate scenario types.png".format(competency)
                )
            )

    if outdir is None:
        plt.show()


if __name__ == "__main__":
    main()
