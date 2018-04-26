function AddIcon(viewer, options){
    Autodesk.Viewing.Extension.call(this,viewer,options);
    var _viewer = viewer;
    this.hitTest = function (event) {
        // get current screen point
        var screenPoint = {
            x: event.clientX,
            y: event.clientY
        };
        // hit test
        var hitTest = _viewer.impl.hitTest(screenPoint.x,screenPoint.y,true);
        // draw the temporary triangle face

        if(hitTest){
            var sel = hitTest.model.selector.getSelection();
            var ins = hitTest.model.selector.getInstanceTree();
            var camera = _viewer.impl.camera;
            var face = hitTest.face;
            var scene = _viewer.impl.scene;
            var point = hitTest.intersectPoint;
            var pointString = JSON.stringify(point);
            console.log('point');
            console.log(pointString);
            //加小球
            /*var geometry1 = new THREE.SphereGeometry(10);
            var material1 = new THREE.MeshBasicMaterial({
                color: 0x5182BB
            });
            var mesh1 = new THREE.Mesh(geometry1, material1);
            mesh1.position.x = point.x;
            mesh1.position.y = point.y;
            mesh1.position.z = point.z;*/
            //scene.add(mesh1);

            var loader = new THREE.TextureLoader();

            // load a resource
            loader.load(
                // resource URL
                'images/sprite2.png',
                // Function when resource is loaded
                function ( texture ) {
                    // do something with the texture
                    var geo = new THREE.CircleGeometry(10,32);
                    var geometry1 = new THREE.SphereGeometry(100);
                    var material1 = new THREE.MeshBasicMaterial({
                        color: 0x8A2BE2,
                        map : texture
                    });
                    var mesh1 = new THREE.Mesh(geo, material1);
                    mesh1.position.x = point.x;
                    mesh1.position.y = point.y;
                    mesh1.position.z = point.z;
                    mesh1.lookAt(camera.position);
                    scene.add(mesh1);
                    _viewer.impl.invalidate(true);
                     /*var spriteMaterial = new THREE.SpriteMaterial({map : texture});
                     var sprite = new THREE.Sprite(spriteMaterial);
                    sprite.position.set(point.x , point.y, point.z);
                    sprite.scale.set(1280, 1280, 1);
                     scene.add(sprite);
                     _viewer.impl.invalidate(true, true, true);*/
                },
                // Function called when download progresses
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                // Function called when download errors
                function ( xhr ) {
                    console.log( 'An error happened' );
                }
            );


        }

    }


}
AddIcon.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
AddIcon.prototype.constructor = AddIcon;
AddIcon.prototype.load = function () {
    var viewer = this.viewer;
    $(viewer.container).bind('click', this.hitTest);
    return true;
};
AddIcon.prototype.unload = function () {
    console.log('unload');
    return true;
};
Autodesk.Viewing.theExtensionManager.registerExtension('AddIcon', AddIcon);
