const method = {
    copy: (el, textMessage) => {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(el).text()).select();
        document.execCommand("copy");
        $temp.remove();
        alert(textMessage);
    }
}

var Queue = (function() {
    function Queue() {};

    Queue.prototype.running = false;

    Queue.prototype.queue = [];

    Queue.prototype.add_function = function(callback) {
        var _this = this;
        this.queue.push(function() {
            var finished = callback();
            if (typeof finished === "undefined" || finished) {
                _this.next();
            }
        });

        if (!this.running) {
            this.next();
        }

        return this;
    }

    Queue.prototype.next = function() {
        this.running = false;
        var shift = this.queue.shift();
        if (shift) {
            this.running = true;
            shift();
        }
    }

    return Queue;

})();