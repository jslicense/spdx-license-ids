workflow "Test" {
  on = "push"
  resolves = ["npm"]
}

action "npm" {
  uses = "shinnn/actions-npm-alpine@1.0.0"
  args = "install-ci-test"
}
