/**
 * 添加新的UI按钮到底下的面板
 * Created by Administrator on 2017/7/26 0026.
 */
function UIToolBar(viewer, options) {
    Autodesk.Viewing.Extension.call(this,viewer,options);
}
UIToolBar.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
UIToolBar.prototype.constructor = UIToolBar;


UIToolBar.prototype.load = function() {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    return true;
};

UIToolBar.prototype.onToolbarCreated = function() {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

UIToolBar.prototype.unload = function () {
    return true;
};


UIToolBar.prototype.createUI = function() {
    // alert('TODO: Create Toolbar!');

    var viewer = this.viewer;

    // Button 1
    var button1 = new Autodesk.Viewing.UI.Button('viewSensor');
    button1.addClass('viewSensor');
    button1.setToolTip('查看传感器');

    // Button 2
    var button2 = new Autodesk.Viewing.UI.Button('clearSensor');
    button2.addClass('clearallsensors');
    button2.setToolTip('一键清除所有传感器');

    // Button 3
    var button3 = new Autodesk.Viewing.UI.Button('clearSensorColor');
    button3.addClass('clearSensor');
    button3.setToolTip('重置报警');

    // Button 4
    var button4 = new Autodesk.Viewing.UI.Button('clearClick');
    button4.addClass('ClickAdd');
    button4.setToolTip('添加传感器');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
    this.subToolbar.addControl(button1);
    this.subToolbar.addControl(button2);
    this.subToolbar.addControl(button3);
    this.subToolbar.addControl(button4);

    viewer.toolbar.addControl(this.subToolbar);
};

Autodesk.Viewing.theExtensionManager.registerExtension('ClearAllSensors', UIToolBar);