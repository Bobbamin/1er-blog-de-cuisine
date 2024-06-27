document.addEventListener('DOMContentLoaded', () => {
    //Refs au DOM
    const recipeForm = document.getElementById('recipeForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const showFavoritesBtn = document.getElementById('showFavoritesBtn');
    const recipeModal = document.getElementById('recipeModal');
    const createRecipeBtn = document.getElementById('createRecipeBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const recipesList = document.getElementById('recipesList');

    const authenticated = localStorage.getItem('authenticated') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    //Gestion interface users en fonction du role
    if (authenticated && userEmail) {
        if (userEmailDisplay) userEmailDisplay.textContent = userEmail;
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (showFavoritesBtn) showFavoritesBtn.style.display = 'block';
        if (userRole === 'admin' && createRecipeBtn) {
            createRecipeBtn.style.display = 'block';
        } else if (createRecipeBtn) {
            createRecipeBtn.style.display = 'none';
        }
        console.log('Utilisateur authentifié, chargement des recettes');
        loadRecipes();
    } else {
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (recipesList) recipesList.innerHTML = '';
        if (showFavoritesBtn) showFavoritesBtn.style.display = 'none';
        if (createRecipeBtn) createRecipeBtn.style.display = 'none';
        console.log('Utilisateur non authentifié, recettes non chargées');
    }

    //Gestion btn deconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('authenticated');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            window.location.href = 'home.html';
        });
    }

    //Ouvrir modale 
    window.openModal = (isEdit = false, recipeId = null) => {
        if (!recipeModal) return;
        recipeModal.classList.remove('hidden');
        const modalTitle = document.getElementById('modalTitle');
        modalTitle.textContent = isEdit ? 'Modifier la recette' : 'Ajouter une recette';
        if (isEdit && recipeId) {
            const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            const recipe = recipes.find(recipe => recipe.id == recipeId);
            if (recipe) {
                document.getElementById('recipeId').value = recipe.id;
                document.getElementById('title').value = recipe.title;
                document.getElementById('ingredients').value = recipe.ingredients.join('\n');
                document.getElementById('steps').value = recipe.steps.join('\n');
                document.getElementById('preparationTime').value = recipe.preparationTime;
                document.getElementById('cookingTime').value = recipe.cookingTime;
                document.getElementById('photo').value = recipe.photo;
                document.getElementById('category').value = recipe.category;
            }
        } else {
            if (recipeForm) recipeForm.reset();
        }
    };

    //Fermer modale
    window.closeModal = (reloadRecipe = false) => {
        if (!recipeModal) return;
        recipeModal.classList.add('hidden');
        if (reloadRecipe) {
            const recipeId = new URLSearchParams(window.location.search).get('id');
            if (recipeId) {
                viewRecipe(recipeId);
            }
        }
    };

    //Gestion btn pour créer recette
    if (createRecipeBtn) {
        createRecipeBtn.addEventListener('click', () => {
            if (userRole === 'admin') {
                openModal();
            } else {
                alert("Vous n'êtes pas autorisé à créer une recette.");
            }
        });
    }

    //Gestion du btn pour fermer modale
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    //Gestion de la soumission form recette
    if (recipeForm) {
        recipeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (localStorage.getItem('authenticated') !== 'true') {
                alert("Vous n'êtes pas autorisé à effectuer cette action.");
                return;
            }

            const recipeId = document.getElementById('recipeId').value;
            const title = document.getElementById('title').value;
            const ingredients = document.getElementById('ingredients').value.split('\n').filter(ingredient => ingredient.trim() !== '');
            const steps = document.getElementById('steps').value.split('\n').filter(step => step.trim() !== '');
            const preparationTime = document.getElementById('preparationTime').value;
            const cookingTime = document.getElementById('cookingTime').value;
            const photo = document.getElementById('photo').value;
            const category = document.getElementById('category').value;

            const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            const isEdit = modalTitle.textContent === 'Modifier la recette';

            if (isEdit) {
                const recipeIndex = recipes.findIndex(recipe => recipe.id == recipeId);
                if (recipeIndex !== -1) {
                    recipes[recipeIndex] = {
                        id: recipeId,
                        title,
                        ingredients,
                        steps,
                        preparationTime,
                        cookingTime,
                        photo,
                        category
                    };
                }
            } else {
                const newRecipe = {
                    id: Date.now().toString(),
                    title,
                    ingredients,
                    steps,
                    preparationTime,
                    cookingTime,
                    photo,
                    category
                };
                recipes.push(newRecipe);
            }

            localStorage.setItem('recipes', JSON.stringify(recipes));
            alert(isEdit ? 'Recette modifiée avec succès !' : 'Recette ajoutée avec succès !');
            loadRecipes();
            closeModal(isEdit);
        });
    }

    //Gestion recherche de recettes
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keyup', searchRecipes);
    }

    //Filtrage recettes par catégorie
    const filterCategory = document.getElementById('filterCategory');
    if (filterCategory) {
        filterCategory.addEventListener('change', filterRecipesByCategory);
    }

    //Affichage des détails de la recette
    const recipeDetailElement = document.getElementById('recipeDetail');
    if (recipeDetailElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');
        if (recipeId) {
            viewRecipe(recipeId);
            updateFavoriteButton(recipeId);
        }
    }

    //Afficher recettes fav
    if (showFavoritesBtn) {
        showFavoritesBtn.addEventListener('click', displayFavorites);
    }

    //Gestion btn de modif et de sup depuis une seule recette
    const editRecipeBtn = document.getElementById('editRecipeBtn');
    const deleteRecipeBtn = document.getElementById('deleteRecipeBtn');

    if (editRecipeBtn) {
        editRecipeBtn.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const recipeId = urlParams.get('id');
            openEditModalFromSingleRecipe(recipeId);
        });
    }

    if (deleteRecipeBtn) {
        deleteRecipeBtn.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const recipeId = urlParams.get('id');
        });
    }
});

//Charger les recettes du LS
const loadRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    console.log('Chargement des recettes :', recipes);
    displayRecipes(recipes);
};

//Afficher les recettes 
const displayRecipes = (recipes) => {
    const recipesList = document.getElementById('recipesList');
    if (!recipesList) {
        return;
    }

    console.log('Affichage des recettes :', recipes);

    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    const userFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const favorites = userFavorites[userEmail] || [];
    const selectedCategory = document.getElementById('filterCategory') ? document.getElementById('filterCategory').value : 'all';

    recipesList.innerHTML = '';

    const filteredRecipes = selectedCategory === 'all' ? recipes : recipes.filter(recipe => recipe.category === selectedCategory);

    filteredRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'card p-4';
        console.log('Creation dune carte pour la recette :', recipe);

        const comments = JSON.parse(localStorage.getItem(`comments_${recipe.id}`)) || [];
        const ratings = JSON.parse(localStorage.getItem(`ratings_${recipe.id}`)) || [];
        const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;
        const isFavorite = favorites.includes(recipe.id.toString());

        recipeCard.innerHTML = `
            <img src="${recipe.photo}" alt="${recipe.title}" class="w-full h-48 object-cover">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold mb-2">${recipe.title}</h2>
                ${isFavorite ? '<span class="text-red-500 ml-2">★</span>' : ''}
            </div>
            <p class="text-gray-700">Temps de préparation : ${recipe.preparationTime}</p>
            <p class="text-gray-700">Catégorie : ${recipe.category}</p>
            <p class="text-gray-700">Commentaires : ${comments.length}</p>
            <p class="text-gray-700">Note moyenne : ${averageRating.toFixed(1)} étoiles</p>
            <a href="singleRecipe.html?id=${recipe.id}" class="btn-primary mt-2 p-2 rounded-md inline-block">Voir les détails</a>
            ${userRole ? `
                <button class="btn-primary mt-2 p-2 rounded-md" onclick="toggleFavorite('${recipe.id}')">
                    ${isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
            ` : ''}
            ${userRole === 'admin' ? `
                <div class="flex space-x-4 mt-4">
                    <button onclick="openModal(true, '${recipe.id}')" class="btn-primary p-2 rounded-md">Modifier la recette</button>
                    <button onclick="confirmDeleteRecipe('${recipe.id}')" class="btn-primary p-2 rounded-md">Supprimer la recette</button>
                </div>
            ` : ''}
        `;
        recipesList.appendChild(recipeCard);
    });
};

//Add ou sup fav
const toggleFavorite = (recipeId) => {
    const userEmail = localStorage.getItem('userEmail');
    let userFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (!userFavorites[userEmail]) {
        userFavorites[userEmail] = [];
    }
    if (!userFavorites[userEmail].includes(recipeId.toString())) {
        userFavorites[userEmail].push(recipeId.toString());
        localStorage.setItem('favorites', JSON.stringify(userFavorites));
        alert('Recette ajoutée aux favoris');
    } else {
        userFavorites[userEmail] = userFavorites[userEmail].filter(fav => fav !== recipeId.toString());
        localStorage.setItem('favorites', JSON.stringify(userFavorites));
        alert('Recette retirée des favoris');
    }
    loadRecipes();
};

//Confirmation de supp
const confirmDeleteRecipe = (id) => {
    console.log('Confirmation de suppression pour la recette ID :', id);
    if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
        deleteRecipe(id);
    }
};

//Supp recette
const deleteRecipe = (id) => {
    console.log('Tentative de suppression de la recette ID :', id);
    if (localStorage.getItem('authenticated') !== 'true') {
        alert("Vous n'êtes pas autorisé à effectuer cette action.");
        return;
    }

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    console.log('Recettes actuelles :', recipes);
    const originalLength = recipes.length;
    recipes = recipes.filter(recipe => recipe.id !== id);
    const newLength = recipes.length;
    console.log('Recettes après tentative de suppression :', recipes);

    if (originalLength === newLength) {
        console.error('Aucune recette trouvée avec ID :', id);
    } else {
        localStorage.setItem('recipes', JSON.stringify(recipes));
        alert('Recette supprimée avec succès !');
        window.location.href = 'home.html';
    }
};

//Rechercher recette
const searchRecipes = () => {
    const query = document.getElementById('search').value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(query));
    displayRecipes(filteredRecipes);
};

//Filter par catégories
const filterRecipesByCategory = () => {
    loadRecipes();
};

//Afficher les details
const viewRecipe = (id) => {
    console.log('Récupération de la recette avec ID :', id);
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes.find(recipe => recipe.id == id);
    console.log('Recette récupérée :', recipe);

    const userRole = localStorage.getItem('userRole');

    if (recipe) {
        const recipeDetailElement = document.getElementById('recipeDetail');
        if (recipeDetailElement) {
            const ingredientsList = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
            const stepsList = recipe.steps.map(step => `<li>${step}</li>`).join('');

            recipeDetailElement.innerHTML = `
            <img src="${recipe.photo}" alt="${recipe.title}" class="w-full h-64 object-cover rounded-md mb-4">
            <h2 class="text-3xl font-bold mb-4">${recipe.title}</h2>
            <p class="text-gray-700 mb-4"><strong>Temps de préparation :</strong> ${recipe.preparationTime}</p>
            <p class="text-gray-700 mb-4"><strong>Temps de cuisson :</strong> ${recipe.cookingTime}</p>
            <p class="text-gray-700 mb-4"><strong>Catégorie :</strong> ${recipe.category}</p>
            <h3 class="text-2xl font-bold mb-2">Ingrédients</h3>
            <ul class="list-disc list-inside text-gray-700 mb-4">${ingredientsList}</ul>
            <h3 class="text-2xl font-bold mb-2">Étapes</h3>
            <ol class="list-decimal list-inside text-gray-700 mb-4">${stepsList}</ol>
            ${userRole === 'admin' ? `
                <div class="flex space-x-4 mt-4">
                    <button id="editRecipeBtn" class="btn-primary p-2 rounded-md">Modifier la recette</button>
                    <button id="deleteRecipeBtn" class="btn-primary p-2 rounded-md">Supprimer la recette</button>
                </div>
            ` : ''}
        `;
            updateFavoriteButton(id);
            const editRecipeBtn = document.getElementById('editRecipeBtn');
            const deleteRecipeBtn = document.getElementById('deleteRecipeBtn');

            if (editRecipeBtn) {
                editRecipeBtn.addEventListener('click', () => openEditModalFromSingleRecipe(id));
            }

            if (deleteRecipeBtn) {
                deleteRecipeBtn.addEventListener('click', () => confirmDeleteRecipe(id));
            }
        }
    } else {
        alert("Recette non trouvée !");
    }
};

//Gestions des coms

const addCommentBtn = document.getElementById('addCommentBtn');
if (addCommentBtn) {
    addCommentBtn.addEventListener('click', () => {
        const recipeId = new URLSearchParams(window.location.search).get('id');
        const commentText = document.getElementById('commentText').value;
        if (!commentText) return;

        const userEmail = localStorage.getItem('userEmail');
        const comments = JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];
        comments.push({ text: commentText, date: new Date().toLocaleString(), user: userEmail });

        localStorage.setItem(`comments_${recipeId}`, JSON.stringify(comments));
        displayComments();
        document.getElementById('commentText').value = '';
    });
}

//Afficher coms
const displayComments = () => {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
        const comments = JSON.parse(localStorage.getItem(`comments_${recipeId}`)) || [];
        commentsList.innerHTML = comments.map(comment =>
            `<li>${comment.text} - <small>${comment.user} (${comment.date})</small></li>`
        ).join('');
    }
};

displayComments();

//Gestion etoiles

const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const recipeId = new URLSearchParams(window.location.search).get('id');
        const rating = star.getAttribute('data-value');
        const ratings = JSON.parse(localStorage.getItem(`ratings_${recipeId}`)) || [];

        ratings.push(parseInt(rating));
        localStorage.setItem(`ratings_${recipeId}`, JSON.stringify(ratings));
        displayAverageRating();

        updateStars(rating);
    });
});

//MAJ stars
const updateStars = (rating) => {
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
};

const initializeStars = () => {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    const ratings = JSON.parse(localStorage.getItem(`ratings_${recipeId}`)) || [];
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;
    updateStars(Math.round(averageRating));
};

initializeStars();

//Afficher la note moyenne
const displayAverageRating = () => {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    const ratings = JSON.parse(localStorage.getItem(`ratings_${recipeId}`)) || [];
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;

    const averageRatingElement = document.getElementById('averageRating');
    if (averageRatingElement) {
        averageRatingElement.textContent = `Note moyenne : ${averageRating.toFixed(1)} étoiles`;
    }
};

displayAverageRating();


//Maj bouton fav
const updateFavoriteButton = (recipeId) => {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const userEmail = localStorage.getItem('userEmail');
    let userFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    if (!userFavorites[userEmail]) {
        userFavorites[userEmail] = [];
    }

    if (userFavorites[userEmail].includes(recipeId.toString())) {
        favoriteBtn.textContent = 'Retirer des favoris';
    } else {
        favoriteBtn.textContent = 'Ajouter aux favoris';
    }
};

//Gestion boutons fav
const favoriteBtn = document.getElementById('favoriteBtn');
if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
        const recipeId = new URLSearchParams(window.location.search).get('id');
        const userEmail = localStorage.getItem('userEmail');
        let userFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        if (!userFavorites[userEmail]) {
            userFavorites[userEmail] = [];
        }
        if (!userFavorites[userEmail].includes(recipeId.toString())) {
            userFavorites[userEmail].push(recipeId.toString());
            localStorage.setItem('favorites', JSON.stringify(userFavorites));
            alert('Recette ajoutée aux favoris');
            favoriteBtn.textContent = 'Retirer des favoris';
        } else {
            userFavorites[userEmail] = userFavorites[userEmail].filter(fav => fav !== recipeId.toString());
            localStorage.setItem('favorites', JSON.stringify(userFavorites));
            alert('Recette retirée des favoris');
            favoriteBtn.textContent = 'Ajouter aux favoris';
        }
    });
}

//Afficher recettes fav
const displayFavorites = () => {
    const userEmail = localStorage.getItem('userEmail');
    const userFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const favorites = userFavorites[userEmail] || [];
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id.toString()));

    displayRecipes(favoriteRecipes);
};

const showFavoritesBtn = document.getElementById('showFavoritesBtn');
if (showFavoritesBtn) {
    showFavoritesBtn.addEventListener('click', displayFavorites);
}

//Modal pour singleR
const openEditModalFromSingleRecipe = (recipeId) => {
    openModal(true, recipeId);
};
