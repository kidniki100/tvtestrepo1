@isTest
private class CreditorTableCtrl_Test {
    
	static testmethod void getRemoteDataTestPositive() {
        
        Test.setMock(HttpCalloutMock.class, new CreditorCalloutMockSuccess()); 

        String responseData = CreditorTableCtrl.getRemoteData();
        String expectedValue = '[{"id":1,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":1363},{"id":2,"creditorName":"AMEX","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":2763},{"id":3,"creditorName":"AMEX","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":429},{"id":4,"creditorName":"AMEX","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":1363},{"id":5,"creditorName":"DISCOVERBANK","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":2644},{"id":6,"creditorName":"CAPITAL ONE","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":4,"balance":5464},{"id":7,"creditorName":"CAPITAL ONE","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":4,"balance":2345},{"id":8,"creditorName":"CAPITAL ONE","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":4,"balance":836},{"id":9,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":3.5,"balance":687},{"id":10,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":3.5,"balance":235}]';
        System.assertEquals(responseData, expectedValue);
        
    }
    
    static testmethod void getRemoteDataTestNegative() {
        
        Test.setMock(HttpCalloutMock.class, new CreditorCalloutMockFail()); 

        String responseData = CreditorTableCtrl.getRemoteData();
        String expectedValue = 'error : {"Error" : "Bad Request"}';
        System.assertEquals(responseData, expectedValue);
        
    }
}