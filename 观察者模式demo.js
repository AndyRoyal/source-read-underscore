// 观察者模式
var observer = {
    hash: {},
    subscribe: function(id, callback) {
        if (typeof id !== 'string') {
            return
        }
        if (!this.hash[id]) {
            this.hash[id] = $.Callbacks()
            this.hash[id].add(callback)
        } else {
            this.hash[id].add(callback)
        }
    },
    publish: function(id) {
        if (!this.hash[id]) {
            return
        }
        this.hash[id].fire(id)
    }
}
 
// 订阅
observer.subscribe('mailArrived1', function() {
    alert('来信了1')
});
observer.subscribe('mailArrived2', function() {
    alert('来信了2')
});
observer.subscribe('mailArrived3', function() {
    alert('来信了3')
});
observer.subscribe('mailArrived4', function() {
    alert('来信了4')
});
observer.subscribe('mailArrived5', function() {
    alert('来信了5')
});
observer.subscribe('mailArrived6', function() {
    alert('来信了6')
});
observer.subscribe('mailSend', function() {
    alert('发信成功')
});
//
var a={};
function fn1(){

}
}
 
// 发布,
setTimeout(function() {
    observer.publish('mailArrived')
}, 5000)
setTimeout(function() {
    observer.publish('mailSend')
}, 10000)
//目的
//1> 执行回调
//2> 