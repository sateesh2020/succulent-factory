import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

/** Wire adapter to load records, utils to extract values. */
import { getRecord } from 'lightning/uiRecordApi';

/** Pub-sub mechanism for sibling component communication. */
import { registerListener, unregisterAllListeners } from 'c/pubsub';

import SUCCULENT_OBJECT from '@salesforce/schema/Succulent__c';

const fields = [];

export default class SucculentCard extends LightningElement {
    /** Id of Succulent__c to display. */
    recordId;

    @wire(CurrentPageReference) pageRef;

    /** Load the succulent__c to display. */
    @wire(getRecord, { recordId: '$recordId', fields })
    succulent;

    connectedCallback() {
        registerListener('succulentSelected', this.handleProductSelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    /**
     * Handler for when a product is selected. When `this.recordId` changes, the @wire
     * above will detect the change and provision new data.
     */
    handleSucculentSelected(succulentId) {
        this.recordId = succulentId;
    }

    //Navigation to the Record Page
    handleNavigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard_recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: SUCCULENT_OBJECT.objectApiName,
                actionName: 'view'
            }
        });
    }

    get noData() {
        return !this.succulent.error && !this.succulent.data;
    }
}
