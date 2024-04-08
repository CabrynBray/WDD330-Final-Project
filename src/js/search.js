document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.querySelector("#form");
    const searchInput = document.querySelector("#search");
    const resultList = document.querySelector(".searchResults");

    if (searchForm && searchInput && resultList) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            searchRecipes();
        });
    } else {
        console.error("One or more elements not found.");
    }

    async function searchRecipes() {
        const searchValue = searchInput.value.trim();
        const response = await fetch(
            `https://api.edamam.com/search?q=${searchValue}&app_id=34cb3eeb&app_key=48e9cfebbd16e50346d1adfcea396f8a&from=0&to=10`
        );
        const data = await response.json();
        displayRecipes(data.hits);
    }

    function displayRecipes(recipes) {
        let html = "";
        recipes.forEach((recipe) => {
            // Check if recipe is liked
            const isLiked = isRecipeLiked(recipe.recipe.label);
            html += `
                <div class="recipe">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                    <h3>${recipe.recipe.label}</h3>
                    <ul>
                        ${recipe.recipe.ingredientLines.map((ingredient) => `<li>${ingredient}</li>`).join("")}
                    </ul>
                    <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
                    <button class="like-btn ${isLiked ? 'liked' : ''}" data-label="${recipe.recipe.label}">${isLiked ? 'Unlike' : 'Like'}</button>
                </div> 
            `;
        });

        resultList.innerHTML = html;

        // Attach event listeners for like buttons
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', toggleLike);
        });
    }

    function toggleLike(event) {
        const label = event.target.dataset.label;
        const likedRecipes = getLikedRecipes();

        if (likedRecipes.includes(label)) {
            // Recipe already liked, unlike it
            const index = likedRecipes.indexOf(label);
            likedRecipes.splice(index, 1);
        } else {
            // Recipe not liked, like it
            likedRecipes.push(label);
        }

        // Update liked recipes in localStorage
        localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));

        // Toggle like button class and text
        event.target.classList.toggle('liked');
        event.target.textContent = event.target.classList.contains('liked') ? 'Unlike' : 'Like';
    }

    function isRecipeLiked(label) {
        const likedRecipes = getLikedRecipes();
        return likedRecipes.includes(label);
    }

    function getLikedRecipes() {
        return JSON.parse(localStorage.getItem('likedRecipes')) || [];
    }
});