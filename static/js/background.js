(function() {
    var _timers = {};
    var timers = {
        get: function(id) {
            return _timers[id] || false;
        },
        set: function(tab, interval, course) {
            var id = tab.id;

            (_timers[id]) && timers.remove(tab.id);
            _timers[id] = {
                tab: tab,
                nextRefresh: (new Date).getTime() + interval,
                interval: interval,
                timer: timers.start(id, interval),
                coursename: course
            };
        },
        remove: function(id) {
            if (_timers[id]) {
                chrome.browserAction.setBadgeText({ tabId: id, text: '' });
                clearInterval(_timers[id].timer);
                delete _timers[id];
            }
        },
        start: function(id, interval) {
            return setInterval(function() {
                if (_timers[id] && (new Date).getTime() >= _timers[id].nextRefresh) {
                    chrome.tabs.reload(id, function() {
                        setTimeout(function() {
                            _timers[id].nextRefresh = (new Date).getTime() + _timers[id].interval + 999;
                        }, 1);
                        chrome.tabs.sendRequest(id, { coursename: _timers[id].coursename }, function(response) {
                            if (response.result){
                                alert("You Get it!");
                                timers.remove(id);
                            }
                        });
                    });
                } else if (_timers[id]) {
                    var timeLeft = moment(_timers[id].nextRefresh - (new Date).getTime());

                    chrome.browserAction.setBadgeText({ tabId: id, text: '' + timeLeft.format('m:ss') });
                } else {
                    timers.remove(id);
                }
            }, 100);
        }
    };

    // Set timers on the window object so we can access it from the popdown
    window.timers = timers;

})();