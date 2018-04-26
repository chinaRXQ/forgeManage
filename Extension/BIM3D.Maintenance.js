var _maintenanceItem = null;
function initMaintenanceScene() {
    if (_maintenanceItem) {
        _maintenanceItem.toolbar.setVisible(true);
    }
    else {
        var tbMaintenanceDeclare = new Autodesk.Viewing.UI.Button('tbMaintenanceDeclare');
        tbMaintenanceDeclare.onClick = function (e) {
            alert("病害录入");
        };
        tbMaintenanceDeclare.addClass('fa');
        tbMaintenanceDeclare.addClass('fa-calendar-plus-o');
        tbMaintenanceDeclare.addClass('fa-2x');
        tbMaintenanceDeclare.setToolTip('病害录入');

        var tbMaintenanceCheck = new Autodesk.Viewing.UI.Button('tbMaintenanceCheck');
        tbMaintenanceCheck.onClick = function (e) {
            alert("病害审核");
        };
        tbMaintenanceCheck.addClass('fa');
        tbMaintenanceCheck.addClass('fa-calendar-check-o');
        tbMaintenanceCheck.addClass('fa-2x');
        tbMaintenanceCheck.setToolTip('病害审核');

        var tbMaintenanceSendBill = new Autodesk.Viewing.UI.Button('tbMaintenanceSendBill');
        tbMaintenanceSendBill.onClick = function (e) {
            alert("维修单下发");
        };
        tbMaintenanceSendBill.addClass('fa');
        tbMaintenanceSendBill.addClass('fa-send-o');
        tbMaintenanceSendBill.addClass('fa-2x');
        tbMaintenanceSendBill.setToolTip('维修单下发');

        var tbMaintenanceQuery = new Autodesk.Viewing.UI.Button('tbMaintenanceQuery');
        tbMaintenanceQuery.onClick = function (e) {
            alert("综合查询");
        };
        tbMaintenanceQuery.addClass('fa');
        tbMaintenanceQuery.addClass('fa-pie-chart');
        tbMaintenanceQuery.addClass('fa-2x');
        tbMaintenanceQuery.setToolTip('综合查询');

        var subToolbar = new Autodesk.Viewing.UI.ControlGroup('view-toolbar-Maintenance');
        subToolbar.addControl(tbMaintenanceDeclare);
        subToolbar.addControl(tbMaintenanceCheck);
        subToolbar.addControl(tbMaintenanceSendBill);
        subToolbar.addControl(tbMaintenanceQuery);

        viewer.getToolbar().addControl(subToolbar);

        _maintenanceItem = {
            toolbar: subToolbar
        };
    }
}

function uninitMaintenanceScene() {
    if (_maintenanceItem) {
        _maintenanceItem.toolbar.setVisible(false);
    }
}