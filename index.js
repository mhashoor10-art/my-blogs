import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogsDiv = document.getElementById("blogs");
let allBlogs = [];

/* LOAD BLOGS */
async function loadBlogs() {
  blogsDiv.innerHTML = "Loading...";

  const snap = await getDocs(collection(db, "blogs"));

  allBlogs = [];

  snap.forEach(doc => {
    allBlogs.push({ id: doc.id, ...doc.data() });
  });

  // 🔥 Latest first
  allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderBlogs(allBlogs);
}

/* HOME RENDER */
function renderBlogs(data) {
  blogsDiv.innerHTML = "";

  data.forEach(b => {
    blogsDiv.innerHTML += `
      <div class="card">
        <a href="post.html?id=${b.id}">
          <img src="${b.img}">
          <h3>${b.title}</h3>
          <p>${b.desc}</p>
        </a>
      </div>
    `;
  });
}

loadBlogs();

/* SEARCH */
document.getElementById("searchBtn").onclick = () => {
  let val = document.getElementById("searchInput").value.toLowerCase();

  let filtered = allBlogs.filter(b =>
    b.title.toLowerCase().includes(val) ||
    b.desc.toLowerCase().includes(val)
  );

  renderBlogs(filtered);
};
