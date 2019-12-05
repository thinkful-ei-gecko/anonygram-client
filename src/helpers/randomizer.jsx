const randomizer = {

  adjectiveOptions: [
    'Auspicious', 
    'Bodacious', 
    'Cozy', 
    'Diligent', 
    'Educated', 
    'Flamboyant', 
    'Giddy', 
    'Heroic', 
    'Impeccable', 
    'Jocose',
    'Kooky',
    'Legendary',
    'Magnanimous',
    'Nimble',
    'Olympic',
    'Perceptive',
    'Quotable',
    'Reputable',
    'Sanguine',
    'Tubular',
    'Unequivocal',
    'Volant',
    'Warmhearted',
    'Xenial', 
    'YaDig',
    'Zazzy'
  ],
  nounOptions: [
    'Axolotl', 'Bear', 'Cat', 'Dog', 'Emu', 'Flamingo', 'Gerbil', 'HermitCrab', 'Iguana', 'Jellyfish', 'KomodoDragon', 'Liger', 'Manatee', 'Newt', 'Opposum', 'Panther', 'Quokka', 'Rat', 'Seal', 'Turkey', 'Vulture', 'WaterBuffalo', 'XrayTetra', 'Zebu'
  ],

  generateRandomUsername() {
    // use the below if you want the name randomly generated... needs work
    const adjIndex = Math.floor(Math.random() * this.adjectiveOptions.length);
    const nounIndex = Math.floor(Math.random() * this.nounOptions.length);
    const username = this.adjectiveOptions[adjIndex] + this.nounOptions[nounIndex];
    return username;
  },

  getAnonUsernames(arrOfComments) {
    //Make an array with only userIds (no duplicates)
    const userIds = [];
    arrOfComments.map(comment => {
      const currUserId = comment.userId;
      if (!userIds.includes(currUserId)) {
        userIds.push(currUserId)
      }
    })

    //Make an object; assign usernames (value) for each userId (key) in array
    const newUsernames = {};
    userIds.map((userId, index) => {
      // newUsernames[userId] = this.generateAnonUsername(index);
      newUsernames[userId] = this.generateRandomUsername(index);
    })

    //Return object of userIds and usernames
    return newUsernames;
  },
};

export default randomizer;