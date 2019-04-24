declare module "@salesforce/apex/SucculentController.getSucculents" {
  export default function getSucculents(param: {filters: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/SucculentController.getSimilarSucculents" {
  export default function getSimilarSucculents(param: {succulentId: any, familyId: any}): Promise<any>;
}
