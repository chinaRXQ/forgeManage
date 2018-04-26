$(window).load(function(){
    $(document).mousemove(function(e) {
        if (!!this.move) {
            var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
                callback = document.call_down || function() {
                        $(this.move_target).css({
                            'top': e.pageY - posix.y,
                            'left': e.pageX - posix.x
                        });
                    };

            callback.call(this, e, posix);
        }
    }).mouseup(function(e) {
        if (!!this.move) {
            var callback = document.call_up || function(){};
            callback.call(this, e);
            $.extend(this, {
                'move': false,
                'move_target': null,
                'call_down': false,
                'call_up': false
            });
        }
    });

    var pannels = ['#sensorFilter','#sensorDetail','#sensorsAnalysis','#sensorHistoryData','#moreSensorDetailPlane'];

    for(var i=0;i<pannels.length;i++)
    {
        movepannels(pannels[i]);
    }

    //TODO:设定窗口可拖动范围，以免拖出屏幕外面;

});

function movepannels(id)
{
    $(id).mousedown(function(e) {
        var offset = $(this).offset();

        this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
        $.extend(document, {'move': true, 'move_target': this});
    });
}