window.onload = function () {

    var googleLoginBtn = document.querySelector("#google-login-btn")
    var email = document.querySelector("#email")
    var password = document.querySelector("#password")
    var loginbtn = this.document.querySelector("#login-btn")


    googleLoginBtn.addEventListener('click', (e) => {
        e.preventDefault()

    })
    loginbtn.addEventListener('click', (e) => {
        e.preventDefault()
        email = email.value
        password = password.value
        this.console.log(email, password)
        axios.post('/v/loginLocal', {
            email: email,
            password: password
        }).then((response) => {
            if (response.data.result === false) {
                this.alert(response.data.data)
                if (response.data.data === `email not found`) {
                    window.location = "/signup"
                }
                else if ((response.data.data === `Wrong  password`)) {
                    window.location = "/login"
                }
            }
          
        }).catch((e) => {

        })
    })


}