public with sharing class SucculentController {
    static Integer PAGE_SIZE = 9;

    @AuraEnabled(Cacheable=true)
    public static PagedResult getSucculents(String filters, Integer pageNumber){
        String key , whereClause = '';

        Integer pageSize = SucculentController.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize;

        PagedResult result =  new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        result.totalItemCount = Database.countQuery('SELECT count() FROM Succulent__c ');
        result.records = Database.query('SELECT Id, Name, Image__c FROM Succulent__c ORDER BY Name LIMIT :pageSize OFFSET :offset');
        return result;

    }

    @AuraEnabled(Cacheable=true)
    public static Succulent__c[] getSimilarSucculents(Id succulentId, Id familyId) {
        return [SELECT Id, Name, Image__c FROM Succulent__c WHERE Family__c=:familyId AND Id!=:succulentId];
    }


}