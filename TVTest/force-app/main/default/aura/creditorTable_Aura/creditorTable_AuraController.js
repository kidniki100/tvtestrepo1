({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Creditor', fieldName: 'creditorName', type: 'text',editable: true},
            {label: 'First Name', fieldName: 'firstName', type: 'text',editable: true},
            {label: 'Last Name', fieldName: 'lastName', type: 'text',editable: true},
            {label: 'Min Pay %', fieldName: 'minPaymentPercentage', type: 'number', typeAttributes: { maximumFractionDigits :"2"},editable: true},
            {label: 'Balance', fieldName: 'balance', type: 'currency', typeAttributes: { currencyCode: 'USD'},editable: true},
        ]);
        
        
        helper.fetchData(cmp, event, helper);
    },
    
    addClick: function (cmp, event, helper) {
        var data = cmp.get("v.data");
        var eIds = cmp.get("v.existingIds");
        const newId = helper.getRandomNumber(cmp, event, helper);
        eIds.push(newId);
        data.push({
            "id": newId,
            "creditorName": "",
            "firstName": "",
            "lastName": "",
            "minPaymentPercentage": 0,
            "balance": 0
        });
        cmp.set("v.data",data);
        cmp.set("v.totalRowCount", data.length);
        cmp.set("v.existingIds",eIds);
    },
    
    removeClick: function (cmp, event, helper) {
        let oldData = cmp.get("v.data");
        let selData = cmp.get('v.selectedData');
        var newData = []; 
        if(selData){
            for(let o of oldData){
                var match = false;
                for(let s of selData){
                    
                    if(o.id == s.id){
                        match = true;
                    }
                    
                }
                if(!match){
                    newData.push(o);
                }    
            }
            /*let newData = oldData.filter(function(e){
                console.log(e);	
                return selData.indexOf(e) === -1;
        	});*/
         	cmp.set("v.data",newData);
            cmp.set("v.totalRowCount", newData.length);
         }
    },
    
    updateSelectedText: function (cmp, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        let data = cmp.get("v.data");
        var balanceTotal = 0;
        for(let row of selectedRows){
            balanceTotal += row.balance;	
        }
        cmp.set('v.selectedData',selectedRows);
        cmp.set('v.selectedRowsCount', selectedRows.length);
        cmp.set('v.totalBalance', balanceTotal);
    },
    
    handleSaveEdition: function (cmp, event, helper) {
        var draftValues = event.getParam('draftValues');
        var selectedRows = event.getParam('selectedRows');
        var oldData = cmp.get("v.data");
        for(let data of oldData){
            console.log(data);
            for(let draft of draftValues){
                if(draft.id == data.id){
                    Object.keys(draft).forEach(function(key,index) {
                        if(key == 'balance'){
                            data[key] = parseFloat(draft[key]);
                        }else{
                            data[key] = draft[key];
                        }        
                        
                    });
                }
            }
        }
        cmp.set("v.data",oldData);
        cmp.set('v.draftValues', []);
    },
    
})