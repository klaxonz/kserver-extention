
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const { action } = request
    if (action === 'login') {
        // 登录
        const { email, password } = request
        fetch('http://localhost:9001/account/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            if (!response.ok) {
                return Promise.reject(response)
            }
            return response
        }).then(response => {
            sendResponse({
                code: "00000",
                msg: "登录成功",
                token: response.headers.get('authorization'),
                data: response.json()
            })
        }).catch(error => {
            if (error.statusCode === 401) {
                sendResponse({
                    code: "00001",
                    msg: "重新登录",
                    data: null
                })
            } else {
                sendResponse({
                    code: "90001",
                    msg: `未知错误, 状态码：${error.statusCode}`,
                    data: null
                })
            }
        })
    }
    else if (action === "save") {
        const { url, token } = request
        fetch('http://localhost:9001/web-page/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({
                url: url
            })
        }).then(response => {
            if (!response.ok) {
                // 登录失败
                return Promise.reject(response)
            }
            return response
        }).then(response => {
            sendResponse({
                code: "00000",
                msg: "保存成功",
                data: response.json()
            })
        }).catch(error => {
            if (error.statusCode === 401) {
                sendResponse({
                    code: "00001",
                    msg: "重新登录",
                    data: null
                })
            } else {
                sendResponse({
                    code: "90001",
                    msg: `未知错误, 状态码：${error.statusCode}`,
                    data: null
                })
            }
        })
    }
    return true
});


