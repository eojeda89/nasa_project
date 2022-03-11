const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanet = [];

function ishabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream('./server/data/kepler_data.csv')
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (ishabitablePlanet(data)) {
                    habitablePlanet.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanet.length} habitable planets found!`);
                console.log('DONE!!!')
                resolve();
            });
    });
}

function getHabitablePlanets(){
    return habitablePlanet;
}


module.exports = {
    loadPlanetsData,
    getHabitablePlanets,
};