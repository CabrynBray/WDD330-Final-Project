function getLikedRecipes() {
  const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
  return likedRecipes;
}

// Function to display liked recipes on the page
function displayLikedRecipes() {
  const likedRecipes = getLikedRecipes();
  const likedRecipesContainer = document.querySelector(".liked-recipes");

  if (!likedRecipesContainer) {
    console.error("Element with class 'liked-recipes' not found.");
    return;
  }

  if (likedRecipes.length === 0) {
    likedRecipesContainer.innerHTML = "<p>No liked recipes yet.</p>";
    return;
  }

  likedRecipesContainer.innerHTML = ""; // Clear previous content

  likedRecipes.forEach((recipe) => {
    let html = "";

    html += `
            <div class="recipe">
                <h3>${recipe}</h3>
            </div> 
        `;

    likedRecipesContainer.innerHTML += html; // Append each recipe HTML
  });
}

// Call displayLikedRecipes function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayLikedRecipes);
