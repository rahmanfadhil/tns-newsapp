var { Observable } = require("data/observable");
var utils = require("utils/utils");
var { ObservableArray } = require("data/observable-array");

class Item {
  constructor(title, content, image, url) {
    this.title = title
    this.content = content
    this.image = image
    this.url = url
  }
}

class createViewModel extends Observable {
  constructor() {
    super();
    this.items = new ObservableArray([])
  }
  
  onTap(e) {
    this.items.getItem(e.index)
    utils.openUrl(this.items.getItem(e.index).url)
  }
}

const context = new createViewModel()

exports.onNavigatingTo = function(args) {
  var page = args.object;

  page.bindingContext = context;
}

exports.loaded = function (args) {
  fetch("https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=0d1ce78f19e749b7aed2ae84978dc610").then(data => {
    return data.json()
  }).then(item => {

    item.articles.forEach(data => {
      context.items.push(new Item(data.title, data.description, data.urlToImage, data.url))
    });
  });
}