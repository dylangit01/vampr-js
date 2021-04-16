class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamp = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVamp++;
    }
    return numberOfVamp;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire, meaning less num from original)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    let thisVampire = this;
    let currVampire = vampire;
    while (thisVampire) {
      while (currVampire) {
        if (thisVampire === currVampire) {
          return thisVampire
        };
        currVampire = currVampire.creator;
      }
      currVampire = vampire;
      thisVampire = thisVampire.creator;
    }
    return null;
  }
}
module.exports = Vampire;




// recursive way:
  // directAncestor(vampire) {
  //   if (this.offspring.includes(vampire)) {
  //     return true;
  //   } else {
  //     for (let vamp of this.offspring) {
  //       if (vamp.directAncestor(vampire)) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

//   closestCommonAncestor(vampire) {
//     if (this === vampire) {
//       return this;
//     }
//     let older;
//     let younger;
//     if (this.isMoreSeniorThan(vampire)) {
//       older = this;
//       younger = vampire;
//     } else {
//       older = vampire;
//       younger = this;
//     }
//     if (older.directAncestor(younger)) {
//       return older;
//     } else {
//       return older.creator.closestCommonAncestor(younger);
//     }
//   }