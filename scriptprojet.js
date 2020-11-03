console.log("c'est ici qu'il faut coder votre javascript")

fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-primary-results&q=state%3DTexas&facet=state&facet=county&facet=party&facet=candidate")
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    res=JSON.stringify(data)
    console.log(res);
  })
