window.onload = function () {

    var googleLoginBtn = document.querySelector("#google-login-btn")
    var email = document.querySelector("#email")
    var password = document.querySelector("#password")
    var loginbtn = this.document.querySelector("#login-btn")


    googleLoginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        axios.post('/v/google-auth').then((response) => {
            window.location = response.data

        }).catch((e) => {
            console.log("Error ", e)
        })
    })
    loginbtn.addEventListener('click', (e) => {
        e.preventDefault()
        email = email.value
        password = password.value
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
            else {
                this.console.log("13 ", response.data.data)
                var cookie = this.document.cookie
                this.console.log('cokiee   ', cookie)
                window.location="/home"
            }

        }).catch((e) => {

        })
    })


}