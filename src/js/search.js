document.addEventListener("DOMContentLoaded", function() {
    const searchFrom = document.querySelector("#form");
    const searchInput = document.querySelector("#search");
    const resultList = document.querySelector(".searchResults");

    if (searchFrom && searchInput && resultList) {
        searchFrom.addEventListener("submit", (e) => {
            e.preventDefault();
            searchRecipes();
            console.log("I am here");
        });
    } else {
        console.error("One or more elements not found.");
    }

    async function searchRecipes() {
        const searchValue = searchInput.value.trim();
        const response = await fetch(
            `https://api.edamam.com/search?q=${searchValue}&app_id=34cb3eeb&app_key=48e9cfebbd16e50346d1adfcea396f8a&from=0&to=10`
        );
        console.log(response);
        const data = await response.json();
        displayRecipes(data.hits);
    }

    function displayRecipes(recipes) {
        let html = "";
        recipes.forEach((recipe) => {
            html += `
                <div>
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                    <h3>${recipe.recipe.label}</h3>
                    <ul>
                        ${recipe.recipe.ingredientLines.map((ingredient) => `<li>${ingredient}</li>`).join("")}
                    </ul>
                    <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
                </div> 
            `;
        });

        resultList.innerHTML = html;
    }
});