{::options parse_block_html="true" /}

# How it works

Unfurl is a command line tool that works with Git to record and deploy changes to your DevOps infrastructure.
It tracks configuration changes, keeping a history of exactly how you did it and what the results are, so you can easily repair or recreate what you did later.

Unfurl integrates with the deployment tools you are already using, like Ansible, Terraform and Helm, organizing their usage into Ensembles, shareable abstractions that ease migrations to new environments as well as share and reuse your work.

## Key Concepts

#### Ensemble manifest

At the core of Unfurl is an Ensemble manifest, a YAML file that includes:

* A model of the cloud resources it manages (using the OASIS’s TOSCA 1.3 (“Topology and Orchestration Specification for Cloud Applications”) standard)

* Implementations of operations and workflows that can be applied to those resources.

* A record of the operational status of those resources.

#### Unfurl projects

An unfurl project is directory that consists of:
* A project file "unfurl.yaml" that describes the `contexts` that the ensembles in the project will run in.
* `Ensemble templates`, which contain a declarative model of your cloud infrastructure and how to invoke operations for creating and managing it.
* One or more ensembles, which are folders containing a `ensemble.yaml` -- a manifest describing the instantiation of an Ensemble template, including the status and state of the cloud resources it manages and a precise record of the artifacts and source repositories used. 

#### .unfurl_home

Unfurl creates a “home” project (by default in `~/.unfurl_home`) representing the local machine. It is used to bootstrap the local deployment environment and its configuration settings are inherited by each Unfurl project on that machine.

#### Unfurl repositories

`unfurl` can automatically commit any changes to the project to one or more git repositories. Unfurl provides flexibility on how to map this layout to git repositories, supporting both "monorepo" and "polyrepo" arrangements. An ensemble can keep instance data and specifications in  separate git repositories (useful for testing or ephemeral instances) and a project can live in a dedicated repository or be part of a source repository.

## Steps to build your ensemble

1. [Organize and isolate](#1-organize-your-deployment-environment)
2. [Model](#2-model-your-cloud-infrastructure)
3. [Implement](#3-implement-your-model)
4. [Activate](#4-activate-and-manage)
5. [Publish and Remix](#5-share-clone-and-remix)

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

Specify your servers, applications, network, etc. with a declarative model that describes resources and their properties, dependencies, and relationships using the OASIS's [TOSCA](/docs/tosca.html) ("Topology and Orchestration Specification for Cloud Applications") standard). Leverage the TOSCA ecosystem of existing model libraries and tools.

TOSCA supports abstract type hierarchies and reusable templates for resources and relationships so your models can be truly cloud-agnostic. 

Topology also can describe its surrounding cloud environment such as required external resources so the deployment process can validate and adapt to its environment. 

Models can be vague with ad-hoc properties or they can be detailed and precise with strongly typed nodes and relationships, depending on need, and they can be incrementally refined over time.

Models can be dynamically generated and updated as part of the deployment process, for example from Helm charts or Terraform modules.

## 3. Implement your model

<div class="has-text-centered">

![implementation](/images/implementation_logos.svg)

</div>

Once you've specified the model, you associate it with operations and workflows in YAML using plugins called "configurators", which integrate configuration tools, including:

* [Shell scripts](docs/configurators.html#shell): Invoke scripts or invoke programs.
* [Terraform](docs/configurators.html#terraform): Embed Terraform modules, manages Terraform state and artifacts.
* [Ansible](docs/configurators.html#ansible): Embed playbooks, map TOSCA instances to Ansible inventories
* [Python](docs/api.html#module-unfurl.configurator): Execute Python code in a virtual Python environment. 

Domain-specific configurators:

* [Docker](docs/configurators.html#docker): create and manage long running containers or run commands in ephemeral containers
* [Kubernetes](docs/configurators.html#kubernetes): create and manage Kubernetes resources
* [Helm](docs/configurators.html#helm): Deploy Helm charts and manage Helm releases
* [Supervisor](docs/configurators.html#supervisor): Simple process control for local development.

The YAML configuration language has several facilities for processing an operation's inputs and outputs, including:

* A path based expression language for querying resources and configuration 
* Apply Jinja2 templates with Ansible filters.
* Mark values and files as sensitive so they can be treated as secrets.
* Files touched by the configurators are automatically committed to the repository and their changes are included in dependency analysis.

## 4. Activate and Manage

<div class="has-text-centered">

![record](/images/deploy-ensemble.svg)

</div>

Now you are ready to deploy your model -- run "unfurl deploy" from the command line and it will execute a plan. As it is running it tracks changes resource attributes and status and when it is complete it commits that to a Git repository. 
mirror not just the configuration but the state and status of live running services.

If you are already have live resources Unfurl supports "discover" and "check" workflows for detecting and syncing resources and operational state.

Unfurl supports incremental deployment and has a repair mode which can greatly accelerate development and testing development. 

Unfurl excels at "day two" operations such as backups, repairs and upgrades:

* It is easy to define your own workflows, interfaces and operations.
* You can also execute ad-hoc operations that will be recorded in git.
* Intelligent and fast incremental updates: Because Unfurl maintains a history of configuration changes and live operational state it can more employ more effective incremental update strategies.
* Maintaining an operational history makes it easier to diagnose and rollback problems.

## 5. Share, Clone and Remix 

<div class="has-text-centered">

![ensembles](/images/ensembles-wide.svg)

</div>

You can share and clone Unfurl projects and ensembles just like you share and clone git repositories. Because Unfurl cleanly separates secrets and local settings Unfurl repositories are self-contained and location independent.

Like a git repository your Unfurl repository can be private or public, but either way, when you publish your ensemble the real power of Unfurl kicks in. Now other Unfurl projects can import and reference it, much like you import a module or package in a software program. 

Once imported, other ensembles can reference the ensemble's exported api endpoints, network resources or artifacts in their models, selecting them based on their type and other declared constraints.

### Cloud agnostic and location independent

And because Ensembles maintain a persistent identity you can maintain these relationships as their internal implementations change -- even if their locations change, even if they migrate to different cloud providers using a very different implementations. Or not: these references can also detect changes that violate the declared contracts between ensembles.

### Cloud as code

Because Ensembles not just contain configuration but also reflects the state of live instances you can use the same development processes you for coding to also manage your IT infrastructure, for example:

* use pull requests and sign-offs to manage updates and changes.
* use feature branches and forks to manage deployment strategies
* use CI/CD tests to validate changes
* use git web hooks to trigger automated deployment to enable secure resource isolation
