  function toggleFilter() {
    var panel = document.getElementById('filterPanel');
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  }


  function goToPage(url) {
    window.location.href = url;
}