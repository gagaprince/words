const parseLesson = require('./src/parseLesson');
const spiderLesson = require('./src/spiderLesson');

// parseLesson.getSomeData().then((data)=>{
//     console.log(data);
// });

parseLesson.init();
// spiderLesson.test();
parseLesson.parseLessonTag();