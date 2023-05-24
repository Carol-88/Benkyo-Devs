 const fs = require('fs/promises');
 
 const generateError = (message, status) => {
    const error = new Error(message);
    error.httpStatus = 400;
    throw error;
}

const listQuestions = async () => {
    const tasks = await fs.readFile('./questions.json', 'utf8');
    const data = JSON.parse(tasks);
    return data;
};


module.exports = {
    generateError,
    listQuestions,
}
