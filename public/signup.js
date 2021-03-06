window.onload = function () {

    var signUpbtn = document.querySelector('#signup-btn')
    var name = document.querySelector("#username")
    var email = this.document.querySelector("#email")
    var password = this.document.querySelector("#password")
    var confirm_password = this.document.querySelector("#confirm_password")


    signUpbtn.addEventListener('click', (e) => {
        e.preventDefault()
        name = name.value
        email = email.value
        password = password.value
        confirm_password = confirm_password.value
        if (password === confirm_password) {
            axios.post('/v/signUp', {

                email: email,
                name: name,
                password: password
            }, window.location = "/login").then((response) => {

                if (response.data.result === false) {
                    this.alert(response.data.data)
                    window.location = "/login"
                }
            }).catch((e) => {
                console.log("Error ", e)
            })
        }
        else {
            alert('Password mismatched')
            window.location = "/signup"
        }

    })


}