let blogs = [
  {
    title: "My First Blog",
    desc: "Click to read my first blog post",
    link: "blog1.html"
  },
  {
    title: "My Second Blog",
    desc: "Click to read my second blog post",
    link: "blog2.html"
  }
];

function loadBlogs() {
  let container = document.getElementById("blogList");
  if (!container) return; // safety

  container.innerHTML = "";

  blogs.forEach(blog => {
    container.innerHTML += `
      <div class="card">
        <a href="${blog.link}">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
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
