({
    fetchData : function(cmp, event, helper)  {
        var action = cmp.get("c.getRemoteData");	       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                let resp = response.getReturnValue()
                var ids = [];
                if(!resp.includes('error')){
                    let data = JSON.parse(resp);
                    for(let val of data){
                        ids.push(val.id);
                    }
                    cmp.set('v.data',data);
                    cmp.set("v.totalRowCount", data.length);
                    cmp.set("v.existingIds", ids);
                    console.log(cmp.get("v.existingIds"));
                }else{
                    console.log(resp);
                    helper.message('Error','Something went wrong, please contact support!', 'error');
                }
            }
            else if (state === "INCOMPLETE") {
                helper.message('Error','Something went wrong, please contact support!', 'error');
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            helper.message('Error','Something went wrong, please contact support!', 'error');
                        }
                    } else {
                        console.log("Unknown error");
                        helper.message('Error','Something went wrong, please contact support!', 'error');
                    }
                }
        });
        
        $A.enqueueAction(action);
    },
    
    message : function(title, message, type){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type" : type
        });
        toastEvent.fire();
    },
    
    getRandomNumber : function(cmp, event, helper)  {
        var eIds = cmp.get("v.existingIds");
     	var rand;
            do {
            rand = Math.floor(Math.random() * 101); // re-randomize, 0 to 100 inclusive
            } while (eIds.indexOf(rand) > -1);
            return rand;   
    }
    
    
})