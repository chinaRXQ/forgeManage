/**
 * Created by Administrator on 2016/9/22.
 */
function Selected(scene,camera,BDItems,BDJSON){
	
    this.BDJSON = BDJSON;
    this.BDItems = BDItems;
    this.scene = scene;
    this.camera = camera;
    //this.renderer = that.renderer;
    this.frustumSize = 1000;

    this.mouse = new THREE.Vector2();
    this.INTERSECTED;

    this.raycaster = new THREE.Raycaster();

    this._addOnEventHandle( 'resize', this, window, this.onWindowResize);
    this._addOnEventHandle( 'mousemove', this, document, this.onDocumentMouseMove);
    this._addOnEventHandle( 'mousedown', this, document, this.onDocumentMouseDown);
    this._addOnEventHandle( 'touchstart', this, document, this.onDocumentTouchStart);

    return this;

    //window.addEventListener( 'resize', this.onWindowResize, false );
    //document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    //document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
    //document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );

}

Selected.prototype = {

    _addOnEventHandle : function(eventName, self, sender, callBack)//param
    {
        var eventCallBack = callBack;
        //********************************************************
        eventCallBack = function(event)
        {
            callBack(event,self);//callBack(self, sender, event, param);
        }
        //********************************************************
        if(sender.addEventListener)
        {
            sender.addEventListener(eventName, eventCallBack);
        }
        else
        {
            throw "your browse not support this library";
        }
    },

    onWindowResize: function(self){

        var aspect = window.innerWidth / window.innerHeight;

        self.camera.left   = - self.frustumSize * aspect / 2;
        self.camera.right  =   self.frustumSize * aspect / 2;
        self.camera.top    =   self.frustumSize / 2;
        self.camera.bottom = - self.frustumSize / 2;

        self.camera.updateProjectionMatrix();

        self.renderer.setSize( window.innerWidth, window.innerHeight );

    },

    onDocumentMouseMove: function(event,self){

        event.preventDefault();

        self.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        self.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    },

    onDocumentMouseDown: function(event,self){

        event.preventDefault();

        self.mouse.x = ( event.clientX / self.renderer.domElement.clientWidth ) * 2 - 1;
        self.mouse.y = - ( event.clientY / self.renderer.domElement.clientHeight ) * 2 + 1;

        self.raycaster.setFromCamera( self.mouse, self.camera );

        var intersects = self.raycaster.intersectObjects( self.scene.children );

        if ( intersects.length > 0 ) {
            if( intersects[0].object.scale.x > 1.2)
                self.scene.remove( intersects[0].object );
            //sphere.hideSphere(scene, intersects[0].object);

        }

    },

    onDocumentTouchStart: function(event,self){

        event.preventDefault();

        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        self.onDocumentMouseDown( event );

    },

        raycasterInfo: function(){

        this.raycaster.setFromCamera( this.mouse, this.camera );

        var intersects = this.raycaster.intersectObjects( this.BDItems );

        if ( intersects.length > 0 ) {

            if ( this.INTERSECTED != intersects[ 0 ].object ) {

                alert(1);

            }

        } else {

            if ( this.INTERSECTED ){

					//document.body.removeChild( this.output );

            }

            this.INTERSECTED = null;

        }
        this.raycasterRenderer();
    },

    raycasterRenderer: function(){

        this.raycasterInfo();

    }

}

