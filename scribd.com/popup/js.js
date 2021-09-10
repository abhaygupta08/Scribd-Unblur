let revealButton = document.getElementById("revealButton");
let stopButton = document.getElementById("stopButton");
stopButton.style.opacity = 0.5;

let linkTwitter = document.getElementById("link-twitter");
let linkLinkedin = document.getElementById("link-linkedin");
let linkGithub = document.getElementById("link-github");
const openLink = url => {
  let tabParams = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(tabParams, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { content: 'openurl', url: url });
  });

}

linkTwitter.addEventListener('click', () => {
  openLink('https://twitter.com/abhay_gupta08')
});
linkLinkedin.addEventListener('click',() => {
   openLink('https://www.linkedin.com/in/abhaygupta08/')
  });
linkGithub.addEventListener('click',() => {
   openLink('https://github.com/abhaygupta08')
  });



const revealPage = () => {
  revealButton.style.opacity = 0.5;
  stopButton.style.opacity = 1;

  let tabParams = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(tabParams, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { content: 'clean' });
  });

};

const stopPage = () => {
  revealButton.style.opacity = 1;
  stopButton.style.opacity = 0.5;


  let tabParams = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(tabParams, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { content: 'stop' });
  });

};

if (revealButton) revealButton.onclick = revealPage;
if(stopButton) stopButton.onclick = stopPage;

// every 2 seconds