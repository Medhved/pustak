//routes/main.js

const controller = require('../controllers/main');

module.exports = [{
        method: 'GET',
        path: '/import/booklist',
        config: {
            description: 'Import Raw Booklist Data',
            notes: 'Import raw booklist data from the csv file',
            tags: ['api', 'import', 'csv', 'sqlite3', 'data', 'books', 'list']
        },
        handler: controller.importBookList.bind(controller)
    },
    {
        method: 'GET',
        path: '/import/bookdetails',
        config: {
            description: 'Import book details',
            notes: 'Import book details from Google Books',
            tags: ['api', 'import', 'google', 'books','sqlite3','details']
        },
        handler: controller.importBookDetails.bind(controller)
    },
    {
        method: 'GET',
        path: "/test",
        config: {
            description: "Testing",
            notes: "Testing",
            tags: ["api", "test"]
        },
        handler: controller.getTest.bind(controller),
    }
]
