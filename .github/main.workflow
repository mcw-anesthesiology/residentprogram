workflow "Build and deploy" {
  resolves = ["maddox/actions/ssh@master"]
  on = "push"
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "maddox/actions/ssh@master" {
  needs = "Master"
  uses = "maddox/actions/ssh@master"
  args = "/root/update.sh"
  secrets = ["HOST", "USER", "PRIVATE_KEY", "PUBLIC_KEY"]
}
