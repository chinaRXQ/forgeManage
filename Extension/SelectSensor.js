/**
 * Created by Administrator on 2017/7/26 0026.
 */
function SelectSensor(viewer, option) {
    Autodesk.Viewing.Extension.call(this,viewer,options);
}
SelectSensor.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
SelectSensor.prototype.constructor = SelectSensor;

//
SelectSensor.prototype.load = function () {
    var viewer = this.viewer;
    var objList = AllSenorMesh;
    var that = this;

    var tOrF = true;
    var viewSensor = document.getElementById('viewSensor');
    viewSensor.addEventListener('click', function() {
        if(tOrF)
        {
            $(viewer.container).bind("click",function (event) {

                var index = that.createRaycaster(objList,event);

                //显示点击的传感器的数据
                that.clickSensorDisplayData(index);

                //传感器详情数据
                that.sensorDetail(index);

                //TODO:return a value;
            });
            tOrF =false;
        }
        else
        {
            $(viewer.container).unbind();
            tOrF =true;
        }

    });

    return true;
};

//传感器详情
SelectSensor.prototype.sensorDetail = function(index){
    //data 来自index.html
    document.getElementById("selectContent").childNodes[index].selected = "selected";
    document.getElementById("facturers").innerHTML = data.json[index-1].Factory;
    document.getElementById("sensorID").innerHTML = data.json[index-1].SensorName;
    document.getElementById("type").innerHTML = data.json[index-1].TypeName;
    document.getElementById("value").innerHTML = data.json[index-1].Value + data.json[index-1].unit;
    document.getElementById("state").innerHTML = data.json[index-1].SensorState;
    document.getElementById("OneLevelValue").innerHTML = data.json[index-1].OneLevelValue + data.json[index-1].unit;
    document.getElementById("TwoLevelValue").innerHTML = data.json[index-1].TwoLevelValue + data.json[index-1].unit;
    document.getElementById("ThreeLeveLValue").innerHTML = data.json[index-1].ThreeLeveLValue + data.json[index-1].unit;
};

//创建射线
SelectSensor.prototype.createRaycaster = function(objList,event){
    var pointerVector = new THREE.Vector3();
    var pointerDir = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();
    var camera=viewer.getCamera();
    var rect = viewer.container.getBoundingClientRect();
    var x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
    var y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;
    pointerVector.set(x, y, -1);
    pointerVector.unproject(camera);
    pointerDir.set(0, 0, -1);
    raycaster.set(pointerVector, pointerDir.transformDirection(camera.matrixWorld));
    var intersection = raycaster.intersectObjects(objList, true);
    var index = intersection[0].object.sensorID;
    return index;
};

//显示点击的传感器的数据
SelectSensor.prototype.clickSensorDisplayData = function(value){
    var data = new DataJson();
    var dataC = data.json;
    var index = parseInt(value) - 1;
    var display = document.getElementById("DataDisplay");
    display.innerHTML ="";
    for(var key in dataC[index])
    {
        //console.log(dataC[index][key]);
        var text = document.createElement("p");
        text.innerHTML = key+":"+dataC[index][key];
        display.appendChild(text);
    }
};

SelectSensor.prototype.unload = function () {

    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('SelectSensor', SelectSensor);

