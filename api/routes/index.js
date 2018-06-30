//routes/index.js

const main = require('./main');
const course = require('./course');

module.exports = [].concat(
    main,
    course
);
