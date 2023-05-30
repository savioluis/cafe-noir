// const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("passwordConfirm");
const telInput = document.getElementById("tel");
const button = document.getElementById("btn")

button.addEventListener("click", () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    const tel = telInput.value;
    
    if (!(nameValidation(name) && emailValidation(email) && phoneValidation(tel) && passwordValidation(password, passwordConfirm) && checkBoxValidation())) {
        alert("Validation Error !")
    } else {
        axios.post("http://localhost:3000/users", {
            name: name,
            email: email,
            password: password,
            tel: tel,
        })
            .then((response) => {
                window.location.href = "login.html";
            })
            .catch(function (err) {
                alert("Error !");
            })
    }
});

const nameValidation = name => name != null;
    
const phoneValidation = phone => phone.length == 11;

const passwordValidation = (password, passwordConfirm) => {
    return password.length >= 5 && password == passwordConfirm
} 
    
const emailValidation = email => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
};

const checkBoxValidation = () => {
    return document.getElementById("terms").checked
}
