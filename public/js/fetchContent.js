function fetchContent() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        // Do something, the request is ready
        document.getElementById('insertion').innerHTML = req.responseText;
      } else {
        alert("Request failure");
      }
    }
  };
  req.open('GET', '/rest/foobar', true);
  req.send(null);
}