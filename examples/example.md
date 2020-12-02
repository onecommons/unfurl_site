{::options parse_block_html="true" /}

# Example 1: frustration-free install 

Deploy a development environment on your local machine.


<iframe id=termFrame height="400" width="500" src="/examples/term1.html#showcontrols"></iframe>

<script>
  /*
  // to run different a session other than the default:
  // append ";dontrun" to the iframe url above and uncomment:
  var termData = [...termdata here...];

  document.getElementById("termFrame").onload = function() {
    this.contentWindow.run(termData);
  }*/
</script>

You can start using Unfurl in a few minutes, you just need a Linux or Mac machine with Python (2.7 or later), Git, and (for most uses) Docker installed. To install it run:

`pip install unfurl`

Now you can clone ensembles just like you would clone a git repository.

For this example,
``https://github.com/onecommons/unfurl_site.git`` is the git repository containing the source code to this website. It has a folder named ``unfurl`` that contains the unfurl project that describes how to deploy a local copy of the website and its development environment.

To clone it, 

``unfurl clone https://github.com/onecommons/unfurl_site.git#:unfurl``

This will clone the git repository into folder called ``unfurl_site`` just like git would. It will also create a new ensemble in that folder that is specific to your local machine.

Now you can deploy your local ensemble, just type:

``unfurl deploy unfurl_site/unfurl``

If you just installed `unfurl` this will take a few minutes as it creates your
`unfurl_home` and installs its dependencies. Then it will deploy the ensemble and the final lines of output should look like:

```
  > Outputs:
  >  site_url: http://127.0.0.1:4000/
```

You can now visit ``http://127.0.0.1:4000/`` to see the website you just deployed.

``unfurl stop unfurl_site``

The repository can also be used to deploy the site on AWS
