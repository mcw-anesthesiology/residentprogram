#!/usr/bin/env python3

import matplotlib.pyplot as plt
from numpy import average, arange
from scipy.stats import linregress

from argparse import ArgumentParser
import csv, sys

from norm_table import SCALED_SCORE_PERCENTILE_RANKS


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
                print("No scores found for ", first, last, file=sys.stderr)

    plt.figure()

    plt.title("All scenarios and scaled scores")
    plt.xlabel("Scenario response average")
    plt.ylabel("ITE scaled score")
    plot(records, "scenario_avg", "Scaled")

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
    plot(records, "overall_competency_avg", "Scaled")

    plt.subplot(2, 2, 3)
    plt.xlabel("Medical knowledge competency average")
    plt.ylabel("ITE scaled score")
    plot(records, "medical_knowledge_avg", "Scaled")

    plt.subplot(2, 2, 4)
    plt.xlabel("Patient care competency average")
    plt.ylabel("ITE scaled score")
    plot(records, "patient_care_avg", "Scaled")

    plt.tight_layout()
    plt.figure()

    plt.title("Scenarios vs competencies")
    plt.xlabel("Scenario response average")
    plt.ylabel("Competency overall average")
    plot(records, "scenario_avg", "overall_competency_avg")

    plt.tight_layout()
    plt.figure()

    # plt.subplot(2, 1, 1)
    # plt.title("Scenarios vs percentile rank")
    # plt.xlabel("Scenario response average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [(float(r["scenario_avg"]), float(get_percentile_rank(r))) for r in records]
    # )
    #
    # plt.subplot(2, 1, 2)
    # plt.title("Competencies vs percentile rank")
    # plt.xlabel("Competency overall average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [
    #         (float(r["overall_competency_avg"]), float(get_percentile_rank(r)))
    #         for r in records
    #     ]
    # )

    # plt.tight_layout()
    # plt.figure()

    interns = [r for r in records if r["training_level"] == "intern"]
    # plt.subplot(2, 1, 1)
    # plt.title("Scenarios vs percentile rank (PGY-1)")
    # plt.xlabel("Scenario response average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [(float(r["scenario_avg"]), float(get_percentile_rank(r))) for r in interns]
    # )
    #
    # plt.subplot(2, 1, 2)
    # plt.title("Competencies vs percentile rank (PGY-1)")
    # plt.xlabel("Competency overall average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [
    #         (float(r["overall_competency_avg"]), float(get_percentile_rank(r)))
    #         for r in interns
    #     ]
    # )
    #
    # plt.tight_layout()
    # plt.figure()

    ca1s = [r for r in records if r["training_level"] == "ca-1"]
    # plt.subplot(2, 1, 1)
    # plt.title("Scenarios vs percentile rank (CA-1)")
    # plt.xlabel("Scenario response average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [(float(r["scenario_avg"]), float(get_percentile_rank(r))) for r in ca1s]
    # )
    #
    # plt.subplot(2, 1, 2)
    # plt.title("Competencies vs percentile rank (CA-1)")
    # plt.xlabel("Competency overall average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [
    #         (float(r["overall_competency_avg"]), float(get_percentile_rank(r)))
    #         for r in ca1s
    #     ]
    # )
    #
    # plt.tight_layout()
    # plt.figure()

    ca2s = [r for r in records if r["training_level"] == "ca-2"]
    # plt.subplot(2, 1, 1)
    # plt.title("Scenarios vs percentile rank (CA-2)")
    # plt.xlabel("Scenario response average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [(float(r["scenario_avg"]), float(get_percentile_rank(r))) for r in ca2s]
    # )
    #
    # plt.subplot(2, 1, 2)
    # plt.title("Competencies vs percentile rank (CA-2)")
    # plt.xlabel("Competency overall average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [
    #         (float(r["overall_competency_avg"]), float(get_percentile_rank(r)))
    #         for r in ca2s
    #     ]
    # )
    #
    # plt.tight_layout()
    # plt.figure()

    ca3s = [r for r in records if r["training_level"] == "ca-3"]
    # plt.subplot(2, 1, 1)
    # plt.title("Scenarios vs percentile rank (CA-3)")
    # plt.xlabel("Scenario response average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [(float(r["scenario_avg"]), float(get_percentile_rank(r))) for r in ca3s]
    # )
    #
    # plt.subplot(2, 1, 2)
    # plt.title("Competencies vs percentile rank (CA-3)")
    # plt.xlabel("Competency overall average")
    # plt.ylabel("ITE scaled score percentile rank")
    # plot_tuples(
    #     [
    #         (float(r["overall_competency_avg"]), float(get_percentile_rank(r)))
    #         for r in ca3s
    #     ]
    # )
    #
    # plt.tight_layout()
    # plt.figure()

    fellows = [r for r in records if r["training_level"] == "fellow"]

    x = arange(5)
    classes = [interns, ca1s, ca2s, ca3s, fellows]

    plt.subplot(1, 2, 1)
    plt.title("Basic scenarios")
    plt.xlabel("Scenario response average")
    plt.ylabel("Training level")
    autolabel(
        plt,
        plt.bar(
            x,
            [
                average([float(r["basic_scenario_response_avg"]) for r in rs])
                for rs in classes
            ],
        ),
    )
    plt.xticks(x, ["Intern", "CA-1", "CA-2", "CA-3", "Fellow"])

    plt.subplot(1, 2, 2)
    plt.title("Advanced scenarios")
    plt.xlabel("Scenario response average")
    plt.ylabel("Training level")
    autolabel(
        plt,
        plt.bar(
            x,
            [
                average([float(r["advanced_scenario_response_avg"]) for r in rs])
                for rs in classes
            ],
        ),
    )
    plt.xticks(x, ["Intern", "CA-1", "CA-2", "CA-3", "Fellow"])

    plt.tight_layout()
    plt.show()


def autolabel(plt, rects):
    """Attach a text label above each bar in *rects*, displaying its height."""
    for rect in rects:
        height = rect.get_height()
        plt.annotate(
            "{}".format(round(height, 3)),
            xy=(rect.get_x() + rect.get_wiggdth() / 2, height),
            xytext=(0, 1),  # 3 points vertical offset
            textcoords="offset points",
            ha="center",
            va="bottom",
        )


def plot(records, k1, k2, draw_points=True, label=None):
    return plot_tuples(
        get_tuples(records, k1, k2), draw_points=draw_points, label=label
    )


def get_tuples(records, k1, k2):
    return [(float(r[k1]), float(r[k2])) for r in records if r[k1] and r[k2]]


def plot_tuples(l, draw_points=True, label=None):
    l.sort(key=lambda l: l[0])
    x = [t[0] for t in l]
    y = [t[1] for t in l]

    if draw_points:
        plt.plot(x, y, ".")

    m, b, *things = linregress(x, y)
    plt.plot(x, [b + m * val for val in x], "-", label=label)
    return *things, l


def get_percentile_rank(record):
    indices = {"intern": 0, "ca-1": 1, "ca-2": 2, "ca-3": 3, "fellow": 4}

    percentile_rank = SCALED_SCORE_PERCENTILE_RANKS[record["Scaled"]][
        indices[record["training_level"]]
    ]

    return percentile_rank


if __name__ == "__main__":
    main()
