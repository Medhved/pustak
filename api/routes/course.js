//routes/main.js

const controller = require('../controllers/course');

module.exports = [
    {
        method: 'GET',
        path: '/subjects',
        config: {
            cors: {
                origin: ['http://localhost:*']
            },
            description: 'Show all Subjects',
            notes: 'Shows all subjects',
            tags: ['api', 'sqlite3', 'data', 'subjects', 'list']
        },
        handler: controller.getSubjects.bind(controller)
    },
    {
        method: 'GET',
        path: '/subject/{subject_id}/courses',
        config: {
            cors: {
                origin: ['http://localhost:*']
            },
            description: 'Show all courses for a particular subject',
            notes: 'Show all courses for a particular subjects',
            tags: ['api', 'sqlite3', 'data', 'subjects', 'courses','list']
        },
        handler: controller.getSubjectCourses.bind(controller)
    },
    {
        method: 'GET',
        path: '/courses',
        config: {
            cors: {
                origin: ['http://localhost:*']
            },
            description: 'Show all courses',
            notes: 'Shows all courses',
            tags: ['api', 'sqlite3', 'data', 'courses', 'list']
        },
        handler: controller.getCourses.bind(controller)
    },
    {
        method: 'GET',
        path: "/course/{course_num}",
        config: {
            cors: {
                origin: ['http://localhost:*']
            },
            description: "Testing",
            notes: "Testing",
            tags: ["api", "test"]
        },
        handler: controller.getCourseBooks.bind(controller),
    }
]
