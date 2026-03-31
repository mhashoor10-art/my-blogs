

function loadBlogs() {
  let container = document.getElementById("blogList");
  if (!container) return;

  container.innerHTML = "";

  blogs.forEach(blog => {
    container.innerHTML += `
      <div class="card">
        <a href="post.html?id=${blog.id}">
          <img src="${blog.img}" style="width:100%; border-radius:10px;">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <small>${blog.date}</small>
        </a>
      </div>
    `;
  });
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

document.addEventListener("DOMContentLoaded", function () {
  loadBlogs();
});
<script type="module">

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBlogs() {
  let container = document.getElementById("blogList");
  container.innerHTML = "";

  const data = await getDocs(collection(db, "blogs"));

  data.forEach((doc) => {
    let blog = doc.data();

    container.innerHTML += `
      <div class="card">
        <a href="post.html?id=${doc.id}">
          <img src="${blog.img}" style="width:100%; border-radius:10px;">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <small>${blog.date}</small>
        </a>
      </div>
    `;
  });
}

loadBlogs();

</script>
