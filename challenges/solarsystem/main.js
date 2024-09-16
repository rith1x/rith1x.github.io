const bgcon = document.createElement('div')
bgcon.className = "back"
const starbg = document.createElement('div')
starbg.className = "stars"
const sparbg = document.createElement('div')
sparbg.className = "twinkling"
bgcon.append(starbg, sparbg)
document.body.appendChild(bgcon)

const solarSyst = document.createElement('div');
solarSyst.classList.add('solar-syst');

const planetClasses = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'asteroids-belt'];

planetClasses.forEach(planetClass => {
    const planetElement = document.createElement('div');
    planetElement.classList.add(planetClass);
    solarSyst.appendChild(planetElement);
});

document.getElementsByClassName('solar-system-overview')[0].appendChild(solarSyst);
