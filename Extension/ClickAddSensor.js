/**
 * Created by Administrator on 2017/7/21.
 */
function ClickAddSensor(viewer, options) {
    this.Object = [];
    this.jsonArr = [];
    this.json={sensorId:null,sensorType:null,sensorName:null,sensorPosition:{x:null,y:null,z:null}};
    Autodesk.Viewing.Extension.call(this,viewer,options);
}

ClickAddSensor.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ClickAddSensor.prototype.constructor = ClickAddSensor;

ClickAddSensor.prototype.load = function () {

    var viewer = this.viewer;
    var that = this;
    var scene = viewer.impl.scene;

    var sensorId = document.getElementById("sensorId");
    var sensorType = document.getElementById("sensorType");
    var sensorName = document.getElementById("sensorName");

    addIcon("viewSensor","binoculars");
    addIcon("clearSensor","trash-o");
    addIcon("clearClick","microchip");
    addIcon("clearSensorColor","bell");

    var tOrF = true;

    //点击模型添加传感器
    $("#clearClick").bind("click", function (event) {
        if(tOrF)
        {

            $(viewer.container).bind("click", function (event) {
                var hitTest = new HIT(viewer);
                var result = hitTest.getHitTest(event);
                var sensor = new Sensor('001',result.point, "2", scene, viewer);
                that.createSensor(that,viewer,hitTest,sensor,scene,event);
                that.setSensor();
            });
            tOrF = false;
        }
        else
        {

            $(viewer.container).unbind();
            tOrF = true;
            // document.getElementById("panel").style.height = "410px";
            that.setSensor(tOrF);
        }
    });

    //清除所有传感器
    $("#clearSensor").bind("click", function (event) {
        for(var i = 0; i < that.Object.length; i++)
        {
            scene.remove(that.Object[i]);
            viewer.impl.invalidate(true);
        }
        that.Object = [];   //清空数组;
    });

    //清除所有传感器颜色
    $("#clearSensorColor").bind("click", function (event) {
        for(var i = 0; i < that.Object.length; i++)
        {
            //that.Object[i].material.color = 0xEA2000;
            that.Object[i].material.color = new THREE.Color(0x88DD4B);
            viewer.impl.invalidate(true);
        }
    });

    //提交并保存设置传感器内容
    $("#submit").bind("click", function (event) {
        that.setSensorContent(that);
    });

    //替换工具栏的图标
    function addIcon(id,name)
    {
        var text = document.getElementById(id);
        text.style.position = "relative";
        var i = document.createElement("i");
        i.style.fontSize = "24px";
        i.style.position = "absolute";
        i.style.left = "8px";
        i.style.top = "8px";
        i.className = "fa fa-"+name+" fa-2x";
        text.appendChild(i);
    }

    return true;
};

//提交并保存设置传感器内容
ClickAddSensor.prototype.setSensorContent = function(that){
    var sensorId = document.getElementById("sensorId");

    var sensorType = document.getElementById("sensorType");

    var sensorName = document.getElementById("sensorName");

    if(sensorId.value != null && sensorId.value != undefined)
    {
        that.json.sensorId = sensorId.value;
    }
    if(sensorType.value != null && sensorType.value != undefined)
    {
        that.json.sensorType = sensorType.value;
    }
    if(sensorName.value != null && sensorName.value != undefined)
    {
        that.json.sensorName = sensorName.value;
    }
    console.log(that.json);
    that.jsonArr.push(that.json);
    sensorId.value="";
    sensorType.value="";
    sensorName.value="";
};

//在场景中创建传感器
ClickAddSensor.prototype.createSensor = function(that,viewer,hitTest,sensor,scene,event){
    var setSensor = document.getElementById("setSensor");
    setSensor.style.display ="block";
    that.json={sensorId:null,sensorType:null,sensorName:null,sensorPosition:{x:null,y:null,z:null},cameraPosition:{x:null,y:null,z:null},cameraTarget:{x:null,y:null,z:null},cameraUp:{x:null,y:null,z:null},cameraRotation:{x:null,y:null,z:null}};
    var hitTest = hitTest;
    that.sensor = sensor;//添加类型为1的传感器;
    that.sensor.generateSensorInModel();
    that.sensor.setSensorColor();
    //viewer.impl.invalidate(true);//刷新场景;
    that.Object.push(that.sensor.mesh);
    console.log(that.Object);

    //保存当前相机的信息
    that.json.sensorPosition.x = that.sensor.mesh.position.x;
    that.json.sensorPosition.y = that.sensor.mesh.position.y;
    that.json.sensorPosition.z = that.sensor.mesh.position.z;

    that.json.cameraPosition.x = viewer.impl.camera.position.x;
    that.json.cameraPosition.y = viewer.impl.camera.position.y;
    that.json.cameraPosition.z = viewer.impl.camera.position.z;

    that.json.cameraTarget.x = viewer.impl.camera.target.x;
    that.json.cameraTarget.y = viewer.impl.camera.target.y;
    that.json.cameraTarget.z = viewer.impl.camera.target.z;

    that.json.cameraUp.x = viewer.impl.camera.up.x;
    that.json.cameraUp.y = viewer.impl.camera.up.y;
    that.json.cameraUp.z = viewer.impl.camera.up.z;

    console.log(that.json);

    //document.getElementById("panel").style.height = "570px";
}

//设置传感器位置
ClickAddSensor.prototype.setSensor = function(e)
{
    var setSensor = document.getElementById("setSensor");
    if(!e)
    {
        setSensor.style.display = "block";
    }
    else
    {
        setSensor.style.display = "none";
    }

}

ClickAddSensor.prototype.unload = function () {
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('ClickAddSensor', ClickAddSensor);
