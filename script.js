document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts");
  const addBtn = document.getElementById("addBtn");
  const messageInput = document.getElementById("message");

  // Load saved posts
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach(addPostToPage);

  // Add new post
  addBtn.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (text === "") return alert("Write something before posting!");

    const post = {
      text,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    savedPosts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    addPostToPage(post);
    messageInput.value = "";
  });

  function addPostToPage(post) {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <p>${post.text.replace(/\n/g, "<br>")}</p>
      <div class="date">${post.date}</div>
    `;
    postsContainer.prepend(div);
  }
});
