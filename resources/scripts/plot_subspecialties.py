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
        plt.xlabel("Tradiational response average")
        plt.ylabel("Scenario response average")
        plot(rows, "response_avg", "scenario_avg")
        plt.title(
            "{} (Average # of evaluations per person: {})".format(
                subspecialty, round(average([int(row["num_evals"]) for row in rows]), 2)
            )
        )
        plt.tight_layout()

        plt.figure()
        plt.subplot(2, 1, 1)
        plt.xlabel("Tradiational response average")
        plt.ylabel("Basic scenario average")
        plot(rows, "response_avg", "basic_scenario_response_avg")
        plt.title(
            "{} (Average # of evaluations per person: {})".format(
                subspecialty, round(average([int(row["num_evals"]) for row in rows]), 2)
            )
        )
        plt.subplot(2, 1, 2)
        plt.xlabel("Tradiational response average")
        plt.ylabel("Advanced scenario average")
        plot(rows, "response_avg", "advanced_scenario_response_avg")
        plt.title(
            "{} (Average # of evaluations per person: {})".format(
                subspecialty, round(average([int(row["num_evals"]) for row in rows]), 2)
            )
        )
        plt.tight_layout()

        if outdir is not None:
            plt.savefig(
                os.path.join(outdir, "{}.png".format(subspecialty.replace("/", "")))
            )

    if outdir is None:
        plt.show()


if __name__ == "__main__":
    main()
