function ClearAllSensors(viewer, options) {
    Autodesk.Viewing.Extension.call(this,viewer,options);
}
ClearAllSensors.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ClearAllSensors.prototype.constructor = ClearAllSensors;


ClearAllSensors.prototype.load = function() {
    var viewer = this.viewer;
    var scene = viewer.impl.scene;

    var clearallsensors = document.getElementById('clearallsensors');
    clearallsensors.addEventListener('click', function() {
        for(var i = 0; i < AllSenorMesh.length; i++)
        {
            scene.remove(AllSenorMesh[i]);
            viewer.impl.invalidate(true);
        }
        AllSenorMesh = [];   //清空数组;
    }
    return true;
};



ClearAllSensors.prototype.unload = function () {
    return true;
};


Autodesk.Viewing.theExtensionManager.registerExtension('ClearAllSensors', ClearAllSensors);