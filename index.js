<script type="module" src="index.js"></script>

<script>
window.onscroll = function () {
  let scrollTop = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scrollTop / height) * 100;

  document.getElementById("progressBar").style.width = progress + "%";
};
</script>

</body>
</html>
