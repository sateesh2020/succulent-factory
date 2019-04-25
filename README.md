# Succulent Factory

## Dev, Build and Test

## Query

```sh
SELECT Name, Family__c, Flowering__c,Growing_Season__c,Grows_During__c,Height__c,Image__c,Offset_Propogation__c,Other_Names__c,Pairs_With__c,Perfect_Place__c,Propogate_By__c, Scientific_Name__c,Sun_Light__c,Survive_Cold__c,Toxic__c,Water__c,Watering__c,Where_to_plant__c,Width__c,Zone__c  FROM Succulent__c

```

```sh
SELECT Id, Name, Image__c FROM Succulent__c WHERE Name LIKE 'aloe' AND Family__c IN ('Aloe','Echeveria','Haworthia','Un Known','Cactus') AND Grows_During__c IN ('Spring','Summer','Fall','Winter') AND Propogate_By__c IN ('Leaves','Offsets','Seeds') AND Toxic__c IN ('Animals','Humans','Non Toxic') ORDER BY Name LIMIT 9 OFFSET 0
```

## Resources

## Description of Files and Directories

## Issues
