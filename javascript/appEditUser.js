// const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const button = document.getElementById("btn")

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (id !== null) {
    axios.get('http://localhost:3000/users/' + id + '')
        .then(function (response) {
            document.getElementById('name').value = response.data.name;
            document.getElementById('email').value = response.data.email;
            document.getElementById('password').value = response.data.password;
            document.getElementById('phone').value = response.data.phone;
        })
        .catch(function (err) {
            alert(err.message);
        });

}


button.addEventListener("click", () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const phone = phoneInput.value;

    try {
        allInputValidation(name, email, password, phone)
        axios.get('http://localhost:3000/users')
            .then(function (response) {
                var hasEmail = false
                const users = response.data;
                users.forEach(user => {
                    if (email == user['email'])
                        hasEmail = true
                })
                if (!hasEmail) {
                    axios.put('http://localhost:3000/users/' + id + '', {
                        name: name,
                        email: email,
                        password: password,
                        phone: phone
                    })
                        .then(() => {
                            window.location.href = 'adminPanel.html' + '';
                        })
                        .catch(function (err) {
                            alert(err)
                        })
                } else {
                    alert("Invalid Email !")
                }
            })
    } catch (error) {
        alert(error)
    }


});







const nameValidation = name => {
    if (name != "") {
        return true
    } else throw new Error("Invalid Name")
}

const phoneValidation = phone => {
    if (phone.length == 11) {
        return true
    } else {
        throw new Error("Invalid Number")
    }
}

const passwordValidation = (password) => {
    if (password.length >= 5) {
        return true
    } else throw new Error("Invalid Password")
}

const emailValidation = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    } else {
        throw new Error("Invalid Email")
    }
};

const allInputValidation = (name, email, password, phone) => {
    nameValidation(name), emailValidation(email)
    passwordValidation(password)
    phoneValidation(phone)
}
