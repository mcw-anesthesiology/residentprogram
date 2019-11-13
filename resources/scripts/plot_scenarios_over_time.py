#!/usr/bin/env python3

"""Plot subspecialties

Takes output of `subject-form-based-responses.sql` query as input via stdin
"""

import matplotlib.pyplot as plt

import csv, os, os.path, sys
from datetime import datetime

from plot_scenario_ite_correlation import plot


def main():
    data = list(csv.DictReader(sys.stdin))
    training_level_data = {
        tl: [row for row in data if row["Training level"] == tl]
        for tl in set([row["Training level"] for row in data])
    }

    outdir = sys.argv[1]

    for training_level, rows in training_level_data.items():
        plt.figure()
        x = "Evaluation completion timestamp"
        y = "Scenario response"
        plt.title("{} aggregated".format(training_level))
        plt.xlabel(x)
        plt.ylabel(y)
        plot(rows, x, y)
        set_xticks(plt)
        plt.tight_layout()

        tl_dir = os.path.join(outdir, training_level)

        plt.savefig(os.path.join(outdir, "{}.png".format(training_level)))
        os.makedirs(tl_dir, exist_ok=True)

        trainee_data = {
            subject_id: [row for row in rows if row["Trainee ID"] == subject_id]
            for subject_id in set([row["Trainee ID"] for row in rows])
        }

        for subject_id, trainee_rows in trainee_data.items():
            title = "Trainee {}".format(subject_id)

            plt.figure()
            x = "Evaluation completion timestamp"
            y = "Scenario response"
            plt.title(title)
            plt.xlabel(x)
            plt.ylabel(y)
            plot(trainee_rows, x, y, label="Trainee")
            plot(rows, x, y, draw_points=False, label="Training level aggregate")
            set_xticks(plt)
            plt.legend()
            plt.tight_layout()

            plt.savefig(os.path.join(tl_dir, "{}.png".format(title)))


def set_xticks(plt):
    xticks, _ = plt.xticks()
    plt.xticks(
        xticks,
        [datetime.fromtimestamp(tick).strftime("%x") for tick in xticks],
        rotation=40,
    )


if __name__ == "__main__":
    main()
