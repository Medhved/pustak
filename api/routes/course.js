//routes/main.js

const controller = require('../controllers/course');

module.exports = [{
        method: 'GET',
        path: '/courses',
        config: {
            description: 'Show all courses',
            notes: 'Shows all courses',
            tags: ['api', 'sqlite3', 'data', 'subjects', 'list']
        },
        handler: controller.getCourses.bind(controller)
    },
    {
        method: 'GET',
        path: "/course/{course_num}",
        config: {
            description: "Testing",
            notes: "Testing",
            tags: ["api", "test"]
        },
        handler: controller.getCourseBooks.bind(controller),
    }
]
