# Graphmilker
Graphmilker is a simple app which lets you choose a specific Facebook Page, and browse the items posted on it, in order to select one of them.

## Rationale
The two bands I've made websites for see their Facebook page as their primary channel of communication with the world. Basically everything they have to say is on there. From serious and substantial updates, to random blurbs they want to throw out, and everything in between.

Their website another essential channel, which in terms of news contains the most important updates. This is basically a subset of the Facebook posts. When editing their website content, how easy whould it be if they could just select the most important Facebook posts and have them show up on the site, without having to manually copy anything?

Enter Graphmilker, which acts as a visual interface which shows a complete list of status updates from a (band's) Facebook page and lets them pick any one of them they think is of broader interest.

## Installation
Graphmiker is a standalone app, meant to integrate with a CMS. Download via NPM (`npm install graphmilker`) or Yarn (`yarn add graphmilker`), and host it somewhere alongside your CMS.

When editing a post, you can let your user spawn a Graphmilker, and have them select a post which can then be used to create a news update within the CMS.

## Example implementation
This is an example of the basic script you'll need to integrate Graphmilker.

```javascript
// Run when document ready
window.addEventListener('load', function() {

  // Set the config of the Graphmilker
  window.graphmilker.setConfig({

    // An appId is obtained from https://developers.facebook.com
    // "My Apps" (top right) → "Add a New app"
    //
    // Example given here is a test Graphmilker app, working for sites running on localhost
    // Feel free to use it while testing / developing.
    appId: '156444731650308',

    // The name of the FB page to browse. Taken from it's url; ie:
    // https://www.facebook.com/dewolfficial
    pageName: 'dewolfficial',

    // Callback to be invoked after a post has been selected
    onPostSelectedCallback: function(post) {
      showPost(post);
    }
  });

  // Convert a click on a button to a call to window.graphmilker.show();
  document
    .getElementById('startButton')
    .addEventListener('click', function(e) {
      window.graphmilker.show();
    });

  // Do something with the incoming post data.
  // Here it's just displayed in a box; typically you'd take the data and insert it into the CMS
  // database, so it will be accessible later on without any Facebook authorisation.
  function showPost(postData) {
    var selectedPostEl = document.getElementById('selectedPost');
    selectedPostEl.innerHTML = JSON.stringify(postData, true, 2);
  }
});
```

## Acknowledgements
Hat-tip to Robin Piso from [DeWolff](http://www.dewolff.nu) for inspiring this tool!

## License
MIT, see [LICENSE](./LICENSE).

## Author
Erik Hagreis