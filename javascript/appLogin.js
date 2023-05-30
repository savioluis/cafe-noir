const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const button = document.getElementById("btn");

button.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // axios.post("http://localhost:3000/users", {
    //     email: email,
    //     password: password,
    // })

    axios.get('http://localhost:3000/users')
        .then(function (response) {
            console.log(typeof password);
            const test = response.data;
            var verifica = false
            test.forEach(element => {
                if (email == element['email']) {
                    //email existe
                    if (password == element['password']) {
                        verifica = true;
                    }
                    console.log('email existe');
                }
            })
            if (verifica == true) {
                window.location.href = "menu.html"
            } else {
                throw new Error("Wrong !");
            }
        })
        .catch(function (err) {
            console.log(err);
        });


})
