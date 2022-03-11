const express = require('express');
const launchesRouter = express.Router();
const { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch } = require('./launches.controllers');

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpDeleteLaunch);

module.exports = launchesRouter;