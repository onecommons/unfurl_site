{::options parse_block_html="true" /}

# How it works

Unfurl is a command line tool that works with Git to record and deploy changes to your DevOps infrastructure.
It tracks configuration changes, keeping a history of exactly how you did it and what the results are, so you can easily repair or recreate what you did later.

Unfurl integrates with the deployment tools you are already using, like Ansible, Terraform and Helm, organizing their usage into Ensembles, shareable abstractions that ease migrations to new environments as well as share and reuse your work.

# Create or clone an unfurl project.
An unfurl project is directory that consists of:
* A project file "unfurl.yaml" that describes the `contexts` that the ensembles in the project will run in.
* `Ensemble templates`, which contain a declarative model of your cloud infrastructure and how to invoke operations for creating and managing it.
* One or more ensembles, which are folders containing a `ensemble.yaml` -- a manifest describing the instantiation of an Ensemble template, including the status and state of the cloud resources it manages and a precise record of the artifacts and source repositories used. 

`unfurl` can automatically commit any changes to the project to one or more git repositories. Unfurl provides flexibility on how to map this layout to git repositories: Each ensemble can be in a separate git repository (useful for testing or ephemeral instances), a project can be a stand-alone repository or part of a source repository. 

## 1. Organize your deployment environment

<div class="has-text-centered">

![contexts](/images/contexts-diagram.svg)

</div>

### Unfurl allows you to collect your configuration information and organize them into contexts.
Contexts are used to create isolated environments that the Unfurl deployment process runs in.
For example, you might create different context for different projects or different deployment environments such as "production" or "staging".

Some of supported configuration include: 
* accounts and connections settings
* environment variables
* location and version for build tools and artifacts like executables and container images

Contexts can include secrets which can be in managed in a variety of ways including support for secret managers such as Hashicorp Vault or Amazon Secret Manager or transparently encrypting them using Ansible Vault.

### Bootstrap and manage your local environment

Unfurl stores these local contexts in an ".unfurl_home" Ensemble that represents its local environment. 
So you can use all its functionality to manage the local machine it is running on,
 for example, it can:
* automatically install project dependencies such as packages and executables. 
* Store configuration history in the ensemble's local git repository
* Manage external Git repositories needed for development and deployment (e.g. automatically clone remote repositories)

## 2. Model your cloud infrastructure

<div class="has-text-centered">

![model](/images/model_diagram.svg)

</div>

Specify your servers, applications, network, etc. with a declarative model that describes resources and their properties, dependencies, and relationships using the OASIS's [TOSCA](tosca) ("Topology and Orchestration Specification for Cloud Applications") standard). Leverage the TOSCA ecosystem of existing model libraries and tools.

TOSCA supports abstract type hierarchies and reusable templates for resources and relationships so your models can be truly cloud-agnostic. 

Topology also can describe its surrounding cloud environment such as required external resources so the deployment process can validate and adapt to its environment. 

Models can be vague with ad-hoc properties or they can be detailed and precise with strongly typed nodes and relationships, depending on need, and they can be incrementally refined over time.

Models can be dynamically generated and updated as part of the deployment process, for example from Helm charts or Terraform modules.

## 3. Implement your model

<div class="has-text-centered">

![implementation](/images/implementation_logos.svg)

</div>

Once you've specified the model, you can associate it with operations and workflows. 

There are several ways you can implement an operation:

* Shell scripts: apply templates to the response
* Terraform: Embed Terraform modules, manages Terraform state and artifacts
* Ansible: Embed playbooks, maps to TOSCA topology to Ansible inventories
* Python: in virtual Python environment

Domain-specific configurators:

* Docker: create and manage long running containers or run commands in ephemeral containers
* Kubernetes: create and manage Kubernetes resources
* Helm: Deploy Helm charts and manage Helm releases
* Supervisor: Simple process control for local development

Inputs and outputs from these implementations integration

* YAML DSL with expression language for querying instances and configuration 
- Path-based query DSL to express dynamic relationships between resources and configurations
* Jinja2 templates with Ansible filters.
* Mark values and files as sensitive so they can be treated as secrets.
* Files used by the implementations are automatically committed to the repository and changes are included in dependency analysis.

## 4. Deploy and Record

<div class="has-text-centered">

![record](/images/deploy-ensemble.svg)

</div>

Now you are ready to deploy your model -- run "unfurl deploy" from the command line and it will execute a plan. As it is running it tracks changes resource attributes and status and when it is complete it commits that to a Git repository. 
mirror not just the configuration but the state and status of live running services.

If you are already have deployed Unfurl supports "discover" and "check" workflows for detecting and syncing resources and operational state.

Unfurl supports incremental deployment and has a repair mode which can greatly accelerate development and testing development. 

Unfurl excels at "day two" operations such as backups, repairs and upgrades:

* It is easy to define your own workflows, interfaces and operations.
* You can also execute ad-hoc operations that will be recorded in git.
* Intelligent and fast incremental updates: Because Unfurl maintains a history of configuration changes and live operational state it can more employ more effective incremental update strategies.
* Maintaining an operational history makes it easier to diagnose and rollback problems.

## 5. Relocate, Share, Clone and Remix 

<div class="has-text-centered">

![ensembles](/images/ensembles-wide.svg)

</div>

* Clone and redeploy
* Clone and fork 
* Manage operations through collaborative, agile engineering practices such as pull requests, integrate CI/CD and unit tests in a secure, cloud-agnostic way. (+ chatbots, metrics and monitoring)
* Manage environment and integrate ensembles: match external ensembles and resources by type and constraints
* automated deployment: build isolation and boundaries
