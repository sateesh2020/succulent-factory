import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import SUCCULENT_OBJECT from '@salesforce/schema/Succulent__c';

/**
 * A presentation component to display a Succulent__c sObject. The provided
 * Succulent__c data must contain all fields used by this component.
 */

export default class SucculentListItem extends LightningElement {
    @api succulent;

    /** View Details Handler to navigates to the record page */
    handleViewDetailsClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.succulent.Id,
                objectApiName: SUCCULENT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }
}
