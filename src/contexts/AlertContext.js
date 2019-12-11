// Can be deleted - alert context was added to the image context since the alerts are pretty closely tied to the images
// verify deleting does not break anything and clean up any unused imports

import React from 'react';

export default React.createContext({
  alert: '',
  setAlert: () => {},
});

const deleteMe = true;