const { listQuestions } = require('../helpers/getJsonCard');
const { getCardById } = require('../db/cards');

const getMySQLCardByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const card = await getCardById(id);

        console.log(card);

        res.send({
            status: `Card with id ${id} ok`,
            data: card,
        });
    } catch(error) {
        next(error);
    }
};

//Desde questions.json

const getCardByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await listQuestions();
        const dataFound = data.easy.find(function (data) {
            return data.id == id;
        });
       
        res.json(dataFound);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getCardByIdController, getMySQLCardByIdController,
};