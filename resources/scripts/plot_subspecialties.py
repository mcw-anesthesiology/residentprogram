#!/usr/bin/env python3

import matplotlib.pyplot as plt
from numpy import average

import csv, sys

from plot_scenario_ite_correlation import plot


def main():
    data = list(csv.DictReader(sys.stdin))

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

    plt.show()


if __name__ == "__main__":
    main()
