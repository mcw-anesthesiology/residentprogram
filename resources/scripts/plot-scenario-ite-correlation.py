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

        basic = []
        advanced = []

        for scenario_record in scenarios:
            name = "{}, {}".format(
                scenario_record["last_name"], scenario_record["first_name"]
            )
            try:
                score = next(sr for sr in scores if name in sr["Name"])
                if scenario_record["scenario_difficulty"] == "BEGINNER":
                    basic.append(
                        (score["Basic"], scenario_record["scenario_response_avg"])
                    )
                elif scenario_record["scenario_difficulty"] == "ADVANCED":
                    advanced.append(
                        (score["Advanced"], scenario_record["scenario_response_avg"])
                    )
            except StopIteration:
                print("No scores found for ", name, file=sys.stderr)

    basic.sort(key=lambda t: t[0])
    advanced.sort(key=lambda t: t[0])

    basic_scores = [float(x[0]) for x in basic]
    basic_scenario_responses = [float(x[1]) for x in basic]

    advanced_scores = [float(x[0]) for x in advanced]
    advanced_scenario_responses = [float(x[1]) for x in advanced]

    plt.figure()
    plt.subplot(2, 1, 1)
    plt.title("Basic topics and scenarios")
    plt.xlabel("Scenario response average")
    plt.ylabel("ITE % correct")
    plt.plot(basic_scenario_responses, basic_scores, ".")
    b, m = polyfit(basic_scenario_responses, basic_scores, 1)
    plt.plot(
        basic_scenario_responses, [b + m * x for x in basic_scenario_responses], "-"
    )

    plt.subplot(2, 1, 2)
    plt.title("Advanced topics and scenarios")
    plt.xlabel("Scenario response average")
    plt.ylabel("ITE % correct")
    plt.plot(advanced_scenario_responses, advanced_scores, ".")
    b, m = polyfit(advanced_scenario_responses, advanced_scores, 1)
    plt.plot(
        advanced_scenario_responses,
        [b + m * x for x in advanced_scenario_responses],
        "-",
    )
    plt.show()


if __name__ == "__main__":
    main()
