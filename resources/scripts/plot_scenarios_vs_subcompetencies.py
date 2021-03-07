#!/usr/bin/env python3

import matplotlib.pyplot as plt

import csv, os.path, sys
from typing import List

from plot_scenario_ite_correlation import plot_tuples


def main():
    try:
        outdir = sys.argv[1]
    except IndexError:
        print("Must specify outdir", file=sys.stderr)
        return -1

    rows = list(csv.DictReader(sys.stdin))

    scenarios, subcompetencies = parse_header(rows[0])
    groups = {sc: {} for sc in subcompetencies}
    scenario_subspecialties = []

    for row in rows:
        for sc in subcompetencies:
            if row[sc] != "":
                sc_val = float(row[sc])

                for scenario in scenarios:
                    if row[scenario] != "":
                        scenario_val = float(row[scenario])
                        scenario_subspecialty, scenario_type = split_scenario(scenario)
                        scenario_subspecialties.append(scenario_subspecialty)
                        scenario_text = f"{scenario_subspecialty} - {scenario_type}"

                        if scenario_text not in groups[sc]:
                            groups[sc][scenario_text] = []

                        groups[sc][scenario_text].append((sc_val, scenario_val))

    for subcompetency, subcompetency_scenarios in groups.items():
        for subspecialty in scenario_subspecialties:
            basic = f"{subspecialty} - Basic"
            advanced = f"{subspecialty} - Advanced"
            combined = f"{subspecialty} - Combined"

            if basic in subcompetency_scenarios and advanced in subcompetency_scenarios:
                subcompetency_scenarios[combined] = [
                    (
                        subcompetency_scenarios[basic][i][0],
                        subcompetency_scenarios[basic][i][1]
                        + subcompetency_scenarios[advanced][i][1],
                    )
                    for i in range(len(subcompetency_scenarios[basic]))
                ]

        for scenario, points in subcompetency_scenarios.items():
            plt.figure()
            plt.xlabel(subcompetency)
            plt.ylabel(scenario)
            r_value, _p_value, std_err, points = plot_tuples(points)
            plt.title(
                "(R={}, R²={}, StdErr={}, #={})".format(
                    round(r_value, 5),
                    round(r_value ** 2, 5),
                    round(std_err, 5),
                    len(points),
                )
            )
            plt.tight_layout()
            plt.savefig(os.path.join(outdir, f"{scenario} vs {subcompetency}.png"))


def split_scenario(scenario):
    scenario_type = "Advanced" if scenario.endswith("adv") else "Basic"
    subspecialty = scenario.rstrip("adv").rstrip("bas")

    return subspecialty, scenario_type


def parse_header(row):
    scenarios = []
    subcompetencies = []

    for name in row.keys():
        if name.endswith("bas") or name.endswith("adv"):
            scenarios.append(name)
        elif len(scenarios) > 0:
            subcompetencies.append(name)

    return scenarios, subcompetencies


def create_groups(scenarios: List[str]):
    groups = {}

    for scenario in scenarios:
        scenario_type = scenario.rstrip("adv").rstrip("bas")
        if scenario_type not in groups:
            groups[scenario_type] = {"basic": [], "advanced": []}

    return groups


if __name__ == "__main__":
    main()
