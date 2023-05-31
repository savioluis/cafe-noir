// const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("passwordConfirm");
const telInput = document.getElementById("tel");
const button = document.getElementById("btn")

const nameValidation = name => {
    if (name != "") {
        return true
    } else throw new Error("Invalid Name")
}

const phoneValidation = phone => {
    if (phone.length == 11) {
        return true
    } else {
        throw new Error("Invalid Number"), alert("Invalid Number")
    }
}

const passwordValidation = (password, passwordConfirm) => {
    if (password.length >= 5 && password == passwordConfirm) {
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

const checkBoxValidation = () => {
    if (document.getElementById("terms").checked) {
        return true
    } else {
        throw new Error("Accept the Terms")
    }
}

const allInputValidation = (name, email, password, passwordConfirm, tel) => {
    nameValidation(name), emailValidation(email)
    passwordValidation(password, passwordConfirm)
    phoneValidation(tel), checkBoxValidation()
}

button.addEventListener("click", () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    const tel = telInput.value;

    try {
        allInputValidation(name, email, password, passwordConfirm, tel)
        axios.get('http://localhost:3000/users')
            .then(function (response) {
                var hasEmail = false
                const users = response.data;
                users.forEach(user => {
                    if (email == user['email'])
                        hasEmail = true
                })
                if (!hasEmail) {
                    axios.post("http://localhost:3000/users", {
                        name: name,
                        email: email,
                        password: password,
                        tel: tel,
                    })
                        .then(() => {
                            window.location.href = "login.html";
                        })
                } else {
                    alert("Invalid Email !")
                }
            })
    } catch (error) {
        alert(error)
    }
});


