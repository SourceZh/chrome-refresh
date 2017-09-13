chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
    	var flag = false;
    	var list = $('table .datagrid').first().find('.datagrid-even,.datagrid-odd');
    	for (var i = list.length - 1; i >= 0; i--) {
    		var span = list.eq(i).find('span');
    		if (span[0].innerText == request.coursename){
    			var nums = span[11].innerText.split('/');
    			if (nums[0].trim() != nums[1].trim()){
    				flag = true;
    				break;
    			}
    		}
    	}
        sendResponse({ result: flag });
    }
);