/**
 * 传感器构造信息；
 * Created by Administrator on 2017/7/22.
 */
function Sensor(id, vector3, data, scene, viewer) {
    this.id = id;
    this.coordinate = vector3;
    this.data = data;
    this.scene = scene;
    this.viewer = viewer;
    this.sensor = null;
}
Sensor.prototype = {
    getData:function () {
        return this.data;
    },
    setData:function () {
        //从数据库获取传感器数据
    },
    generateSensorInModel : function () {
        var geometry = new THREE.SphereGeometry(8,10,10);
        var color = GetColor(this.data);
        console.log(color);
        if(color){
            var material = new THREE.MeshBasicMaterial({color : color});
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.set(this.coordinate.x, this.coordinate.y, this.coordinate.z);
            this.scene.add(this.mesh);
        }
        this.viewer.impl.invalidate(true);
        this.sensor = this.mesh;
        return this.mesh;
    },
    getSensor:function ()
    {
        if(this.sensor)
        {
            return this.sensor
        }
        else
        {
            console.log("sensor为空");
        }
    },
    setSensorColor : function () {
        var sensor = this.getSensor();
        if(sensor){
            var color = GetColor(this.data);
            var newMaterial = new THREE.MeshBasicMaterial({color: color});
            sensor.material = newMaterial;
        }
    }
};

//报警颜色
function LevelAndColor() {
    this.normal_Level = new THREE.Color(0x008000);
    this.One_Level = new THREE.Color(0xFF0000);
    this.Two_Level = new THREE.Color(0xFFFF00);
    this.Three_Level = new THREE.Color(0xFFA500);
}

function Level() {
    this.normal = 0;
    this.one = 1;
    this.two = 2;
    this.three = 3
}

function GetLevel(data) {
    var Lev = new Level();
    var level;
    console.log(data);
    switch (data){
        case "0":
            //level = Lev.normal;
            level = 0;
            break;
        case "1":
            //level = Lev.one;
            level = 1;
            break;
        case "2":
            //level = Lev.two;
            level = 2;
            break;
        case "3":
            //level = Lev.three;
            level = 3;
            break;
    }
    return level;
}
function GetColor(data) {
    var level = GetLevel(data);
    var color = new LevelAndColor();
    var c = null;
    switch (level){
        case 0:
            c = color.normal_Level;
            //c = 0x0000FF;
            break;
        case 1:
            c = color.One_Level;
            break;
        case 2:
            c = color.Two_Level;
            break;
        case 3:
            c = color.Three_Level;
            break;
    }
    return c ;
}