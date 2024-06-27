document.addEventListener('DOMContentLoaded', () => {
    //Recup form inscription
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            console.log('Signup Email:', email);
            console.log('Signup Password:', password);

            //Recup user dans le LS ou tab vide
            const users = JSON.parse(localStorage.getItem('users')) || [];

            //Verif user
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                document.getElementById('error').innerText = 'Cet Email existe déjà';
                console.log('Mail deja utilisé');
            } else {
                users.push({ email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Bravo, vous venez de créer votre compte! Connectez vous pour continuer.');
                console.log('User enregistré:', { email, password });
                window.location.href = 'login.html';
            }
        });
    }
});
