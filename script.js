let blogs = [
  {
    title: "My First Blog",
    desc: "Click to read my first blog post",
    link: "blog1.html",
    img: "https://via.placeholder.com/400x200",
    date: "March 2026",
    author: "Kazim"
  },
  {
    title: "My Second Blog",
    desc: "Click to read my second blog post",
    link: "blog2.html",
    img: "https://via.placeholder.com/400x200",
    date: "March 2026",
    author: "Kazim"
  }
];


function loadBlogs() {
  let container = document.getElementById("blogList");
  if (!container) return;

  container.innerHTML = "";

  blogs.forEach((blog, index) => {

    let featured = index === 0 ? "featured" : "";

    container.innerHTML += `
      <div class="card ${featured}">
        <a href="${blog.link}">
          <img src="${blog.img}" style="width:100%; border-radius:10px;">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <small>📅 ${blog.date} | ✍️ ${blog.author}</small>
        </a>
      </div>
    `;
  });
}
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ✅ WAIT for page load
document.addEventListener("DOMContentLoaded", function () {

  loadBlogs();

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });

});
