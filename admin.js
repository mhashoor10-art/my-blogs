let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function addBlog() {
  let blog = {
    id: Date.now(),
    title: document.getElementById("title").value,
    desc: document.getElementById("desc").value,
    img: document.getElementById("img").value,
    content: document.getElementById("content").value,
    date: new Date().toDateString(),
    author: "Kazim"
  };

  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));

  alert("Blog Added 🚀");

  clearForm();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("img").value = "";
  document.getElementById("content").value = "";
}
