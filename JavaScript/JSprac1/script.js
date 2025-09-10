// Function to update character count
function updateCount(textarea, counter) {
  counter.textContent = textarea.value.length;
}

// First textarea
const textarea1 = document.getElementById("textarea1");
const count1 = document.getElementById("count1");
textarea1.addEventListener("input", () => updateCount(textarea1, count1));

// Second textarea
const textarea2 = document.getElementById("textarea2");
const count2 = document.getElementById("count2");
textarea2.addEventListener("input", () => updateCount(textarea2, count2));

// Initialize counters on page load
updateCount(textarea1, count1);
updateCount(textarea2, count2);
