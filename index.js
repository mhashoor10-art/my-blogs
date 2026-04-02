import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= FIREBASE ================= */
const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= BLOG LOAD ================= */
const blogsDiv = document.getElementById("blogs");

async function loadBlogs() {
  if (!blogsDiv) return;

  blogsDiv.innerHTML = "Loading...";

  try {
    const data = await getDocs(collection(db, "blogs"));

    let html = "";

    data.forEach((doc) => {
      const b = doc.data();

      html += `
        <div class="card">
          <a href="post.html?id=${doc.id}">
            <img src="${b.img || "https://via.placeholder.com/400"}">
            <h3>${b.title || "No Title"}</h3>
            <p>${b.desc || ""}</p>
          </a>
        </div>
      `;
    });

    blogsDiv.innerHTML = html || "<p>No blogs found</p>";

  } catch (err) {
    console.error("Blog load error:", err);
    blogsDiv.innerHTML = "<p>Error loading blogs</p>";
  }
}

loadBlogs();

/* ================= MENU SYSTEM ================= */
const nav = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

/* TOGGLE BUTTON */
window.toggleMenu = function () {
  if (!nav || !overlay) return;

  nav.classList.toggle("active");
  overlay.classList.toggle("active");
};

/* ================= AUTO CLOSE FIX ================= */
document.addEventListener("DOMContentLoaded", () => {

  if (!nav || !overlay) return;

  // overlay click → close
  overlay.addEventListener("click", () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
  });

  // link click → close
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

});
/* ================= SEARCH SYSTEM ================= */
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allBlogsData = [];

/* modify loadBlogs */
async function loadBlogs() {
  if (!blogsDiv) return;

  blogsDiv.innerHTML = "Loading...";

  try {
    const data = await getDocs(collection(db, "blogs"));

    let html = "";
    allBlogsData = []; // store blogs

    data.forEach((doc) => {
      const b = doc.data();
      b.id = doc.id;
      allBlogsData.push(b);
    });

    renderBlogs(allBlogsData);

  } catch (err) {
    blogsDiv.innerHTML = "<p>Error loading blogs</p>";
  }
}

/* render function */
function renderBlogs(data) {
  let html = "";

  data.forEach((b) => {
    html += `
      <div class="card">
        <a href="post.html?id=${b.id}">
          <img src="${b.img || "https://via.placeholder.com/400"}">
          <h3>${b.title || "No Title"}</h3>
          <p>${b.desc || ""}</p>
        </a>
      </div>
    `;
  });

  blogsDiv.innerHTML = html || "<p>No results found</p>";
}

/* search click */
searchBtn.addEventListener("click", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allBlogsData.filter(b =>
    b.title?.toLowerCase().includes(value) ||
    b.desc?.toLowerCase().includes(value)
  );

  renderBlogs(filtered);
});

/* enter key search */
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
