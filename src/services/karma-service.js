const KarmaService = {
  setKarma(karma) {
    window.localStorage.setItem('karma', karma);
  },
  
  getKarma () {
    return window.localStorage.getItem('karma');
  },

  clearKarma() {
    window.localStorage.removeItem('karma')
  },

  decrementKarma() {
    let currKarma = this.getKarma();

    if (currKarma < 1) {
      return;
    } else {
      currKarma--;
      window.localStorage.setItem('karma', currKarma);
    }
  },

}

export default KarmaService;