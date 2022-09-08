const fs = require('fs');
const path = require('path');
const spiderUtil = require('./utils/spiderUtil');
const db = require('./utils/db');

module.exports = {
    async test(){
        // spiderUtil.req({
        //     "type": "getsinglecourse",
        //     "openid": "oBkXr4g4HjdC_HCkkRy1SJFjPPvQ",
        //     "lastcourse": "四级高频2000-DAY 1"
        // })
        // const opid = this.genRandomOpenId();
        // console.log(opid);

        const data = await this.loadByLesson('四级高频2000-DAY 3');
        console.log(data);
        this.init();
        // const data = await this.loadFromDisk();
        this.parseLesson(data);

    },
    init(){
        db.init();
    },

    async loadFromDisk(){
        const filePath = path.resolve(__dirname,'..','req','res.json');
        const data = fs.readFileSync(filePath,'utf-8');
        return JSON.parse(data);
    },

    async loadByLesson(lesson){
       return spiderUtil.req({
            "type": "getsinglecourse",
            "openid": this.genRandomOpenId(),
            "lastcourse": lesson
        })
    },

    async parseLesson(data){
        const frontendlist = data.frontendlist;
        for(let i=0;i<frontendlist.length;i++){
            const frontend = frontendlist[i];
            for(let j=0;j<frontend.length;j++){
                const wordObj = frontend[j];
                if(wordObj){
                    const [word,word_zn,yinbiao,ks,un,voice,pic,sentence,cixing,video,captions,multi_mean,more_sentence,tmp,synonym_word,cixing_change,fast_remember] = wordObj;
                    console.log(word,word_zn,yinbiao,voice,pic,sentence,cixing,video,captions,multi_mean,more_sentence,tmp,synonym_word,cixing_change,fast_remember);
                    await db.saveIntoWordsWhenNotIn({
                        word,word_zn,yinbiao,voice,pic,sentence,cixing,video,cixing_change,fast_remember,
                        captions:JSON.stringify(captions),
                        multi_mean: JSON.stringify(multi_mean),
                        more_sentence:JSON.stringify(more_sentence),
                        synonym_word: JSON.stringify(synonym_word),
                        ctime:Date.now(),
                        utime:Date.now()
                    })
                }
            }
        }
    },

    genRandomOpenId(){
        let maxNum = 37;
        let count = 0;
        const str = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
                'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-' ];
        let toS = '';
        while(count < 22){
            let i = Math.floor(Math.random()*maxNum);
            if (i >= 0 && i < str.length) {
                toS+=str[i];
                count ++;
            }
        }
        return 'oBkXr4'+toS;
    }

}