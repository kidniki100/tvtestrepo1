@isTest
global class CreditorCalloutMockFail implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"Error" : "Bad Request"}');
        response.setStatusCode(400);
        return response; 
    }
}