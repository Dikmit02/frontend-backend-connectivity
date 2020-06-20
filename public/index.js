window.onload = function () {
    var btn = document.querySelector("#signupbtn")
    var loginbtn=document.querySelector('#loginbtn')

    btn.addEventListener('click', (e) => {
        e.preventDefault()
        window.location = "/signup"
    })


    loginbtn.addEventListener('click',(e)=>{
        e.preventDefault()
        window.location='/login'
    })





}