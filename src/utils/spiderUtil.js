const axios = require('axios');
const config = {
    headers:{
        'Host':'aitalk.aitutuor.top',
        'content-type':'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a33) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wx42ea77c6bd06047d/46/page-frame.html',
    }
}

module.exports = {
    req(data){
        console.log(data);
        return axios({
            url:'https://aitalk.aitutuor.top/xxmbdc/jsonrequest',
            method:'POST',
            data,
            headers: config.headers
        }).then((ret)=>{
            return ret.data;
        })
    }
}