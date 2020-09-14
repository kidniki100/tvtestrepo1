//Controller class used to get external data to return to front end
public class CreditorTableCtrl {
    
    @AuraEnabled
    public static string getRemoteData(){
        Final String result;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
        request.setMethod('GET');
        //get the data
        HttpResponse response = http.send(request);
        //if it is a good response send the response back, if it is bad, add error and send the response back
        if (response.getStatusCode() == 200) {
            result = response.getBody();
        }else{
        	result = 'error : ' + response.getBody();
        }
        return result;    
    }
    
}