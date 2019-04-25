public with sharing class SucculentController {
    static Integer PAGE_SIZE = 9;

    public class Filters {
        public String searchKey { get;set; }

        public String[] families { get;set; }

        public String[] growingSeasons { get;set; }

        public String[] propogationMethods { get;set; }

        public String[] toxic { get;set; }
    }

    @AuraEnabled(Cacheable=true)
    public static PagedResult getSucculents(String filters, Integer pageNumber){
        String key , whereClause = '';
        String[] families, growingSeasons, propogationMethods, toxic, criteria = new String[]{};
        
        if (!String.isEmpty(filters)) {
            Filters succulentFilters = (Filters) JSON.deserializeStrict(filters, SucculentController.Filters.class);
            families = succulentFilters.families;
            growingSeasons = succulentFilters.growingSeasons;
            propogationMethods = succulentFilters.propogationMethods;
            toxic = succulentFilters.toxic;
            
            if (!String.isEmpty(succulentFilters.searchKey)) {
                key = '%' + succulentFilters.searchKey + '%';
                criteria.add('Name LIKE :key');
            }
            if (succulentFilters.families != null) {
                families = succulentFilters.families;
                criteria.add('Family__c IN :families');
            }                      
            if (succulentFilters.growingSeasons != null) {
                growingSeasons = succulentFilters.growingSeasons;
                criteria.add('Grows_During__c IN :growingSeasons');
            }                      
            if (succulentFilters.propogationMethods != null) {
                propogationMethods = succulentFilters.propogationMethods;
                criteria.add('Propogate_By__c IN :propogationMethods');
            }
            if (succulentFilters.toxic != null) {
                toxic = succulentFilters.toxic;
                criteria.add('Toxic__c IN :toxic');
            }
            if (criteria.size() > 0) {
                whereClause = 'WHERE ' + String.join( criteria, ' AND ' );
            }                      
        }

        Integer pageSize = SucculentController.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize;

        PagedResult result =  new PagedResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;
        result.totalItemCount = Database.countQuery('SELECT count() FROM Succulent__c ' + whereClause);
        result.records = Database.query('SELECT Id, Name, Image__c FROM Succulent__c ' + whereClause + ' ORDER BY Name LIMIT :pageSize OFFSET :offset');
        return result;

    }

    @AuraEnabled(Cacheable=true)
    public static Succulent__c[] getSimilarSucculents(Id succulentId, Id familyId) {
        return [SELECT Id, Name, Image__c FROM Succulent__c WHERE Family__c=:familyId AND Id!=:succulentId];
    }


}