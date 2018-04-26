/**
 * Created by Administrator on 2017/7/21.
 */
function InitSensor(viewer, options) {
    this.Object = [];
    this.INTERSECTED;
    Autodesk.Viewing.Extension.call(this,viewer,options);
}

InitSensor.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
InitSensor.prototype.constructor = InitSensor;

//TODO:手动设置新类型传感器的颜色（传感器族属性）
InitSensor.prototype = {
    setSensorColor: function(data)
    {
        var color;
        if(data.TypeID==1)
        {
            color = 'yellow';
        }
        if(data.TypeID==2)
        {
            color = 0x217648;
        }
        if(data.TypeID==3)
        {
            color = 0x178FC8;
        }
        return color;
    }
};

InitSensor.prototype.load = function() {
    var viewer = this.viewer;
    var scene = viewer.impl.scene;
    var that = this;
    //ObjectGeo = this.Object;

    //TODO:从数据库中获取数据；
    //当前是从DataJson中获得的假数据;
    //var data = new DataJson();
    var select = document.getElementById("selectContent");

    this.echartForm(len,data);

    //初始化循环创建传感器
    this.initLoop(len,scene,that,select,data,viewer,ObjectGeo);

    //TODO:设置本地存储;

    //清除所有传感器
    $("#clearSensor").bind("click", function (event)
    {
        that.clear(that,scene);
    });

    //选择某一个传感器
    $("#sensorList").change(function (event)
    {
        index = parseInt(this.value);

        that.clear(that,scene);

        that.selectSomeOne(that,scene,select,index);

        if(time == null || time == undefined)
        {

            time = window.setInterval("selectSomeOneTime(index,data,viewer,ObjectGeo)",1000);
        }
        else
        {
            var i = index;
            clearInterval(time);
            time = window.setInterval("selectSomeOneTime(index,data,viewer,ObjectGeo)",1000);
        }

    });

    //选择显示某一类型的传感器
    $("#selectType").change(function (event)
    {
        var value = parseInt(this.value);

        switch (value)
        {
            case 0:
                that.clear(that,scene);
                that.initLoop(len,scene,that,select,data,viewer,ObjectGeo);
                break;
            case 1:
                that.clear(that,scene);
                that.judgeType(value,len,that,scene,select);
                break;
            case 2:
                that.clear(that,scene);
                that.judgeType(value,len,that,scene,select);
                break;
            case 3:
                that.clear(that,scene);
                that.judgeType(value,len,that,scene,select);
                break;
        }
    });

    //清除传感器颜色
    $("#clearSensorColor").bind("click", function (event) {
        for(var i = 0; i < that.Object.length; i++)
        {
            that.Object[i].material.color = new THREE.Color(0x88DD4B);
            viewer.impl.invalidate(true);
        }
    });

    //搜索框自动补全提示
    $(function(){

        $("#FuzzyQuery").bigAutocomplete({
            width:290,
            data:[{title:"索力传感器01",Id: 1, TypeID:1,name:"索力传感器01"},
                {title:"索力传感器02",Id: 2, TypeID:1,name:"索力传感器02"},
                {title:"索力传感器03",Id: 3, TypeID:1,name:"索力传感器03"},
                {title:"索力传感器04",Id: 4, TypeID:1,name:"索力传感器04"},
                {title:"温度传感器01",Id: 5,TypeID:2, name:"温度传感器01"},
                {title:"温度传感器02",Id: 6,TypeID:2, name:"温度传感器02"},
                {title:"温度传感器03",Id: 7, TypeID:1,name:"温度传感器03"},
                {title:"温度传感器04",Id: 8, TypeID:1,name:"温度传感器04"},
                {title:"沉降传感器01",Id: 9,TypeID:3, name:"沉降传感器01"},
                {title:"沉降传感器02",Id: 10,TypeID:3, name:"沉降传感器02"},
                {title:"沉降传感器03",Id: 11,TypeID:3, name:"沉降传感器03"},
                {title:"沉降传感器04",Id: 12,TypeID:3, name:"沉降传感器04"},
                {title:"沉降传感器05",Id: 13,TypeID:3, name:"沉降传感器05"}
            ],
            callback:function(datas)
            {
                index = datas.Id;
                var type = datas.TypeID;
                var name = datas.title;


                var data = dataJson;

                //clearInterval(time);
                that.selectOne(type,name,scene,that,len,select);

                //var dataJson = new DataJson();
                if(time == null || time == undefined)
                {

                    time = window.setInterval("timer(index,data,viewer,ObjectGeo)",1000);
                }
                else
                {
                    var i = index;
                    clearInterval(time);
                    time = window.setInterval("timer(index,data,viewer,ObjectGeo)",1000);
                }

            }
        });

    });


    //项目切换
    $("#spProjectName").bind("click",function (event)
    {
        var value = this.innerHTML;
        //alert(value);
        // switch (value)
        // {
        //     case "光谷八路":
        //         viewer.impl.unloadCurrentModel();
        //         var path = "model/3d.svf";
        //         viewer.load(path, undefined, onLoadSuccess, onLoadError);
        //         break;
        //     case "上海长江大桥":
        //         viewer.impl.unloadCurrentModel();
        //         var path = "model2/3d.svf";
        //         viewer.load(path, undefined, onLoadSuccess, onLoadError);
        //         break;
        //     case "沂河特大桥":
        //         viewer.impl.unloadCurrentModel();
        //         var path = "model3/3d.svf";
        //         viewer.load(path, undefined, onLoadSuccess, onLoadError);
        //         break;
        // }
    });

    $("#HistoryDataSelect").change(function (event)
    {
        var value = this.value;
        //TODO:读取echart图表数据；
        //value就是表示第几个传感器,那么每次都把EchartData中的数据抹去
        // 从数据库中读取新的值给EchartData;
        echartData.json = historydata[value-1];
        //刷新，默认显示("日")
        echart("日");

    });
    //调整Sensor大小
    //监听照相机
    var objectList = this.Object;
    viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function (event) {
        var camera = event.camera;
        var obj = objectList;
        for(var i = 0; i < obj.length; i += 1 ){
            var distance = obj[i].position.distanceTo(camera.position);
            var s = CalculateSize(distance);
            console.log(s);
            console.log(obj);
            obj[i].scale.set(s,s,s);
        }

    });

    return true;
};

InitSensor.prototype.unload = function() {
  return true;
};

//筛选面板选择某一个传感器
InitSensor.prototype.selectSomeOne = function(that,scene,select,id)
{
    var index = id-1;

    var type = data.json[index].TypeID;

    switch (type)
    {
        case 1:
            var geometry = that.createSphereGeometry(8, 10, 10);
            this.createSelectOne(scene,that,select,index,geometry);
            break;
        case 2:
            var geometry = that.createCubeGeometry(10, 10, 10);
            this.createSelectOne(scene,that,select,index,geometry);
            break;
        case 3:
            var geometry = that.createCylinderGeometry(10, 10, 16, 18, 3);
            this.createSelectOne(scene,that,select,index,geometry);
            break;
    }
    var camera = viewer.impl.camera;
    camera.dirty = true;
    camera.rotationAutoUpdate = true;

    //相机移动到指定位置
    camera.position.x = data.json[index].cameraPosition.x;
    camera.position.y = data.json[index].cameraPosition.y;
    camera.position.z = data.json[index].cameraPosition.z;

    camera.target.x = data.json[index].cameraTarget.x;
    camera.target.y = data.json[index].cameraTarget.y;
    camera.target.z = data.json[index].cameraTarget.z;

    viewer.applyCamera(camera);
    camera.up.x = data.json[index].cameraUp.x;
    camera.up.y = data.json[index].cameraUp.y;
    camera.up.z = data.json[index].cameraUp.z;

}



//初始化循环创建传感器
InitSensor.prototype.initLoop = function(len,scene,that,select,data,viewer,ObjectGeo){
    for(var i = 0; i < len; i++ )
    {
        var type = data.json[i].TypeID;
        switch (type)
        {
            case 1:
                var geometry = that.createSphereGeometry(8, 10, 10);
                this.initCreate(scene,that,select,i,geometry);
                break;
            case 2:
                var geometry = that.createCubeGeometry(10, 10, 10);
                this.initCreate(scene,that,select,i,geometry);
                break;
            case 3:
                var geometry = that.createCylinderGeometry(10, 10, 20, 18, 9);
                this.initCreate(scene,that,select,i,geometry);
                break;
        }
    }

    if (time == null || time == undefined) {
        time = setInterval("initTime(len,data,viewer,ObjectGeo)", 1000)
    }
    else {
        clearInterval(time);
        time = setInterval("initTime(len,data,viewer,ObjectGeo)", 1000)
    }


};

//初始化循环图表option and 筛选面板
InitSensor.prototype.echartForm = function(len,data){
    for(var i = 0; i < len; i++ )
    {
        var sensorList = document.getElementById("sensorList");
        var sLElement = document.createElement("option");
        sLElement.innerHTML = data.json[i].SensorName;
        sLElement.value = data.json[i].id;
        sensorList.appendChild(sLElement);

        var HistoryDataSelect = document.getElementById("HistoryDataSelect");
        var HDElement = document.createElement("option");
        HDElement.innerHTML = data.json[i].SensorName;
        HDElement.value = data.json[i].id;
        HistoryDataSelect.appendChild(HDElement);

        var AnalysisOne = document.getElementById("AnalysisOne");
        var AOElement = document.createElement("option");
        AOElement.innerHTML = data.json[i].SensorName;
        AOElement.value = data.json[i].id;
        AnalysisOne.appendChild(AOElement);

        var AnalysisTwo = document.getElementById("AnalysisTwo");
        var ATElement = document.createElement("option");
        ATElement.innerHTML = data.json[i].SensorName;
        ATElement.value = data.json[i].id;
        AnalysisTwo.appendChild(ATElement);
    }
};

//创建传感器
InitSensor.prototype.initCreate = function(scene,that,select,i,geometry){
    var color = this.setSensorColor(data.json[i]);
    var material = new THREE.MeshBasicMaterial({color : color});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.sensorID = i+1;

    AllSenorMesh.push(mesh);
    mesh.position.set(data.json[i].X, data.json[i].Y, data.json[i].Z);
    scene.add(mesh);
    that.Object.push(mesh);
    ObjectGeo.push(mesh);
    certainClass.push(mesh);

};

InitSensor.prototype.createSelectOne = function(scene,that,select,i,geometry){
    var color = this.setSensorColor(data.json[i]);
    var material = new THREE.MeshBasicMaterial({color : color});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.sensorID = i+1;

    AllSenorMesh.push(mesh);
    mesh.position.set(data.json[i].X, data.json[i].Y, data.json[i].Z);
    scene.add(mesh);
    that.Object.push(mesh);
    ObjectGeo.push(mesh);
    currentSomeOne.push(mesh);

};

//判断传感器类型
InitSensor.prototype.judgeType = function(value,len,that,scene,select){
    currentTypeIdArr = [];
    for(var i = 0; i < len; i++)
    {
        if(data.json[i].TypeID==value)
        {
            currentTypeIdArr.push(i);
            switch (value)
            {
                case 1:
                    var geometry = that.createSphereGeometry(8, 10, 10);
                    this.initCreate(scene,that,select,i,geometry);
                    break;
                case 2:
                    var geometry = that.createCubeGeometry(10, 10, 10);
                    this.initCreate(scene,that,select,i,geometry);
                    break;
                case 3:
                    var geometry = that.createCylinderGeometry(10, 10, 16, 18, 3);
                    this.initCreate(scene,that,select,i,geometry);
                    break;
            }
        }
    }

    if (time == null || time == undefined)
    {
        time = setInterval("someTypeTime(data,viewer,certainClass,currentTypeIdArr)", 1000);
    }
    else
    {
        clearInterval(time);
        time = setInterval("someTypeTime(data,viewer,certainClass,currentTypeIdArr)", 1000);
    }

};

//清除传感器
InitSensor.prototype.clear = function(that,scene){
    for(var i = 0; i < that.Object.length; i++)
    {
        scene.remove(that.Object[i]);
        viewer.impl.invalidate(true);
    }
    that.Object = [];   //清空数组;
    ObjectGeo = [];
    certainClass = [];
};

//选择显示某一个传感器
InitSensor.prototype.selectOne = function(value,name,scene,that,len,select){
    that.clear(that,scene);
    for(var i = 0; i < len; i++)
    {
        if(data.json[i].SensorName===name)
        {
            switch (value)
            {
                case 1:
                    var geometry = that.createSphereGeometry(8, 10, 10);
                    this.initCreate(scene,that,select,i,geometry);
                    break;
                case 2:
                    var geometry = that.createCubeGeometry(10, 10, 10);
                    this.initCreate(scene,that,select,i,geometry);
                    break;
                case 3:
                    var geometry = that.createCylinderGeometry(10, 10, 16, 18, 3);
                    this.initCreate(scene,that,select,i,geometry);
                    break;
            }
            var camera = viewer.impl.camera;
            camera.dirty = true;
            camera.rotationAutoUpdate = true;

            //相机移动到指定位置
            camera.position.x = data.json[i].cameraPosition.x;
            camera.position.y = data.json[i].cameraPosition.y;
            camera.position.z = data.json[i].cameraPosition.z;

            camera.target.x = data.json[i].cameraTarget.x;
            camera.target.y = data.json[i].cameraTarget.y;
            camera.target.z = data.json[i].cameraTarget.z;

            viewer.applyCamera(camera);
            camera.up.x = data.json[i].cameraUp.x;
            camera.up.y = data.json[i].cameraUp.y;
            camera.up.z = data.json[i].cameraUp.z;

        }
    }

};

InitSensor.prototype.decideEstablish = function(){

};

InitSensor.prototype.createSphereGeometry = function(r,sw,sh){
    var geometry = new THREE.SphereGeometry(r,sw,sh);
    return geometry;
};

InitSensor.prototype.createCubeGeometry = function(l,k,h){
    var geometry = new THREE.CubeGeometry(l,k,h);
    return geometry;
};

InitSensor.prototype.createCylinderGeometry = function(tr,br,h,rs,hs){
    var geometry = new THREE.CylinderGeometry(tr,br,h,rs,hs);
    return geometry;
};

Autodesk.Viewing.theExtensionManager.registerExtension('InitSensor', InitSensor);

function timer(index,data,viewer,ObjectGeo)
{
    //var num = 0;
    //document.getElementById("selectContent").childNodes[index-1].selected = "selected";
    document.getElementById("facturers").innerHTML = data.json[index-1].Factory;
    document.getElementById("sensorID").innerHTML = data.json[index-1].SensorName;
    document.getElementById("type").innerHTML = data.json[index-1].TypeName;
    var value = data.json[index-1].Value;
    document.getElementById("value").innerHTML = data.json[index-1].Value + data.json[index-1].unit;
    // document.getElementById("state").innerHTML = data.json[index-1].SensorState;
    var oneLevel = data.json[index-1].OneLevelValue;
    document.getElementById("OneLevelValue").innerHTML = data.json[index-1].OneLevelValue + data.json[index-1].unit;
    var twoLevel = data.json[index-1].TwoLevelValue;
    document.getElementById("TwoLevelValue").innerHTML = data.json[index-1].TwoLevelValue + data.json[index-1].unit;
    var threeLevel = data.json[index-1].ThreeLeveLValue;
    document.getElementById("ThreeLeveLValue").innerHTML = data.json[index-1].ThreeLeveLValue + data.json[index-1].unit;

    //离线
    if(value == 0)
    {
        document.getElementById("state").innerHTML = "离线";
        document.getElementById("stateColor").style.color = "#c0c0c0";
        document.getElementById("valueColor").style.color = "#c0c0c0";
        var color = new THREE.Color(0xc0c0c0);
        ObjectGeo[0].material.color = color;
    }
    //三级预警
    if(value <= twoLevel && value > threeLevel)
    {
        document.getElementById("state").innerHTML = "三级预警";
        document.getElementById("stateColor").style.color = "#fff000";
        document.getElementById("valueColor").style.color = "#fff000";
        var color = new THREE.Color(0xffff000);
        ObjectGeo[0].material.color = color;
    }
    //二级预警
    if(value <= oneLevel && value > twoLevel)
    {
        document.getElementById("state").innerHTML = "二级预警";
        document.getElementById("stateColor").style.color = "#ff8000";
        document.getElementById("valueColor").style.color = "#ff8000";
        var color = new THREE.Color(0xff8000);
        ObjectGeo[0].material.color = color;
        //viewer.impl.invalidate(true);
    }
    //一级预警
    if(value > oneLevel)
    {
        document.getElementById("state").innerHTML = "一级预警";
        document.getElementById("stateColor").style.color = "#ff0000";
        document.getElementById("valueColor").style.color = "#ff0000";
        var color = new THREE.Color(0xff0000);
        ObjectGeo[0].material.color = color;
    }
    //正常
    if(value <= threeLevel && value > 0)
    {
        document.getElementById("state").innerHTML = "正常";
        document.getElementById("stateColor").style.color = "#22b14c";
        document.getElementById("valueColor").style.color = "#22b14c";
        var color = new THREE.Color(0x22b14c);
        ObjectGeo[0].material.color = color;
    }

    viewer.impl.invalidate(true);
    // if(num == 0)
    // {
    //     viewer.impl.camera.dirty = true;
    //     viewer.impl.camera.position.x = data.json[index-1].X;
    //     viewer.impl.camera.position.y = data.json[index-1].Y;
    //     viewer.impl.camera.position.z = data.json[index-1].Z;
    // }
    // num = num + 1;

}

function initTime(len,data,viewer,ObjectGeo)
{
    var moreSensorDetaiData = document.getElementById("moreSensorDetaiData");
    moreSensorDetaiData.innerHTML="";
    for(var j = 1; j<= len; j++)
    {
        var ul = document.createElement("ul");
        createLiOne(moreSensorDetaiData,data,j,null,ul);

        //当前传感器数值
        var value = data.json[j-1].Value;

        //当前传感器数值

        // //当前传感器一级预警值
         var oneLevel = data.json[j-1].OneLevelValue;

        // //当前传感器二级预警值
         var twoLevel = data.json[j-1].TwoLevelValue;

        // //当前传感器三级预警值
         var threeLevel = data.json[j-1].ThreeLeveLValue;

        //离线
        if(value == 0)
        {
            var textColor = "#c0c0c0";

            //当前传感器状态颜色
            //当前传感器状态

            createLi(moreSensorDetaiData,textColor,value,"离线",data,j,null,ul);

            var color = new THREE.Color(0xc0c0c0);
            ObjectGeo[j-1].material.color = color;


        }
        //三级预警
        if(value <= twoLevel && value > threeLevel)
        {
            var textColor = "#fff000";

            createLi(moreSensorDetaiData,textColor,value,"三级预警",data,j,null,ul);

            var color = new THREE.Color(0xffff000);
            ObjectGeo[j-1].material.color = color;
        }
        //二级预警
        if(value <= oneLevel && value > twoLevel)
        {
            var textColor = "#ff8000";

            createLi(moreSensorDetaiData,textColor,value,"二级预警",data,j,null,ul);

            var color = new THREE.Color(0xff8000);
            ObjectGeo[j-1].material.color = color;

        }
        //一级预警
        if(value > oneLevel)
        {
            var textColor = "#ff0000";

            createLi(moreSensorDetaiData,textColor,value,"一级预警",data,j,null,ul);

            var color = new THREE.Color(0xff0000);
            ObjectGeo[j-1].material.color = color;

        }
        //正常
        if(value <= threeLevel && value > 0)
        {
            var textColor = "#22b14c";

            createLi(moreSensorDetaiData,textColor,value,"正常",data,j,null,ul);

            var color = new THREE.Color(0x22b14c);
            ObjectGeo[j-1].material.color = color;

        }

    }
    viewer.impl.invalidate(true);

}

function someTypeTime(data,viewer,certainClass,currentTypeIdArr)
{
    var moreSensorDetaiData = document.getElementById("moreSensorDetaiData");
    moreSensorDetaiData.innerHTML="";
    for(var j = 1; j<= certainClass.length; j++)
    {

        var num =  currentTypeIdArr[j-1]+1;
        var ul = document.createElement("ul");
        createLiOne(moreSensorDetaiData,data,j,num,ul);

        var value = data.json[num-1].Value;
         var oneLevel = data.json[num-1].OneLevelValue;
         var twoLevel = data.json[num-1].TwoLevelValue;
         var threeLevel = data.json[num-1].ThreeLeveLValue;

        //离线
        if(value == 0)
        {
            var textColor = "#c0c0c0";

            createLi(moreSensorDetaiData,textColor,value,"离线",data,j,num,ul);

            var color = new THREE.Color(0xc0c0c0);
            certainClass[j-1].material.color = color;

        }
        //三级预警
        if(value <= twoLevel && value > threeLevel)
        {
            var textColor = "#fff000";

            createLi(moreSensorDetaiData,textColor,value,"三级预警",data,j,num,ul);

            var color = new THREE.Color(0xffff000);
            certainClass[j-1].material.color = color;
        }
        //二级预警
        if(value <= oneLevel && value > twoLevel)
        {
            var textColor = "#ff8000";

            createLi(moreSensorDetaiData,textColor,value,"二级预警",data,j,num,ul);

            var color = new THREE.Color(0xff8000);
            certainClass[j-1].material.color = color;
        }
        //一级预警
        if(value > oneLevel)
        {
            var textColor = "#ff0000";

            createLi(moreSensorDetaiData,textColor,value,"一级预警",data,j,num,ul);

            var color = new THREE.Color(0xff0000);
            certainClass[j-1].material.color = color;
        }
        //正常
        if(value <= threeLevel && value > 0)
        {
            var textColor = "#22b14c";

            createLi(moreSensorDetaiData,textColor,value,"正常",data,j,num,ul);

            var color = new THREE.Color(0x22b14c);
            certainClass[j-1].material.color = color;
        }
    }
    viewer.impl.invalidate(true);
}

function selectSomeOneTime(index,data,viewer,ObjectGeo)
{
    var index = parseInt(index);
    document.getElementById("facturers").innerHTML = data.json[index-1].Factory;
    document.getElementById("sensorID").innerHTML = data.json[index-1].SensorName;
    document.getElementById("type").innerHTML = data.json[index-1].TypeName;
    var value = data.json[index-1].Value;
    document.getElementById("value").innerHTML = data.json[index-1].Value + data.json[index-1].unit;
    var oneLevel = data.json[index-1].OneLevelValue;
    document.getElementById("OneLevelValue").innerHTML = data.json[index-1].OneLevelValue + data.json[index-1].unit;
    var twoLevel = data.json[index-1].TwoLevelValue;
    document.getElementById("TwoLevelValue").innerHTML = data.json[index-1].TwoLevelValue + data.json[index-1].unit;
    var threeLevel = data.json[index-1].ThreeLeveLValue;
    document.getElementById("ThreeLeveLValue").innerHTML = data.json[index-1].ThreeLeveLValue + data.json[index-1].unit;

    //离线
    if(value == 0)
    {
        document.getElementById("state").innerHTML = "离线";
        document.getElementById("stateColor").style.color = "#c0c0c0";
        document.getElementById("valueColor").style.color = "#c0c0c0";
        var color = new THREE.Color(0xc0c0c0);
        ObjectGeo[0].material.color = color;
    }
    //三级预警
    if(value <= twoLevel && value > threeLevel)
    {
        document.getElementById("state").innerHTML = "三级预警";
        document.getElementById("stateColor").style.color = "#fff000";
        document.getElementById("valueColor").style.color = "#fff000";
        var color = new THREE.Color(0xffff000);
        ObjectGeo[0].material.color = color;
    }
    //二级预警
    if(value <= oneLevel && value > twoLevel)
    {
        document.getElementById("state").innerHTML = "二级预警";
        document.getElementById("stateColor").style.color = "#ff8000";
        document.getElementById("valueColor").style.color = "#ff8000";
        var color = new THREE.Color(0xff8000);
        ObjectGeo[0].material.color = color;
        //viewer.impl.invalidate(true);
    }
    //一级预警
    if(value > oneLevel)
    {
        document.getElementById("state").innerHTML = "一级预警";
        document.getElementById("stateColor").style.color = "#ff0000";
        document.getElementById("valueColor").style.color = "#ff0000";
        var color = new THREE.Color(0xff0000);
        ObjectGeo[0].material.color = color;
    }
    //正常
    if(value <= threeLevel && value > 0)
    {
        document.getElementById("state").innerHTML = "正常";
        document.getElementById("stateColor").style.color = "#22b14c";
        document.getElementById("valueColor").style.color = "#22b14c";
        var color = new THREE.Color(0x22b14c);
        ObjectGeo[0].material.color = color;
    }

    viewer.impl.invalidate(true);
}

function createLiOne(id,data,index,num,ul)
{
    if(num == null || num == undefined)
    {
        var li = document.createElement("li");
        li.innerHTML = data.json[index-1].SensorName;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.innerHTML = data.json[index-1].TypeName;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.innerHTML = data.json[index-1].Factory;
        ul.appendChild(li);

        id.appendChild(ul);
    }
    else
    {
        var li = document.createElement("li");
        li.innerHTML = data.json[num-1].SensorName;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.innerHTML = data.json[num-1].TypeName;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.innerHTML = data.json[num-1].Factory;
        ul.appendChild(li);

        id.appendChild(ul);
    }

}

function createLi(id,textColor,value,text,data,index,num,ul)
{
    if(num == null || num == undefined) {
        var li = document.createElement("li");
        li.style.color = textColor;
        li.innerHTML = value;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = textColor;
        li.innerHTML = text;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = "#ff0000";
        li.innerHTML = data.json[index - 1].OneLevelValue + data.json[index - 1].unit;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = "#ff8000";
        li.innerHTML = data.json[index - 1].TwoLevelValue + data.json[index - 1].unit;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = "#fff000";
        li.innerHTML = data.json[index - 1].ThreeLeveLValue + data.json[index - 1].unit;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.innerHTML = data.json[index - 1].address;
        ul.appendChild(li);

        id.appendChild(ul);
    }
    else
    {
        var li = document.createElement("li");
        li.style.color = textColor;
        li.innerHTML = value;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = textColor;
        li.innerHTML = text;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = "#ff0000";
        li.innerHTML = data.json[num - 1].OneLevelValue;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = "#ff8000";
        li.innerHTML = data.json[num - 1].TwoLevelValue;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.style.color = "#fff000";
        li.innerHTML = data.json[num - 1].ThreeLeveLValue;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.innerHTML = data.json[num - 1].address;
        ul.appendChild(li);

        id.appendChild(ul);
    }
}

//根据照相机和Sensor的距离计算缩放比例
function CalculateSize(x) {
    var y ;
    /*var p1 =   1.274 * Math.pow(10,-9);
    var p2 =  -1.727 * Math.pow(10,-6);
    var p3 =    0.001059;
    var p4 =    0.004901;
    y = Math.pow(x,3)*p1 + Math.pow(x,2) * p2 + x * p3 + p4;
    if(y > 3.5){
        y = 3.5
    }*/
    y = 0.0005733 * x + 0.1119;
    if(y < 0.05){
        y = 0.05
    }
    return y;
}
