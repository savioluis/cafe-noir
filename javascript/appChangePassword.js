const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("passwordConfirm");
const button = document.getElementById("btn")

const passwordValidation = (password, passwordConfirm) => {
    if (password.length >= 5 && password == passwordConfirm) {
        return true
    } else throw new Error("Invalid Password")
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

button.addEventListener("click", () => {
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    try {
        passwordValidation(password, passwordConfirm)

        axios.put('http://localhost:3000/users/' + id + '', {
            password: password
        })
            .then(() => {
                alert("Changed !")
                window.location.href = 'login.html' + '';
            })
    } catch (error) {
        alert(error)
    }
});