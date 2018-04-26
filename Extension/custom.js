/**
 * Created by Administrator on 2017/7/25.
 */
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.CustomTool =

    function (viewer, options) {
        Autodesk.Viewing.Extension.call(this, viewer, options);
        var _self = this;
        _self.tool = null;
        function AdnTool(viewer, toolName) {

            this.handleSingleClick = function (event, button) {

                const _viewer = this.viewer;
                const intersectObject = (function (){
                    const pointerVector = new THREE.Vector3();
                    const pointerDir = new THREE.Vector3();
                    const ray = new THREE.Raycaster();
                    const camera = _viewer.impl.camera;
                    return function(pointer, objects, recursive){
                        const rect = _viewer.impl.canvas.getBoundingClientRect();
                        const x = (( pointer.clientX - rect.left ) / rect.width) * 2 - 1;
                        const y = - (( pointer.clientY - rect.top ) / rect.height ) * 2 + 1;

                        if(camera.isPerspective)
                        {
                            pointerVector.set( x, y, 0.5);
                            pointerVector.unproject( camera );
                            ray.set( camera.position, pointerVector.sub( camera.position ).normalizwe());
                        }
                        else
                        {
                            pointerVector.set( x, y, -1 );
                            pointerVector.unproject( camera );
                            pointerDir.set( 0, 0, -1);
                            ray.set( pointerVector, pointerDir.transformDirection( camera.matrixWorld));
                        }
                        const  intersections = ray.intersectObjects( objects, recursive );
                        return intersections[0] ? intersections[0] : null;
                    }
                })();
                const  pointer = event.pointers ? event.pointer[0] : event;
                const  result = intersectObject( pointer, this.targets.children );

                //点击到自定义形体时改变它的颜色
                if( result && result.object )
                {
                    const  mesh = result.object;
                    var curColor = mesh.material.color;
                    curColor = ( curColor.getHex() == 0xff0000 ? 0x00ff00 : 0xff0000 );
                    mesh.material.color.setHex( curColor );
                    this.viewer.impl.invalidate( false, true, true);
                }
                return false;
            };
        };
        var toolName = "Autodesk.ADN.Viewing.Tool.CustomTool";

         _self.load = function () {

             _self.tool = new AdnTool(viewer, toolName);

             viewer.toolController.registerTool(_self.tool);

             viewer.toolController.activateTool(toolName);

             console.log('Autodesk.ADN.Viewing.Extension.CustomTool loaded');
             return true;
         };

         _self.unload = function () {

             viewer.toolController.deactivateTool(toolName);

             console.log('Autodesk.ADN.Viewing.Extension.CustomTool unloaded');
             return true;
         };
    };


Autodesk.ADN.Viewing.Extension.CustomTool.prototype = Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.CustomTool.prototype.constructor = Autodesk.ADN.Viewing.Extension.CustomTool;

Autodesk.Viewing.theExtensionManager.registerExtension('Autodesk.ADN.Viewing.Extension.CustomTool', Autodesk.ADN.Viewing.Extension.CustomTool);