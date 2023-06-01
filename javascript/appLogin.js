const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const button = document.getElementById("btn");

button.addEventListener ("click", async () =>{
    const email = emailInput.value;
    const password = passwordInput.value;

    await axios.get('http://localhost:3000/admins')
        .then(function (response) {
            const users = response.data;
            var validated = false
            users.forEach(user => {
                if (email == user['email']) {
                    if (password == user['password'])
                        validated = true;
                }
            })
            if (validated) {
                window.location.href = "adminPanel.html"
            }
        })
        .catch(function (err) {
            alert(err)
        });
    
    axios.get('http://localhost:3000/users')
        .then(function (response) {
            const users = response.data;
            var validated = false
            users.forEach(user => {
                if (email == user['email']) {
                    if (password == user['password'])
                        validated = true;
                }
            })
            if (validated) {
                window.location.href = "menu.html"
            } else {
                throw new Error("Invalid Account !");
            }
        })
        .catch(function (err) {
            alert(err)
        });


})
