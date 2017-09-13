$(function() {
    var ext = chrome.extension.getBackgroundPage(),
        $min = $('#minutes'),
        $sec = $('#seconds'),
        swapButtons = function() {
            $('#start,#stop').toggle();
        };
    var course = $('#coursename');
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var timer = ext.timers.get(tabs[0].id);
        if(timer) {
            swapButtons();
            var min = timer.interval / (60 * 1000);
            $min.val(Math.floor(min));
            $sec.val(Math.round((min - Math.floor(min)) * 60));
        } else {
            $min.val(localStorage.defaultMin || 0);
            $sec.val(localStorage.defaultSec || 15);
        }
    });
    
    $('#start').on('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var interval = ($min.val() * 60 * 1000) + ($sec.val() * 1000);
            ext.timers.set(tabs[0], interval, course.val());
        });
        swapButtons();
    });
    
    $('#stop').on('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            ext.timers.remove(tabs[0].id);
        });
        swapButtons();
    });
    
    $('#default').on('click', function() {
        localStorage.defaultMin = $min.val();
        localStorage.defaultSec = $sec.val();
        $('#defaultSuccess').show().delay(500).fadeOut('fast');
    });
    
    setTimeout(function() {
        $sec.focus()[0].select();
    }, 100);
    
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-37022210-8', 'auto');
    ga('set', 'checkProtocolTask', function(){});
    ga('require', 'displayfeatures');
    ga('send', 'pageview', '/popup.html');
    
});