const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const workingDays = days.slice(0, 5);

console.log(days);
console.log(workingDays);
console.log(workingDays[2]);

const beer = {
  name: 'brewdog',
  unit: 10
};

/**
 * Decrement the given beer units by the given number
 *
 * @param {Object} beer
 * @param {Number} unit
 *
 * @return {String}
 */
const drink = (beer, unit) => {
  beer.unit -= unit
  return `${beer.name} - ${unit} bues`;
};

console.log(drink(beer, 4));
console.log(beer);

/**
 * Call the given function with the remaining arguments
 *
 * @param {Function} funct
 * @param {Array} theArgs
 *
 * @return {String}
 */
const doMove = (funct, ...theArgs) => {
  console.log(Date.now())
  return `${new Date()} - ${funct(...theArgs)}`
}

console.log(doMove(drink, beer, 2));
