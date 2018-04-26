var _decisionItem = null;
function initDecisionScene() {
    if (_decisionItem) {
        _decisionItem.toolbar.setVisible(true);
    }
    else {
        var tbDecisionQuery = new Autodesk.Viewing.UI.Button('tbDecisionQuery');
        tbDecisionQuery.onClick = function (e) {
            alert("查询分析");
        };
        tbDecisionQuery.addClass('fa');
        tbDecisionQuery.addClass('fa-area-chart');
        tbDecisionQuery.addClass('fa-2x');
        tbDecisionQuery.setToolTip('查询分析');

        var subToolbar = new Autodesk.Viewing.UI.ControlGroup('view-toolbar-Decision');
        subToolbar.addControl(tbDecisionQuery);

        viewer.getToolbar().addControl(subToolbar);

        _decisionItem = {
            toolbar: subToolbar
        };
    }
}

function uninitDecisionScene() {
    if (_decisionItem) {
        _decisionItem.toolbar.setVisible(false);
    }
}