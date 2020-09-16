---
name: 'Check Latest SPDX License List'
on:
  workflow_dispatch:
    inputs: {}
  schedule:
    - cron: '0 0 */7 * *'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
      - run: npm run latest
