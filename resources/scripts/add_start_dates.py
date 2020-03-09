#!/usr/bin/env python3

from datetime import date, datetime
import csv, sys

DATE_FORMAT = "%Y-%m-%d"
DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S"


def main():
    bm_dump = [
        row
        for row in csv.DictReader(sys.stdin)
        if row["EvaluationStudentTrainingLevel"] != "intern"
    ]
    with open(3, "r") as users_file:
        users = list(csv.DictReader(users_file))
        users = {u["id"]: u for u in users}

    for row in bm_dump:
        user = users[row["StudentID"]]
        row["ResidencyStart"] = user["ca1_start"]

    writer = csv.DictWriter(sys.stdout, bm_dump[0].keys())
    writer.writeheader()
    writer.writerows(bm_dump)


def guess_start(user):
    created_at = datetime.strptime(user["created_at"], DATETIME_FORMAT)
    assert 5 <= created_at.month and created_at.month <= 7
    return "{}-07-01".format(created_at.year)


def filter_users():
    bm_dump = list(csv.DictReader(sys.stdin))
    bm_records = {r["StudentID"]: r for r in bm_dump}
    with open(3, "r") as users_file:
        users = list(csv.DictReader(users_file))

    users = [
        u
        for u in users
        if u["id"] in bm_records
        and bm_records[u["id"]]["EvaluationStudentTrainingLevel"] != "intern"
    ]
    for u in users:
        u["training_start"] = guess_start(u)

    writer = csv.DictWriter(sys.stdout, users[0].keys())
    writer.writeheader()
    writer.writerows(users)


def intern_to_ca1_start():
    users = list(csv.DictReader(sys.stdin))

    for user in users:
        d = datetime.strptime(user["intern_start"], DATE_FORMAT)
        user["ca1_start"] = "{}-07-01".format(d.year + 1)

    writer = csv.DictWriter(sys.stdout, users[0].keys())
    writer.writeheader()
    writer.writerows([user for user in users if user["training_level"] != "intern"])


if __name__ == "__main__":
    main()
    # filter_users()
    # intern_to_ca1_start()
