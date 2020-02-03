import React from 'react';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import './ErrorLocation.css';

export default class ErrorLocation extends React.Component {
  state = {
    activeIndex: 0,
    broswerInstructions: [
      {
        name: "Chrome",
        display: "active",
        steps: [`In the right side of the address bar, select the location icon.`, `On the popup, click "manage". This will lead you to your location settings`, `In the location settings page, you should find this app under the "Block" list. To remove it from the block list, click on the trash icon.`, `Return to the Anonygram app page and refresh. After refreshing, the browser will ask if you would like to grant permission for Anonygram to access your location. Select "allow".`]
      }, 
      {
        name: "Firefox", 
        display: "hidden",
        steps: [
          `In the left side of the address bar, select the crossed-out location icon.`, `On the popout under "Permissions", "Access Your Location"'s permission will read "temporarily blocked". Click the "X" to the right of it to allow location access.`, `Refresh the page.`
        ]
      }, 
      {
        name: "Microsoft Edge",
        display: "hidden",
        steps: [
          `Navigate to your browser settings by clicking on the three dots at the top right of your browser. Select "settings" from the pop-up menu.`, `Under the "Privacy & Security" Tab, select the checkbox for "Website permissions". Ensure all other boxes are NOT selected and click "Clear".`, `Exit from the settings and refresh the page. If the same error is returned, ensure you have location turned on in your browser settings.`
        ]
      }, 
      {
        name: "Internet Explorer", 
        display: "hidden",
        steps: [
          `Refresh the page. At the bottom of your screen, there should be a pop-up that requests to track your physical location. Select any option that allows access. If nothing changes after allowing access, try refreshing the page again.`
        ]
      }
    ]
  }

  toggleActive (index) {
    // toggle display of selected item 
    let browserTemp = this.state.broswerInstructions;
    let currDisplay = browserTemp[index].display;
    let newActiveIndex;

    if (currDisplay === "hidden") {
      // if a new item is to be displayed, then hide the previously displayed one. 
      let activeIndex = this.state.activeIndex;
      if (activeIndex) {
        browserTemp[this.state.activeIndex].display = "hidden";
      }
      browserTemp[index].display = "active";
      newActiveIndex = index;
    } else {
      // if you're merely closing the display
      browserTemp[index].display = "hidden";
      newActiveIndex = null;
    }

    this.setState({
      activeIndex: newActiveIndex,
      broswerInstructions: browserTemp
    })
  }
  
  render () {
    const BI = this.state.broswerInstructions;

    return (
      <div className="ErrorLocation mainContainer">
        <h2 className="ErrorLocation">Where in the world are you?</h2>
        <div className="ErrorLocation mainContent">
          <img src={require("./nick-fewings-S7cyjr_3prc-unsplash.jpg")} alt="blue arrow pointing left"></img>
          <div className="ErrorLocation pContainer">
            <p>It looks like we don't have access to your location. Since Anonygram helps neighbors engage with their local community, this app can't do much right now.</p>
            <p>To grant us permission to your location, try refreshing the page then clicking "Allow" or "Grant Permissions" if your browser asks for your location.</p>
            <p>If that doesn't work, try the following:</p>
            {BI.map((browser, index) => {
              return (
                <div 
                  className="instructions" 
                  onClick={() => this.toggleActive(index)}
                  key={index}>
                  <div className="instructionsHeader">
                    <p className="bold">For {browser.name}</p>
                    {browser.display === "hidden" ? (
                      <ExpandMore className="expand" fontSize="large"/>
                    ) : (
                      <ExpandLess className="expand" fontSize="large"/>
                    )}
                  </div>
                  <ol className={browser.display}>
                    {browser.steps.map((step, index) => <li key={index}>{step}</li>)}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}