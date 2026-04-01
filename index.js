import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlQP-s0Q-y6J1POkEEHrcDP32Wn6JPK_4",
  authDomain: "kazim-aa621.firebaseapp.com",
  projectId: "kazim-aa621",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const blogsDiv = document.getElementById("blogs");

async function loadBlogs() {
  blogsDiv.innerHTML = "Loading...";

  try {
    const q = query(collection(db, "blogs"), limit(10));
    const data = await getDocs(q);

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

    blogsDiv.innerHTML = html;

  } catch (error) {
    console.error(error);
    blogsDiv.innerHTML = "Failed to load blogs";
  }
}

loadBlogs();
