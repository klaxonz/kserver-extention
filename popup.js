// const url = window.location.href
// chrome.runtime.sendMessage({url}, (response) => {
//     console.log(response)
// });


// if add page success hide the login page
// else show the login page to login

document.addEventListener('DOMContentLoaded', () => {
    addLoginClickEvent()
})

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    chrome.runtime.sendMessage({
        action: "save",
        url: url
    }, (response) => {
        const code = response.code
        if (code === '00000') {
            document.getElementById('container1').style = 'display: none'
            document.getElementById('container2').style = ''
        } else {
            document.getElementById('container1').style = ''
            document.getElementById('container2').style = 'display: none'
        }
    })
})




function addLoginClickEvent() {
    document.getElementById("login").addEventListener("click", () => {
        const email = document.getElementById("email").value.trim()
        const password = document.getElementById("password").value.trim()
        if (!email) {
            return
        }
        if (!password) {
            return
        }
        chrome.runtime.sendMessage({
            action: "login",
            email: email,
            password: password,
        }, (response) => {
            const code = response.code
            if (code === '00000') {
                document.getElementById('container1').style = 'display: none'
                document.getElementById('container2').style = ''
            } else {
                document.getElementById('container1').style = ''
                document.getElementById('container2').style = 'display: none'
            }
        })
    })
}

