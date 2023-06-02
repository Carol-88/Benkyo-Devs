 const fs = require('fs/promises');
 

const getJsonCard = async () => {
    const tasks = await fs.readFile('./questions.json', 'utf8');
    const data = JSON.parse(tasks);
    return data;
};


module.exports = {
    getJsonCard,
}
