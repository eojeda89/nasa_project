const {getHabitablePlanets} = require('../../models/planets');
function httpGetAllPlanets(req, res) {
    return res.status(200).json(getHabitablePlanets());
}

module.exports = {
    httpGetAllPlanets,
}