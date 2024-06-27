//Stockage ADMINS dans le LS
const defaultAdmins = [
    { email: "admin1@admin.com", password: "azerty" },
    { email: "admin2@admin.com", password: "azerty" },
    { email: "jeje03@hotmail.fr", password: "aaaa" }
];
const storedAdmins = JSON.parse(localStorage.getItem('admins')) || defaultAdmins;
if (!localStorage.getItem('admins')) {
    localStorage.setItem('admins', JSON.stringify(defaultAdmins));
    console.log('Admins initialisés:', defaultAdmins);
}

//Stockage des recettes de base dans LS
const defaultRecipes = [
    {
        id: "1719300845556",
        title: "Boeuf Bourguignon",
        category: "Plats",
        cookingTime: "3 heures",
        preparationTime: "30 minutes",
        ingredients: [
            "1.5 kg de bœuf (gîte, macreuse, paleron)",
            "150 g de lardons",
            "3 carottes",
            "1 oignon",
            "2 gousses d'ail",
            "75 cl de vin rouge de Bourgogne",
            "250 ml de bouillon de bœuf",
            "2 cuillères à soupe de farine",
            "200 g de champignons de Paris",
            "20 petits oignons grelots",
            "1 bouquet garni (thym, laurier, persil)",
            "Sel et poivre",
            "2 cuillères à soupe d'huile d'olive",
            "50 g de beurre"
        ],
        steps: [
            "Coupez la viande de bœuf en gros cubes de 5 cm de côté.",
            "Dans une cocotte, faites chauffer l'huile d'olive et le beurre. Faites-y revenir les morceaux de bœuf jusqu'à ce qu'ils soient bien dorés de tous les côtés. Retirez-les et réservez.",
            "Dans la même cocotte, faites revenir les lardons jusqu'à ce qu'ils soient dorés. Ajoutez ensuite l'oignon émincé et les carottes coupées en rondelles. Faites cuire jusqu'à ce que les légumes soient tendres.",
            "Ajoutez l'ail haché et faites cuire encore une minute.",
            "Remettez la viande dans la cocotte. Saupoudrez de farine et mélangez bien pour enrober la viande.",
            "Versez le vin rouge et le bouillon de bœuf. Ajoutez le bouquet garni. Salez et poivrez.",
            "Portez à ébullition, puis réduisez le feu et laissez mijoter à couvert pendant 2 à 3 heures, jusqu'à ce que la viande soit bien tendre.",
            "Pendant ce temps, faites chauffer une poêle avec un peu de beurre. Ajoutez les champignons de Paris coupés en quartiers et faites-les sauter jusqu'à ce qu'ils soient dorés. Réservez.",
            "Dans la même poêle, faites revenir les oignons grelots jusqu'à ce qu'ils soient dorés. Ajoutez un peu d'eau, couvrez et laissez cuire jusqu'à ce qu'ils soient tendres.",
            "Une fois la viande cuite, retirez le bouquet garni de la cocotte. Ajoutez les champignons et les oignons grelots. Mélangez bien.",
            "Laissez mijoter encore 10 minutes pour que les saveurs se mélangent bien."
        ],
        photo: "https://imgs.search.brave.com/TPwGUWFCx6fA2S7pQcjRwIpDAUcdydGUSRNY-u_2j6I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucmljYXJkb2N1/aXNpbmUuY29tL3Nl/cnZpY2VzL3JlY2lw/ZXMvYmVzdC1wb3J0/cmFpdC5qcGc"
    },
    {
        id: "1719301834800",
        title: "Grilled Cheese",
        category: "Apéritifs",
        cookingTime: "10 minutes",
        preparationTime: "5 minutes",
        ingredients: [
            "4 tranches de pain de mie",
            "100g de fromage cheddar râpé",
            "50g de beurre"
        ],
        steps: [
            "Beurrer les tranches de pain de mie des deux côtés.",
            "Placer du fromage râpé entre deux tranches de pain.",
            "Faire chauffer une poêle et y déposer les sandwiches.",
            "Cuire à feu moyen jusqu'à ce que le pain soit doré et croustillant, et le fromage fondu.",
            "Couper en diagonale et servir chaud."
        ],
        photo: "https://imgs.search.brave.com/KGOYw2aChZ94z5cFb6VsMbujpFgkvZRWmOAXYg8c6Lw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/NjE2MzAyNS9waG90/by9jaGVlc2Utc2Fu/ZHdpY2guanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPWo5UVhN/cWZJYWl5RnAtVDF1/YUl6Tmh3aGtnMkRK/YnZOcFJDS1g2YzVr/aTQ9"
    },
    {
        id: "1719303021634",
        title: "Gratin Dauphinois",
        category: "Plats",
        cookingTime: "1h",
        preparationTime: "30 minutes",
        ingredients: [
            "1kg Pommes de terre",
            "30cl Crème liquide",
            "40cl Lait",
            "1 noisette Beurre",
            "1 gousse Ail",
            "1 pincée Noix de muscade",
            "Sel",
            "Poivre"
        ],
        steps: [
            "Préchauffez le four à 165 °C (th.5/6).",
            "Épluchez les pommes de terre, rincez-les et coupez-les en rondelles assez fines.",
            "Pelez ensuite la gousse d’ail.",
            "Frottez un plat à gratin avec la gousse d’ail et beurrez-le.",
            "Disposez une couche de pommes de terre dans le plat, salez, poivrez, ajoutez un peu de muscade, et répétez l’opération jusqu’à épuisement des pommes de terre.",
            "Versez la crème et le lait (le mélange doit recouvrir les pommes de terre) puis enfournez pour environ 1 h. Une fois bien gratiné",
            "Servez très chaud."
        ],
        photo: "https://imgs.search.brave.com/_pnXG6AhYec5CvlSI2Rc9KKDu4Tv15WMlZ9LJ0-_51g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jYWNo/ZS5tYXJpZWNsYWly/ZS5mci9kYXRhL3Bo/b3RvL3cxMDAwX2Np/LzZqL2xlLWdyYXRp/bi1kYXVwaGlub2lz/LWRlLWN5cmlsLWxp/Z25hYy5qcGc"
    },
    {
        id: "1719303627318",
        title: "Tiramisu",
        category: "Desserts",
        cookingTime: "4 heures (repos)",
        preparationTime: "20 minutes",
        ingredients: [
            "250g de mascarpone",
            "3 œufs",
            "100g de sucre",
            "20 biscuits à la cuillère",
            "300ml de café fort",
            "2 cuillères à soupe de cacao en poudre"
        ],
        steps: [
            "Séparer les blancs d'œufs des jaunes.",
            "Battre les jaunes d'œufs avec le sucre jusqu'à ce que le mélange blanchisse.",
            "Ajouter le mascarpone au mélange et bien mélanger.",
            "Battre les blancs en neige ferme et les incorporer délicatement au mélange.",
            "Tremper les biscuits à la cuillère dans le café et les disposer dans le fond d'un plat.",
            "Recouvrir d'une couche de crème au mascarpone.",
            "Répéter l'opération jusqu'à épuisement des ingrédients, en terminant par une couche de crème.",
            "Saupoudrer de cacao en poudre et réfrigérer pendant au moins 4 heures avant de servir."
        ],
        photo: "https://imgs.search.brave.com/gYRyWLFSKSAavJb8omMNlZs9mbJA8j3AVGMmpCxbwS0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwMS5ueXQuY29t/L2ltYWdlcy8yMDE3/LzA0LzA1L2Rpbmlu/Zy8wNUNPT0tJTkct/VElSQU1JU1UxLzA1/Q09PS0lORy1USVJB/TUlTVTEtYXJ0aWNs/ZUxhcmdlLmpwZz93/aWR0aD0xMjgwJnF1/YWxpdHk9NzUmYXV0/bz13ZWJw"
    },
    {
        id: "1719303646339",
        title: "Chakchouka",
        category: "Plats",
        cookingTime: "40 minutes",
        preparationTime: "15 minutes",
        ingredients: [
            "1 poivron rouge",
            "1 poivron vert",
            "1 poivron jaune",
            "1 gros oignon",
            "3 gousses d'ail",
            "4 tomates mûres",
            "4 œufs",
            "1 cuillère à soupe de concentré de tomate",
            "1 cuillère à café de cumin",
            "1 cuillère à café de paprika",
            "1 cuillère à café de piment en poudre (facultatif)",
            "4 cuillères à soupe d'huile d'olive",
            "Sel et poivre",
            "Persil frais pour la garniture"
        ],
        steps: [
            "Laver et couper les poivrons en lanières.",
            "Émincer l'oignon et hacher l'ail.",
            "Éplucher et couper les tomates en dés.",
            "Faire chauffer l'huile d'olive dans une grande poêle à feu moyen.",
            "Ajouter les oignons et l'ail, et les faire revenir jusqu'à ce qu'ils soient translucides.",
            "Ajouter les poivrons et cuire pendant environ 10 minutes jusqu'à ce qu'ils commencent à ramollir.",
            "Ajouter les tomates en dés, le concentré de tomate, le cumin, le paprika, le piment (si utilisé), le sel et le poivre.",
            "Laisser mijoter à feu doux pendant environ 20 minutes, en remuant de temps en temps, jusqu'à ce que les légumes soient bien tendres et que la sauce soit épaisse.",
            "Faire des petits puits dans la sauce et casser un œuf dans chaque puits.",
            "Couvrir la poêle et cuire jusqu'à ce que les blancs d'œufs soient pris mais que les jaunes soient encore coulants (environ 5 à 7 minutes).",
            "Garnir de persil frais haché avant de servir."
        ],
        photo: "https://imgs.search.brave.com/5is5LQ7cDJdh9J--vSZCVhdPeZ9SxNAK1G1M1ci9pmU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbXMt/Y2RuLmxhZm91cmNo/ZS5mci9jaGFjaG91/a2EuanBnP3JlY3Q9/MCwwLDEyMDAsODAw/Jnc9MTIwMCZoPTgw/MA"
    },
    {
        id: "1719304841297",
        title: "Daube de Boeuf",
        category: "Plats",
        cookingTime: "6 heures",
        preparationTime: "30 minutes",
        ingredients: [
            "2 kg de Jumeau (ou Joues de Bœuf, Paleron)",
            "4 beaux oignons émincés",
            "2 petites boîtes de concentré de tomates",
            "Laurier, thym",
            "2 gousses entières d'ail (non épluchées)",
            "1 cuillère à café et demie de sel",
            "75 cl de bon vin rouge x2",
            "2 carrés de chocolat",
            "1 cuillère à soupe de fond de sauce rôti",
            "150 cl de vin rouge corsé (en remplacement du premier vin)",
            "200-300 g de beurre"
        ],
        steps: [
            "Préparation de la viande :",
            "Coupez le morceau de jumeau (ou autre viande) en morceaux.",
            "Faites revenir tous les morceaux successivement dans de l'huile d'olive ou d'arachide jusqu'à ce qu'ils soient dorés sur toutes les faces. Réservez.",
            "Cuisson des légumes et préparation de la sauce :",
            "Dans la même cocotte, faites revenir les oignons émincés.",
            "Ajoutez ensuite les morceaux de viande, le concentré de tomates, le laurier, le thym, et les gousses d'ail non épluchées.",
            "Recouvrez le tout avec le vin rouge. Si nécessaire, ajoutez un peu d'eau pour que la viande soit bien immergée.",
            "Assaisonnez avec le sel.",
            "Cuisson à feu doux :",
            "Laissez cuire à feu doux (liquide frémissant) pendant environ 3 heures, en retournant la viande de temps en temps.",
            "Ajout des ingrédients supplémentaires :",
            "5 minutes avant de servir, ajoutez les deux carrés de chocolat pour enrichir la sauce.",
            "Ajoutez le fond de sauce rôti et 150 cl de vin rouge corsé pour intensifier le goût.",
            "Ajoutez également 200-300 g de beurre pour donner de la richesse et de l'onctuosité à la sauce.",
            "Finition et service :",
            "Sortez la viande et les lardons de la cocotte, puis coupez-les en tranches assez larges.",
            "Laissez la sauce bouillir à gros bouillons pour la réduire et la concentrer.",
            "Servez la viande nappée de cette sauce savoureuse, accompagnée de pommes de terre vapeur ou de pâtes fraîches."
        ],
        photo: "https://imgs.search.brave.com/KuZByCrtz7EZ1gG0OUnAMue966cZWi4SlBKKx88zKa8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzhjL0RhdWJlX2Rl/X2JvZXVmX2Nhcm90/dGVzLmpwZw"
    },
    {
        id: "1719308127367",
        title: "Spaghetti Carbonara",
        category: "Plats",
        cookingTime: "15 minutes",
        preparationTime: "10 minutes",
        ingredients: [
            "400g de spaghetti",
            "200g de lardons de poulet ou de porc",
            "2 jaunes d'œufs",
            "100g de parmesan râpé",
            "2 gousses d'ail",
            "20cl de crème fraîche",
            "Sel",
            "Poivre"
        ],
        steps: [
            "Faire cuire les spaghetti dans une grande casserole d'eau bouillante salée selon les instructions du paquet.",
            "Dans une poêle, faire revenir les lardons avec les gousses d'ail écrasées.",
            "Dans un bol, mélanger les jaunes d'œufs, la crème fraîche et le parmesan râpé.",
            "Égoutter les spaghetti et les ajouter dans la poêle avec les lardons.",
            "Hors du feu, ajouter le mélange œufs/crème/parmesan et bien mélanger.",
            "Saler et poivrer selon le goût, puis servir immédiatement."
        ],
        photo: "https://imgs.search.brave.com/2thEgMVQj-KnEJDQO08N7GApot2GaLSsJfDh_yAm4aI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzJkL1Nw/YWdoZXR0aV9hbGxh/X0NhcmJvbmFyYV8l/MjhNYWRyaWQlMjku/SlBHLzUxMnB4LVNw/YWdoZXR0aV9hbGxh/X0NhcmJvbmFyYV8l/MjhNYWRyaWQlMjku/SlBH"
    },
    {
        id: "1719310010001",
        title: "Salade César",
        category: "Entrées",
        cookingTime: "10 minutes",
        preparationTime: "20 minutes",
        ingredients: [
            "2 laitues romaines",
            "150g de croûtons",
            "100g de parmesan râpé",
            "2 filets de poulet",
            "4 cuillères à soupe de mayonnaise",
            "2 cuillères à soupe de jus de citron",
            "2 cuillères à soupe de sauce Worcestershire",
            "2 gousses d'ail",
            "Sel",
            "Poivre"
        ],
        steps: [
            "Faire cuire les filets de poulet à la poêle jusqu'à ce qu'ils soient bien dorés.",
            "Couper la laitue romaine en morceaux.",
            "Dans un bol, mélanger la mayonnaise, le jus de citron, la sauce Worcestershire et l'ail écrasé pour préparer la sauce.",
            "Dans un grand saladier, mélanger la laitue, les croûtons et le poulet coupé en morceaux.",
            "Ajouter la sauce et mélanger le tout.",
            "Saupoudrer de parmesan râpé avant de servir."
        ],
        photo: "https://imgs.search.brave.com/_BK080_z1JgCB0l1ZG7YZ4-BJBAN-2IiEygTIPR3Jw0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucmljYXJkb2N1/aXNpbmUuY29tL3Nl/cnZpY2VzL3JlY2lw/ZXMvODQ0MC5qcGc"
    },
    {
        id: "1719310010002",
        title: "Tomate Burrata",
        category: "Entrées",
        cookingTime: "5 minutes",
        preparationTime: "10 minutes",
        ingredients: [
            "4 tomates mûres",
            "2 boules de burrata",
            "4 cuillères à soupe d'huile d'olive",
            "2 cuillères à soupe de vinaigre balsamique",
            "Sel",
            "Poivre",
            "Basilic frais"
        ],
        steps: [
            "Couper les tomates en tranches épaisses.",
            "Disposer les tranches de tomates sur une assiette.",
            "Déposer les boules de burrata au centre.",
            "Arroser d'huile d'olive et de vinaigre balsamique.",
            "Saler, poivrer et garnir de basilic frais avant de servir."
        ],
        photo: "https://imgs.search.brave.com/hBnz-PHf6lmDLCxFnYFet8ZUooAqBKXDmhq9IcqdDj0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucmljYXJkb2N1/aXNpbmUuY29tL3Nl/cnZpY2VzL3JlY2lw/ZXMvNzIyNC0yLmpw/Zw"
    },
    {
        id: "1719310010003",
        title: "Houmous avec Pita",
        category: "Entrées",
        cookingTime: "5 minutes",
        preparationTime: "15 minutes",
        ingredients: [
            "400g de pois chiches cuits",
            "2 cuillères à soupe de tahini",
            "2 cuillères à soupe de jus de citron",
            "1 gousse d'ail",
            "1 cuillère à café de cumin",
            "4 cuillères à soupe d'huile d'olive",
            "Sel",
            "Poivre",
            "Pitas pour servir"
        ],
        steps: [
            "Mettre les pois chiches, le tahini, le jus de citron, l'ail et le cumin dans un mixeur.",
            "Mixer jusqu'à obtenir une texture lisse.",
            "Ajouter l'huile d'olive et mixer à nouveau.",
            "Assaisonner avec du sel et du poivre.",
            "Servir avec des pitas grillées."
        ],
        photo: "https://imgs.search.brave.com/VA2bexKN7QdOHsmp3k2zQShZNMqbbbym-vlLDXiYXKM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/Y3Vpc2luZWF6LmNv/bS82NjB4NjYwLzIw/MTMvMTIvMjAvaTc2/Nzk2LWh1bW11cy1l/dC1wYWluLXBpdGEt/bWFpc29uLmpwZWc"
    },
    {
        id: "1719310010004",
        title: "Lasagnes",
        category: "Plats",
        cookingTime: "1 heure",
        preparationTime: "30 minutes",
        ingredients: [
            "500g de viande hachée",
            "12 feuilles de lasagnes",
            "2 boîtes de tomates concassées",
            "1 oignon",
            "2 gousses d'ail",
            "500ml de béchamel",
            "100g de parmesan râpé",
            "200g de mozzarella",
            "2 cuillères à soupe d'huile d'olive",
            "Sel",
            "Poivre",
            "Herbes de Provence"
        ],
        steps: [
            "Faire revenir l'oignon et l'ail hachés dans l'huile d'olive.",
            "Ajouter la viande hachée et cuire jusqu'à ce qu'elle soit dorée.",
            "Ajouter les tomates concassées, saler, poivrer et ajouter les herbes de Provence. Laisser mijoter 20 minutes.",
            "Préchauffer le four à 180°C.",
            "Dans un plat à gratin, alterner les couches de feuilles de lasagnes, sauce à la viande et béchamel.",
            "Terminer par une couche de béchamel et saupoudrer de mozzarella et de parmesan.",
            "Enfourner pendant 30 à 40 minutes jusqu'à ce que le dessus soit doré.",
            "Laisser reposer 10 minutes avant de servir."
        ],
        photo: "https://imgs.search.brave.com/nTJ6s7iPU7TC2DCrlsjSNijrMaPAvzIfWWQGg_1zEPk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tY2Nv/cm1pY2sud2lkZW4u/bmV0L2NvbnRlbnQv/bjBpd2lleWxvZS9v/cmlnaW5hbC9sYXNh/Z25lc19hX2xfaXRh/bGllbm5lXzgwMHg4/MDAuanBn"
    },
    {
        id: "1719310010005",
        title: "Ile Flottante",
        category: "Desserts",
        cookingTime: "20 minutes",
        preparationTime: "15 minutes",
        ingredients: [
            "4 œufs",
            "100g de sucre",
            "500ml de lait",
            "1 gousse de vanille",
            "1 pincée de sel",
            "50g de sucre glace"
        ],
        steps: [
            "Séparer les blancs des jaunes d'œufs.",
            "Battre les jaunes avec 50g de sucre jusqu'à ce que le mélange blanchisse.",
            "Faire chauffer le lait avec la gousse de vanille fendue en deux.",
            "Verser le lait chaud sur les jaunes d'œufs en fouettant, puis remettre sur le feu doux jusqu'à épaississement. Ne pas faire bouillir.",
            "Monter les blancs en neige ferme avec une pincée de sel et le sucre glace.",
            "Former des quenelles avec les blancs en neige et les pocher dans de l'eau frémissante pendant 2 minutes de chaque côté.",
            "Servir les quenelles sur la crème anglaise."
        ],
        photo: "https://imgs.search.brave.com/eX-7j8MQ70o0T8vNrkMc4R5MRDQIzc6XAbGFLPUYAOE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vbGVzcGV0/aXRzc2VjcmV0c2Rl/bG9sby5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTkvMDEv/JUMzJUFFbGVzLWZs/b3R0YW50ZXMtMy5q/cGc_cmVzaXplPTQz/Nyw1MDgmc3NsPTE"
    }
];






//Add recette de base si non existante
const addDefaultRecipes = () => {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    console.log('Recettes existantes dans localStorage:', recipes);

    defaultRecipes.forEach(defaultRecipe => {
        const recipeExists = recipes.some(recipe => recipe.title === defaultRecipe.title);
        if (!recipeExists) {
            recipes.push(defaultRecipe);
            console.log(`Ajout d'une recette par défaut: ${defaultRecipe.title}`);
        }
    });

    localStorage.setItem('recipes', JSON.stringify(recipes));
    console.log('Recettes mises à jour dans localStorage:', recipes);
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Login Email:', email);
            console.log('Login Password:', password);

            const storedAdmins = JSON.parse(localStorage.getItem('admins'));
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            console.log('Admins stockés:', storedAdmins);
            console.log('Users stockés:', storedUsers);

            //Verif identifiants
            const admin = storedAdmins.find(admin => admin.email === email && admin.password === password);
            const user = storedUsers.find(user => user.email === email && user.password === password);

            if (admin || user) {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('userRole', admin ? 'admin' : 'user');
                localStorage.setItem('userEmail', email);
                console.log('Authentification:', admin ? 'Admin' : 'User');

                //Add recettes de base
                console.log('Ajout des recettes de base');
                addDefaultRecipes();

                window.location.href = 'index.html';
            } else {
                document.getElementById('error').innerText = 'Email ou mot de passe incorrect';
                console.log('Identification incorrecte');
            }
        });
    }
});