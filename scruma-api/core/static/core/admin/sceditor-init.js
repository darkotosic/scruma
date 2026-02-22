(function () {
  function initOne(el) {
    if (!el || el.dataset.sceditorInitialized === "1") return;
    el.dataset.sceditorInitialized = "1";

    // SCEditor init
    sceditor.create(el, {
      format: "xhtml",
      style: "https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css",
      toolbar:
        "bold,italic,underline|left,center,right,justify|size,color,removeformat|bulletlist,orderedlist|link,unlink|image|source",
      emoticonsEnabled: false
    });
  }

  function initAll() {
    document.querySelectorAll("textarea.js-sceditor").forEach(initOne);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
