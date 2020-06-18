window.onload=function(){

    var signUpbtn=document.querySelector('#signup-btn')


    signUpbtn.addEventListener('click',(e)=>{
        e.preventDefault()
        console.log("okoko")
        axios.post('/v/signUp', {
            
            email: 'Fred@gmil.com',
            name: 'Flintstone',
            password: '1245678'
        })
        console.log("okoko")
    })



}