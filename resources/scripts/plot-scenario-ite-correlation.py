#!/usr/bin/env python3

import matplotlib.pyplot as plt
from numpy.polynomial.polynomial import polyfit

from argparse import ArgumentParser
import csv, sys


def main():
    parser = ArgumentParser()
    parser.add_argument("--scenarios", required=True)
    parser.add_argument("--scores", required=True)
    args = parser.parse_args()

    with open(args.scenarios, "r") as scenarios, open(args.scores, "r") as scores:
        scenarios = csv.DictReader(scenarios)
        scores = list(csv.DictReader(scores))

        records = []

        for scenario_record in scenarios:
            first = scenario_record["first_name"].split(" ")[0]
            last = scenario_record["last_name"].split(" ")[0]
            try:
                score = next(
                    sr for sr in scores if first in sr["Name"] and last in sr["Name"]
                )
                records.append({**scenario_record, **score})
            except StopIteration:
                print("No scores found for ", name, file=sys.stderr)

    plt.figure()

    plt.title("All scenarios and scaled scores")
    plt.xlabel("Scenario response average")
    plt.ylabel("ITE scaled score")
    residuals, *_ = plot(records, "scenario_avg", "Scaled")

    plt.tight_layout()
    plt.figure()

    plt.subplot(2, 1, 1)
    plt.title("Basic topics and scenarios")
    plt.xlabel("Scenario response average")
    plt.ylabel("ITE % correct")
    plot(records, "basic_scenario_response_avg", "Basic")

    plt.subplot(2, 1, 2)
    plt.title("Advanced topics and scenarios")
    plt.xlabel("Scenario response average")
    plt.ylabel("ITE % correct")
    plot(records, "advanced_scenario_response_avg", "Advanced")

    plt.tight_layout()
    plt.figure()

    plt.title("Competencies vs ITE")
    plt.subplot(2, 1, 1)
    plt.xlabel("Competency overall average")
    plt.ylabel("ITE scaled score")
    residuals, *_ = plot(records, "overall_competency_avg", "Scaled")
    plt.title("Residuals: {}".format(round(residuals[0])))

    plt.subplot(2, 2, 3)
    plt.xlabel("Medical knowledge competency average")
    plt.ylabel("ITE scaled score")
    residuals, *_ = plot(records, "medical_knowledge_avg", "Scaled")
    plt.title("Residuals: {}".format(round(residuals[0])))

    plt.subplot(2, 2, 4)
    plt.xlabel("Patient care competency average")
    plt.ylabel("ITE scaled score")
    residuals, *_ = plot(records, "patient_care_avg", "Scaled")
    plt.title("Residuals: {}".format(round(residuals[0])))

    plt.tight_layout()
    plt.figure()

    plt.title("Scenarios vs competencies")
    plt.xlabel("Scenario response average")
    plt.ylabel("Competency overall average")
    plot(records, "scenario_avg", "overall_competency_avg")

    plt.tight_layout()
    plt.show()


def plot(records, k1, k2):
    return plot_tuples(get_tuples(records, k1, k2))


def get_tuples(records, k1, k2):
    return [(float(r[k1]), float(r[k2])) for r in records]


def plot_tuples(l):
    l.sort(key=lambda l: l[0])
    x = [t[0] for t in l]
    y = [t[1] for t in l]

    plt.plot(x, y, ".")
    [b, m], things = polyfit(x, y, 1, full=True)
    plt.plot(x, [b + m * val for val in x], "-")
    return things


if __name__ == "__main__":
    main()
