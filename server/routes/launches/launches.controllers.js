const { getAllLaunches, addNewLaunch, existLaunchWithId,
    deleteLaunchById, } = require('../../models/launches');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.launchDate || !launch.rocket || !launch.target){
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res){
    const launchId = +req.params.id;
    if (!existLaunchWithId(launchId)){
        return res.status(404).json({
            error: 'Launch not found',
        });
    } else{
        return res.status(200).json(deleteLaunchById(launchId));
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunch,
}