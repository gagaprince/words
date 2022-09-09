const fs = require('fs');
const db = require('./utils/db');
const path = require('path');


module.exports = {
    init(){
        db.init();
        // this.parseLessonData();
    },

    async parseLessonTag(){
        const jsonData = this.loadJson();
        const firstList = jsonData.courseInfo.firstList;
        const secondList = jsonData.courseInfo.secondList;
        const bookDict = jsonData.courseInfo.bookDict;

        for (let i = 0; i < firstList.length; i++){
            const {typeName:book_tag} = firstList[i];
            const secondItem = secondList[i];
            for (let j = 0; j < secondItem.length; j++){
                const bookInfo = secondItem[j];
                const {renderName, realName, bookList} = bookInfo;
                const book_render_name = renderName;
                const book_name = realName || bookList[0];

                const bookDetailInfo = bookDict[book_name];
                const book_img = bookDetailInfo.bookimg || bookDetailInfo.imglist[0];
                console.log(book_tag,book_render_name,book_name,book_img);
                // if(!book_img){
                //     console.log(book_tag,book_render_name,book_name,book_img);
                // }
                await db.saveIntoLessonInfo({
                    book_tag,book_render_name,book_name,book_img
                })
            }
        }

    },
    
    async parseLessonData(){
        const jsonData = this.loadJson();
        const bookDict = jsonData.courseInfo.bookDict;
        // console.log(bookDict);

        const lessons = Object.keys(bookDict);
        console.log(lessons);

        for (let i=0;i<lessons.length;i++){
            const lesson = lessons[i];
            // console.log(lesson);
            lessonObj = bookDict[lesson];
            // console.log(lessonObj);
            const levellist = lessonObj['levellist'];
            const unitlists = lessonObj['unitlist'];

            
            for(let j=0; j<levellist.length;j++){
                const index = j;
                const level = levellist[index];
                const unitlist = unitlists[index];
                if(unitlist && unitlist.length > 0){
                    for(let k=0;k<unitlist.length;k++){
                        const unit = unitlist[k];
                        console.log(`${lesson}-${level}-${unit}`);
                        await db.saveIntoLesson(lesson,level,unit);
                    }
                }else{
                    console.log(`${lesson}-${level}`);
                    await db.saveIntoLesson(lesson,level);
                }
            }
        }

    },
    loadJson(){
        const filepath = path.resolve(__dirname,'..','req','req.json');
        const fileData = fs.readFileSync(filepath,'utf-8');
        return JSON.parse(fileData);
    }
}

