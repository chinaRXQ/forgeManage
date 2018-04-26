var _safeMonitoringItem = null;
function initSafeMonitoringScene() {
    if (_safeMonitoringItem) {
        _safeMonitoringItem.toolbar.setVisible(true);
    }
    else {
        var tbSafeMonitoringDetail = new Autodesk.Viewing.UI.Button('tbSafeMonitoringDetail');
        tbSafeMonitoringDetail.onClick = function (e) {
            var current = document.getElementById("sensorDetail");
            var getDisplay = $("#sensorDetail").css("display");
            if(getDisplay==="none")
            {
                current.style.display = "block";
            }
            else
            {
                current.style.display = "none";
            }
        };
        tbSafeMonitoringDetail.addClass('fa');
        tbSafeMonitoringDetail.addClass('fa-window-restore');
        tbSafeMonitoringDetail.addClass('fa-2x');
        tbSafeMonitoringDetail.setToolTip('传感器详情');

	var tbSafeMonitoringFilter = new Autodesk.Viewing.UI.Button('tbSafeMonitoringFilter');
        tbSafeMonitoringFilter.onClick = function (e) {
            var current = document.getElementById("sensorFilter");
            var getDisplay = $("#sensorFilter").css("display");
            if(getDisplay==="none")
            {
                viewer.setActiveNavigationTool("firstperson");
                current.style.display = "block";
            }
            else
            {
                viewer.setActiveNavigationTool("orbit");
                current.style.display = "none";
            }
            //alert("传感器筛选");
        };
        tbSafeMonitoringFilter.addClass('fa');
        tbSafeMonitoringFilter.addClass('fa-filter');
        tbSafeMonitoringFilter.addClass('fa-2x');
        tbSafeMonitoringFilter.setToolTip('传感器筛选');

	var tbSafeMonitoringHistory = new Autodesk.Viewing.UI.Button('tbSafeMonitoringHistory');
        tbSafeMonitoringHistory.onClick = function (e) {
            var current = document.getElementById("sensorHistoryData");
            var getDisplay = $("#sensorHistoryData").css("display");
            if(getDisplay==="none")
            {
                current.style.display = "block";
            }
            else
            {
                current.style.display = "none";
            }
        };
        tbSafeMonitoringHistory.addClass('fa');
        tbSafeMonitoringHistory.addClass('fa-line-chart');
        tbSafeMonitoringHistory.addClass('fa-2x');
        tbSafeMonitoringHistory.setToolTip('历史数据');

	var tbSafeMonitoringAnalysis = new Autodesk.Viewing.UI.Button('tbSafeMonitoringAnalysis');
        tbSafeMonitoringAnalysis.onClick = function (e) {
            var current = document.getElementById("sensorsAnalysis");
            var getDisplay = $("#sensorsAnalysis").css("display");
            if(getDisplay==="none")
            {
                current.style.display = "block";
            }
            else
            {
                current.style.display = "none";
            }
        };
        tbSafeMonitoringAnalysis.addClass('fa');
        tbSafeMonitoringAnalysis.addClass('fa-bar-chart');
        tbSafeMonitoringAnalysis.addClass('fa-2x');
        tbSafeMonitoringAnalysis.setToolTip('多传感器分析');

    var tbSafeMonitoringMoreDetail = new Autodesk.Viewing.UI.Button('tbSafeMonitoringMoreDetail');
        tbSafeMonitoringMoreDetail.onClick = function (e) {
            var current = document.getElementById("moreSensorDetailPlane");
            var getDisplay = $("#moreSensorDetailPlane").css("display");
            if(getDisplay==="none")
            {
                current.style.display = "block";
            }
            else
            {
                current.style.display = "none";
            }
        };
        tbSafeMonitoringMoreDetail.addClass('fa');
        tbSafeMonitoringMoreDetail.addClass('fa-eye');
        tbSafeMonitoringMoreDetail.addClass('fa-2x');
        tbSafeMonitoringMoreDetail.setToolTip('多传感器详情');

        var subToolbar = new Autodesk.Viewing.UI.ControlGroup('view-toolbar-SafeMonitoring');
        subToolbar.addControl(tbSafeMonitoringFilter);
        subToolbar.addControl(tbSafeMonitoringDetail);
        subToolbar.addControl(tbSafeMonitoringHistory);
        subToolbar.addControl(tbSafeMonitoringAnalysis);
        subToolbar.addControl(tbSafeMonitoringMoreDetail);

        viewer.getToolbar().addControl(subToolbar);
        _safeMonitoringItem = {
            toolbar: subToolbar
        };
    }
}

function uninitSafeMonitoringScene() {
    if (_safeMonitoringItem) {
        _safeMonitoringItem.toolbar.setVisible(false);
    }
}