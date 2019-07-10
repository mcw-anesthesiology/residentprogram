#!/usr/bin/env python3

import json, sys, csv


def main():
    data = json.load(sys.stdin)
    checklists = sorted(
        data["data"]["meritReports"], key=lambda c: c["user"]["full_name"]
    )
    writer = csv.writer(sys.stdout)
    writer.writerow(["Name", "Publication type", "Title", "Link", "Role"])
    for checklist in checklists:
        for publication in sorted(
            sorted(checklist["publications"], key=lambda c: c["title"]),
            key=lambda c: c["publicationType"],
        ):
            writer.writerow(
                [
                    checklist["user"]["full_name"],
                    publication["publicationType"],
                    publication["title"],
                    publication["link"],
                    publication["role"],
                ]
            )


if __name__ == "__main__":
    main()
