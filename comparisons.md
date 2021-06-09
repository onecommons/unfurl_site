## Unfurl vs. ...

### [Ansible](https://www.ansible.com/)

Unfurl shares many similarities with Ansible; in fact it relies on Ansible as a library. You can use it as a declarative wrapper around your Ansible playbooks and inventory. Because it records the history of operations that were previously applied, it can much more efficiently apply incremental updates.

### [Terraform](https://www.terraform.io)

Terraform and Unfurl provide the same core functionality: deploying cloud infrastructure based on a declarative specification. And Unfurl integrates Terraform and Terraform modules. But under the surface there are significant differences:

* Unfurl lets you write specifications that are cloud provider agnostic because it uses the TOSCA standard which let's you declare abstract types with separate implementations. In Terraform, configuration is specific to each resource provider.

* Unfurl can be used for "Day 2 operations" beyond deployment by letting you define custom operations and workflows.

* Unfurl's integration with git and external repositories provides significantly different approach to sharing, integration and composability. Terraform support for sharing configuration outputs and state files is limited to its proprietary extensions, Terraform Cloud and Terraform Enterprise.

* Terraform can build more sophisticated deployment plans while Unfurl plans are more loosely-coupled and incremental. With Unfurl resource status and state is human readable and editable, enabling a more interactive development process.

* Implementing new resource types in Terraform requires writing and publishing a Go plugin that implements a fairly complex interface.
In Unfurl, new resource types and implementations can be defined in a simple and ad hoc manner as part of your specification. This can be as simple as some YAML that invokes shell commands or via a relatively simple Python API.

### [TOSCA Orchestrators](https://github.com/oasis-open/tosca-community-contributions/wiki/Known-TOSCA-Implementations) (e.g. Cloudify, Ystia Orchestrator)

Unlike other [TOSCA Orchestrators](https://github.com/oasis-open/tosca-community-contributions/wiki/Known-TOSCA-Implementations), Unfurl doesn't require a server component and more generally isn't intended to manage very large infrastructure deployments -- instead the expectation would be that Unfurl instead work with a dynamic orchestrator (mostly likely Kubernetes) or cloud provider APIs to achieve scale.

### GitOps Tools 

There are many tools that facilitate a GitOps development processes but each tool is specific infrastructure technology (mostly Kubernetes it seems) -- some are listed below. In contrast, Unfurl provides a generic solution with an uniform process regardless of the technology being deployed. Unlike other GitOps tools Unfurl also records the state and status of deployed resources in Git. 

#### [Argo GitOps Engine](https://argoproj.io/) and [Flux GitOps Toolkit](https://fluxcd.io/)

Syncs a Kubernetes cluster with a Github repository that contains manifests. Its primary functionality is to monitor a registry for updates to container images and update both the cluster and the repo with the updated images.

#### [Kube-applier](https://github.com/box/kube-applier/issues/17)

Similar to Flux in that it runs in cluster, monitoring a git repo that contains manifests and applies them. Has a simple web ui and exports metrics but doesn't save the cluster's state.

#### [Helmfile](https://github.com/roboll/helmfile)

Applies Kubernetes Helm charts with environment specific values that can be checked into git. 
