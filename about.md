# About Unfurl

Unfurl is an [open source project](https://github.com/onecommons/unfurl) that is a core part of our plan to build a free and open cloud. 

Learn More at [onecommons.org](https://onecommons.org).

P.S. We're [hiring](https://onecommons.org/join)!

### Status and Caveats

Unfurl is in early stages of development and should not be used in production. In particular be mindful of these limitations:

* Locking is not implemented to prevent multiple instances of unfurl running at the same time from modifying the same resources.
* Async/parallel jobs are not implemented. For complex or long-running job you consider pushing the logic into Terraform or Ansible configurators.
* Incremental updates are only enabled when a resource is missing or in a failed state. You can incrementally update an ensemble by explicitly limit jobs by using the `--force` and `--instance` [command line options](docs/cli.html#unfurl-deploy).
