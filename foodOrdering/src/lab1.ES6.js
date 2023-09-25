"use strict";
/**
 * Reflection question 1
 */

const imported = require("./inventory.js");
//console.log(imported.inventory['Sallad']);

// console.log('Object.keys():')
let names = Object.values(imported.inventory);
//names
//.sort((a, b) => a.toString().localeCompare(b, "sv", {sensitivity: 'case'}))
//.forEach(name => console.log(name.foundation));

/**
 * Reflection question 2
 */

// console.log('\n--- Assignment 1 ---------------------------------------')

// function makeOptions(p1, p2){
//     let names = Object.keys(p1)
//     .map(ing => {
//         if(p1[ing][p2]){
//             return "<option value=\"" +ing+ "\"> " + ing + ", " + p1[ing]['price'] +" kr" +" </option>";
//         }  })
//     .filter(Boolean)
//     return names.join("\n");
// }

// console.log(makeOptions(imported.inventory, 'foundation'));

// console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  static instanceCounter = 0;
  constructor() {
    this.uuid = "salad_" + Salad.instanceCounter++;
    this.mySalad = {};
  }

  add(name, properties) {
    this.mySalad[name] = properties;
    return this;
  }

  setUuid(uuid) {
    this.uuid = uuid;
  }

  remove(name) {
    delete this.mySalad[name];
    return this;
  }
}
export default Salad;

// let myCaesarSalad = new Salad()
// .add('Sallad', imported.inventory['Sallad'])
// .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
// .add('Bacon', imported.inventory['Bacon'])
// .add('Krutonger', imported.inventory['Krutonger'])
// .add('Parmesan', imported.inventory['Parmesan'])
// .add('Ceasardressing', imported.inventory['Ceasardressing'])
// .add('Gurka', imported.inventory['Gurka'])
// console.log(JSON.stringify(myCaesarSalad) + '\n');
// myCaesarSalad.remove('Gurka');
// console.log(JSON.stringify(myCaesarSalad) + '\n');

// console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function () {
  return Object.keys(this.mySalad).reduce((total, item) => {
    item = this.mySalad[item];
    return total + item.price;
  }, 0);
};

Salad.prototype.count = function (property) {
  return Object.keys(this.mySalad).filter(
    (item) => imported.inventory[item][property] === true
  ).length;
  // .reduce((total, item) => {return total + 1}, 0)
};

// console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// //En ceasarsallad kostar 45kr
// console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// //En ceasarsallad har 3 tillbehör

// reflection question 3
// console.log("--------------------------------------------------------------")
//  console.log('typeof Salad: ' + typeof Salad);
// console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
// console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
// console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
// console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
// console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
// console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

// console.log('\n--- Assignment 4 ---------------------------------------')

class GourmetSalad extends Salad {
  constructor() {
    super();
  }

  add(name, property, size = 1) {
    let newProperty = {
      ...property,
      size: size + (this.mySalad[name]?.size ?? 0), //+ this.mySalad[name].size : size
    };

    super.add(name, newProperty);

    return this;
  }
  getPrice = function () {
    return Object.keys(this.mySalad).reduce((total, item) => {
      item = this.mySalad[item];
      return total + item.size * item.price;
    }, 0);
  };
}

// let myGourmetSalad = new GourmetSalad()
// .add('Sallad', imported.inventory['Sallad'], 0.5)
// .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
// .add('Bacon', imported.inventory['Bacon'], 0.5)
// .add('Krutonger', imported.inventory['Krutonger'])
// .add('Parmesan', imported.inventory['Parmesan'], 2)
// .add('Ceasardressing', imported.inventory['Ceasardressing']);
// console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
// myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
// console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

// console.log('\n--- Assignment 5 ---------------------------------------')
// console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
// let myGourmetSalad2 = new GourmetSalad()

// console.log('Min gourmetsallad har uuid: ' +myGourmetSalad2.uuid)

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
