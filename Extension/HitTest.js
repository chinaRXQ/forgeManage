/**
 * Created by Administrator on 2017/7/23.
 */
function HIT(viewer) {
    this.viewer = viewer;

}
HIT.prototype = {
  getHitTest : function (event) {
      var _viewer = this.viewer;
      console.log(this.viewer);
      var screenPoint = {
          x: event.clientX,
          y: event.clientY - 50
      };
      // hit test

      var hitTest = _viewer.impl.hitTest(screenPoint.x,screenPoint.y,true);
      // draw the temporary triangle face

      if(hitTest){
          return {
              point: hitTest.intersectPoint,
              face: hitTest.face,
              model: hitTest.model,
              instanceTree: hitTest.model.selector.getInstanceTree()
          }
      }
  }
};
/*
function test(name) {
    this.name = name;
}
test.prototype = {
    getName:function () {
        console.log(this.name);
    }
};
new test('liuxiaolong').getName();*/
