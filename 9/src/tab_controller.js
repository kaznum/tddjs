(function () {
  var dom = tddjs.dom;

  // create することで、画面内に複数のタブ群が存在しても管理できる。
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


(function() {
  function getPanel(element) {
    if (!element|| typeof element.href != "string") {
      return null;
    }

    // URLを#形式にして画面遷移を行わない場合、ブラウザのアドレス部が変更されるが、
    // 画面遷移は行われない。（ブラウザヒストリが残り戻るボタンが有効になるが、
    // 戻るボタンを押しても、画面の切り替えは行われない
    var target = element.href.replace(/.*#/, "");
    var panel = document.getElementsByName(target)[0];
    while (panel && panel.tagName.toLowerCase() != "div") {
      panel = panel.parentNode;
    }

    return panel;
  }

  if (typeof document == "undefined" || !document.getElementById) {
    return;
  }

  var dom = tddjs.dom;
  var ol = document.getElementById("news-tabs");

  try {
    var controller = tddjs.ui.tabController.create(ol);
    dom.addClassName(ol.parentNode, "js-tabs");

    controller.onTabChange = function (curr, prev) {
      dom.removeClassName(getPanel(prev), "active-panel");
      dom.addClassName(getPanel(curr), "active-panel");
    };

    controller.activateTab(ol.getElementsByTagName("a")[0]);
  } catch (e) {}
}());
