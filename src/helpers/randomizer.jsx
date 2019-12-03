const randomizer = {

  // const adjectiveOptions = [
  //   'Auspicious', 
  //   'Bodacious', 
  //   'Cozy', 
  //   'Diligent', 
  //   'Educated', 
  //   'Flamboyant', 
  //   'Giddy', 
  //   'Heroic', 
  //   'Impeccable', 
  //   'Jocose',
  //   'Kooky',
  //   'Legendary',
  //   'Magnanimous',
  //   'Nimble',
  //   'Olympic',
  //   'Perceptive',
  //   'Quotable',
  //   'Reputable',
  //   'Sanguine',
  //   'Tubular',
  //   'Unequivocal',
  //   'Volant',
  //   'Warmhearted',
  //   'Xenial', 
  //   'YaDig',
  //   'Zazzy'
  // ];
  // const nounOptions = [
  //   'Axolotl', 'Bear', 'Cat', 'Dog', 'Emu', 'Flamingo', 'Gerbil', 'HermitCrab', 'Iguana', 'Jellyfish', 'KomodoDragon', 'Liger', 'Manatee', 'Newt', 'Opposum', 'Panther', 'Quokka', 'Rat', 'Seal', 'Turkey', 'Vulture', 'WaterBuffalo', 'XrayTetra', 'Zebu'
  // ];
  fullUsernameOptions: [
    'AuspiciousAxolotl', 
    'BodaciousBear', 
    'CozyCat', 
    'DiligentDog', 
    'EducatedEmu', 
    'FlamboyantFlamingo', 
    'GiddyGerbil', 
    'HeroicHermitCrab', 
    'ImpeccableIguana', 
    'JocoseJellyfish',
    'KookyKomodoDragon',
    'LegendaryLiger',
    'MagnanimousManatee',
    'NimbleNewt',
    'OlympicOpossum',
    'PerceptivePanther',
    'QuotableQuokka',
    'ReputableRat',
    'SanguineSeal',
    'TubularTurkey',
    'UnequivocalUguisu',
    'VolantVulture',
    'WarmheartedWaterBuffalo',
    'XenialXRayTetra', 
    'YaDigYak',
    'ZazzyZebu'
  ],

  generateRandomUsername(userIndex) {

    //use the below if you want the name randomly generated... needs work
    //   const adjIndex = Math.floor(Math.random() * randomizer.adjectiveOptions.length);
    //   const nounIndex = Math.floor(Math.random() * randomizer.nounOptions.length);
    //   const username = randomizer.adjectiveOptions[adjIndex] + randomizer.nounOptions[nounIndex];
    //   return username;

    const currArrLength = this.fullUsernameOptions.length;
    
    //If userIndex is greater than our array length, loop back through the array and add a number (so that it's AwesomeAadvark, then on second loop AwesomeAadvark2, on third AwesomeAadvark3, etc. )
    if (userIndex > currArrLength -1) {
      const numOfTimesLoopedThru = Math.floor(userIndex/currArrLength);
      const index = userIndex - ((numOfTimesLoopedThru) * (currArrLength - 1));
      return `${this.fullUsernameOptions[index]}${numOfTimesLoopedThru + 1}` 
    }
    return this.fullUsernameOptions[userIndex]
  },

  getRandomUsernames(usernames) {
    //Make an array with only userIds (no duplicates)
    const userIds = [];
    usernames.map(username => {
      const currUserId = username.userId;
      if (!userIds.includes(currUserId)) {
        userIds.push(currUserId)
      }
    })
    console.log(userIds)

    //Make an object; assign usernames (value) for each userId (key) in array
    const newUsernames = {};
    userIds.map((userId, index) => {
      newUsernames[userId] = this.generateRandomUsername(index);
    })

    //Return object of userIds and usernames
    return newUsernames;
  }

  // getRandomUsername(userId, usernames, incrementor) {
  //   //basic implementation: basic sort and find 
  //   //if the id exists in the state, use its username
  //   let username;
  //   console.log('objectkeys in randomizer:', Object.keys(usernames))
  //   if (Object.keys(usernames).includes(userId)) {
  //     console.log ('in if loop')
  //     username = usernames.userId;
  //     return { username };
  //   }
  //   //else make a new one and set the state
  //   else {
  //     const { newIncrementor, username } = this.generateRandomUsername(incrementor);
  
  //     console.log ('in else loop', {username}, {newIncrementor})
  //     return ({
  //       username,
  //       newIncrementor,
  //     });
  //   }
  // }
};

export default randomizer;