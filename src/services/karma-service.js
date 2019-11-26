let _timeout_Id;
const _TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

const KarmaService = {
  setNewKarma() {
    window.localStorage.setItem('karma', 50);
    this.queueRefreshKarma();
  },
  
  getKarma () {
    return window.localStorage.getItem('karma');
  },

  decrementKarma() {
    let currKarma = this.getKarma();
    console.log(currKarma)

    if (currKarma === 0) {
      return;
    } else {
      currKarma--;
      window.localStorage.setItem('karma', currKarma);
    }
  },

  queueRefreshKarma() {
    _timeout_Id = setTimeout(this.refreshKarma, _TWO_HOURS_IN_MS)
  }, 

  refreshKarma() {
    clearTimeout(_timeout_Id)
    this.setNewKarma();
  }
}

export default KarmaService;