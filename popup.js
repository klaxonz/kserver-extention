chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    var tab = tabs[0];
    const data =  {
        url: tab.url
    }
    fetch('http://localhost:9001/webpage/add', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((resp => resp.json())).then((data => {
        console.log(data)
        if (data.code === '0000000') {
            document.querySelector(".tips").innerText = "保存成功"
        } else{
            document.querySelector(".tips").innerText = data.desc
        }
    })).catch((error) => {
        document.querySelector(".tips").innerText = "保存失败"
    });
});





