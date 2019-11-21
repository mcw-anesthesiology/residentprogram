#!/usr/bin/env python3

"""Plot subspecialties

Takes output of `subject-form-based-responses.sql` query as input via stdin
"""

import matplotlib.pyplot as plt
from numpy import average

import csv, os.path, sys

from plot_scenario_ite_correlation import plot


def main():
    data = list(csv.DictReader(sys.stdin))

    outdir = None
    try:
        outdir = sys.argv[1]
    except KeyError:
        print("No outdir specified, will display figures", file=sys.stderr)

    subspecialty_names = set([row["title"] for row in data])
    subspecialties = {
        name: [r for r in data if r["title"] == name] for name in subspecialty_names
    }

    for subspecialty, rows in subspecialties.items():
        plt.figure()
        plt.xlabel("Milestone response average")
        plt.ylabel("IPA score response average")
        r_value, _p_value, std_err, points = plot(rows, "response_avg", "scenario_avg")
        plt.suptitle(
            "{} (Avg # evals per person={})".format(
                subspecialty, round(average([int(row["num_evals"]) for row in rows]), 2)
            )
        )
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
                os.path.join(outdir, "{}-All.png".format(subspecialty.replace("/", "")))
            )

        plt.figure()
        plt.suptitle(
            "{} (Average # of evaluations per person: {})".format(
                subspecialty, round(average([int(row["num_evals"]) for row in rows]), 2)
            )
        )
        plt.subplot(2, 1, 1)
        plt.xlabel("Milestone response average")
        plt.ylabel("Basic IPA score average")
        r_value, _p_value, std_err, points = plot(
            rows, "response_avg", "basic_scenario_response_avg"
        )
        plt.title(
            "(R={}, R²={}, StdErr={}, #={})".format(
                round(r_value, 5),
                round(r_value ** 2, 5),
                round(std_err, 5),
                len(points),
            )
        )
        plt.subplot(2, 1, 2)
        plt.xlabel("Milestone response average")
        plt.ylabel("Advanced IPA score average")
        r_value, _p_value, std_err, points = plot(
            rows, "response_avg", "advanced_scenario_response_avg"
        )
        plt.title(
            "(R²={}, StdErr={}, #={})".format(
                round(r_value ** 2, 5), round(std_err, 5), len(points)
            )
        )
        plt.tight_layout(pad=2)

        if outdir is not None:
            plt.savefig(
                os.path.join(outdir, "{}.png".format(subspecialty.replace("/", "")))
            )

    if outdir is None:
        plt.show()


if __name__ == "__main__":
    main()
