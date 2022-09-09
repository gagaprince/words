const path = require('path');
const Mysql = require('node-mysql-promise');
let mysql = null;

module.exports={
    init(){
        if(!mysql){
            mysql = Mysql.createConnection({
                host: '182.92.1.128',
                user: 'root',
                password: 'ilovelxh123',
                database: 'words',
            });
        }
    },

    async updateLessonByWords(lesson,level,unit='',words){
         
    },

    async saveIntoLesson(lesson,level,unit='',words = ''){
        return mysql
            .table('lesson')
            .add({
                book_name: lesson,
                level_name: level,
                unit_name: unit,
                words: words,
                ctime: Date.now(),
                utime: Date.now()
            })
            .then(insertId => {
                console.log(insertId);
            })
            .catch(e => {
                console.log(e);
            });
    },

    async selectWordByWord(word){
        return mysql
            .table('words_en')
            .field('word')
            .where({ word: word })
            .select();
    },

    // 先查询不在库中 再保存
    async saveIntoWordsWhenNotIn(wordObj){
        const {word} = wordObj;
        const wordIn = await this.selectWordByWord(word);
        console.log(wordIn);
        if(!wordIn || wordIn.length===0){
            console.log('saveIntoWords',wordObj);
            return this.saveIntoWords(wordObj);
        }else{
            console.log(`已经存在 ${word} 跳过---------`);
        }

    },

    async saveIntoWords(wordObj){
        return mysql
            .table('words_en')
            .add(wordObj)
            .then(insertId => {
                console.log(insertId);
            })
            .catch(e => {
                console.log(e);
            });
    },

    async saveIntoLessonInfo(lessonInfo){
        return mysql
            .table('lesson_info')
            .add(lessonInfo)
            .then(insertId => {
                console.log(insertId);
            })
            .catch(e => {
                console.log(e);
            });
    },

}