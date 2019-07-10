#!/usr/bin/env python3

import json, sys


def main():
    data = json.load(sys.stdin)
    checklists = data["data"]["meritReports"]
    grants = [grant for checklist in checklists for grant in checklist["grants"]]
    publications = [
        publication
        for checklist in checklists
        for publication in checklist["publications"]
    ]
    studies = [study for checklist in checklists for study in checklist["studies"]]
    committee_orgs = [
        i for checklist in checklists for i in checklist["committeeParticipation"]
    ]

    print("## Publication types\n")
    types = set([publication["publicationType"] for publication in publications])
    for t in types:
        print("-", t)

    print("\n\n## Grant agencies\n")
    agencies = set([grant["agency"] for grant in grants])
    for agency in agencies:
        print("-", agency)

    print("\n\n## Study roles\n")
    roles = set([s["role"].strip() for s in studies])
    for role in roles:
        print("-", role)

    print("\n\n## Committee organizations\n")
    orgs = sorted(set([o["organization"] for o in committee_orgs]))
    grouped_committee_orgs = {
        org: sorted(
            [
                committee
                for co in committee_orgs
                for committee in co["committees"]
                if co["organization"] == org
            ],
            key=lambda c: c["name"],
        )
        for org in orgs
    }
    for org in orgs:
        print("-", org)
        # for committee in grouped_committee_orgs[org]:
        #     print("\t-", committee["name"])


if __name__ == "__main__":
    main()
