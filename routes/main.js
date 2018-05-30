//routes/main.js

const controller = require('../controllers/main');

module.exports = [
    {
        method: 'GET',
        path: '/booklist',
        config: {
            description: 'Show Raw Data',
            notes: 'Shows raw data imported from the csv file',
            tags: ['api','csv','data','books','list']
        },
        handler: controller.getBookList.bind(controller)
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
