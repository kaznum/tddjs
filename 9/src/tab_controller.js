(function () {
  var dom = tddjs.dom;

  function create(element) {
    if (!element || typeof element.className != "string") {
      throw new TypeError("element is not an element");
    }

    dom.addClassName(element, "js-tab-controller");
    var tabs = Object.create(this);

    // this callback definition is not tested
    element.onclick = function (event) {
      tabs.handleTabClick(event || window.event || {});
    };

    element = null;

    return tabs;
  }

  function handleTabClick(event) {
    var target = event.target || event.srcElement;

    // nodeType == 1 :(Element)
    while (target && target.nodeType != 1) {
      target = target.parentNode;
    }

    this.activateTab(target);
  }

  function activateTab(element) {
    if (!element || !element.tagName ||
        element.tagName.toLowerCase() != this.tabTagName) {
      return;
    }
    var className = "active-tab";
    dom.removeClassName(this.prevTab, className);
    dom.addClassName(element, className);
    var previous = this.prevTab;
    this.prevTab = element;

    this.onTabChange(element, previous);
  }

  tddjs.namespace("ui").tabController = {
    create: create,
    handleTabClick: handleTabClick,
    activateTab: activateTab,
    onTabChange: function(curr, prev) {},
    tabTagName: "a"
  };
}());
