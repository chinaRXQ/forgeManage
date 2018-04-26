var _techDocumentItem = null;
function initTechDocumentScene() {
    if (_techDocumentItem) {
        _techDocumentItem.toolbar.setVisible(true);
    }
    else {
        var tbTechDocumentSearch = new Autodesk.Viewing.UI.Button('tbTechDocumentSearch');
        tbTechDocumentSearch.onClick = function (e) {
            alert("资料检索");
        };
        tbTechDocumentSearch.addClass('fa');
        tbTechDocumentSearch.addClass('fa-search');
        tbTechDocumentSearch.addClass('fa-2x');
        tbTechDocumentSearch.setToolTip('资料检索');

        var subToolbar = new Autodesk.Viewing.UI.ControlGroup('view-toolbar-TechDocument');
        subToolbar.addControl(tbTechDocumentSearch);

        viewer.getToolbar().addControl(subToolbar);

        _techDocumentItem = {
            toolbar: subToolbar
        };
    }
}

function uninitTechDocumentScene() {
    if (_techDocumentItem) {
        _techDocumentItem.toolbar.setVisible(false);
    }
}