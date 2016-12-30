$(function() {
  // one time fetch of CSRF token
  $.ajax({
    type: "GET",
    url: "/",
    headers: {"X-Csrf-Token": "Fetch"},
    success: function(res, status, xhr) {
      var sHeaderCsrfToken = "X-Csrf-Token";
      var sCsrfToken = xhr.getResponseHeader(sHeaderCsrfToken);
      // for POST, PUT, and DELETE requests, add the CSRF token to the header
      $(document).ajaxSend(function(event, jqxhr, settings) {
        if (settings.type==="POST" || settings.type==="PUT" || settings.type==="DELETE") {
          jqxhr.setRequestHeader(sHeaderCsrfToken, sCsrfToken);
        }
      });
    }
  });
});