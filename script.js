const headingText = document.getElementById("headingText");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");

let currentId = null;
const API_URL = "http://localhost:8080/api/heading";

function loadHeading() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      headingText.value = data.text || "No heading available.";
      currentId = data.id;
    })
    .catch(err => {
      headingText.value = "Failed to load heading.";
      console.error(err);
    });
}

editBtn.addEventListener("click", () => {
  headingText.removeAttribute("readonly");
  headingText.focus();
});

saveBtn.addEventListener("click", () => {
  const newText = headingText.value.trim();
  if (!newText) {
    alert("Heading can't be empty!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: currentId, text: newText })
  })
    .then(res => res.json())
    .then(data => {
      headingText.value = data.text;
      headingText.setAttribute("readonly", true);
      alert("Heading updated successfully!");
    })
    .catch(err => {
      alert("Error saving heading");
      console.error(err);
    });
});

loadHeading();
