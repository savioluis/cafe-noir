const emailInput = document.getElementById("email");
const button = document.getElementById("btn")

const passwordValidation = (password, passwordConfirm) => {
    if (password.length >= 5 && password == passwordConfirm) {
        return true
    } else throw new Error("Invalid Password")
}

button.addEventListener("click", () => {
    const email = emailInput.value;

    axios.get('http://localhost:3000/users')
        .then(function (response) {
            const users = response.data;
            var validated = false
            let id = '';
            users.forEach(user => {
                if (email == user['email']) {
                    validated = true;
                    id = user._id;
                }
            })
            if (validated) {
                window.location.href = 'changePassword.html?id=' + id + '';
            } else {
                throw new Error("Invalid Email !");
            }
        })
        .catch(function (err) {
            alert(err)
        });

})

