workflow "Build and deploy" {
  resolves = ["maddox/actions/ssh@master"]
  on = "push"
}

action "maddox/actions/ssh@master" {
  uses = "maddox/actions/ssh@master"
  args = "/root/update.sh"
  secrets = ["HOST", "USER", "PRIVATE_KEY", "PUBLIC_KEY"]
}
