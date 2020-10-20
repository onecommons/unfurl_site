{::options parse_block_html="true" /}

# Example 1: frustration-free install


<iframe id=termFrame height="400" width="500" src="/examples/term1.html#showcontrols"></iframe>

<script>  
  /*
  // to run different a session other than the default:
  // append ";dontrun" to iframe url and uncomment:
  var termData = [...];

  document.getElementById("termFrame").onload = function() {
    this.contentWindow.run(termData);
  }*/
</script>

```
  pip install unfurl
  unfurl clone git:github.com/onecommons/unfurl_site#:unfurl
  unfurl deploy unfurl_site
  > output: working_dir
  > output: http://localhost:4000/
  unfurl run stop unfurl_site
```
