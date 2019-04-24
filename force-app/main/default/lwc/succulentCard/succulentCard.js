import { LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

/** Wire adapter to load records, utils to extract values. */
import { getRecord } from 'lightning/uiRecordApi';

/** Pub-sub mechanism for sibling component communication. */
import { registerListener, unregisterAllListeners } from 'c/pubsub';

import SUCCULENT_OBJECT from '@salesforce/schema/Succulent__c';
import NAME_FIELD from '@salesforce/schema/Succulent__c.Name';
import IMAGE_FIELD from '@salesforce/schema/Succulent__c.Image__c';
import FAMILY_FIELD from '@salesforce/schema/Succulent__c.Family__c';
import SCIENTIFIC_NAME_FIELD from '@salesforce/schema/Succulent__c.Scientific_Name__c';
import OTHER_NAMES_FIELD from '@salesforce/schema/Succulent__c.Other_Names__c';
import TOXIC_FIELD from '@salesforce/schema/Succulent__c.Toxic__c';
import PERFECT_PACE_FIELD from '@salesforce/schema/Succulent__c.Perfect_Place__c';
import SUN_LIGHT_FIELD from '@salesforce/schema/Succulent__c.Sun_Light__c';
import GROWS_DURING_FIELD from '@salesforce/schema/Succulent__c.Grows_During__c';
import WATERING_FIELD from '@salesforce/schema/Succulent__c.Watering__c';
import LEAF_PROP_FIELD from '@salesforce/schema/Succulent__c.Leaf_Propogation__c';
import OFFSET_PROP_FIELD from '@salesforce/schema/Succulent__c.Offset_Propogation__c';
import CUT_PROP_FIELD from '@salesforce/schema/Succulent__c.Cut_Propogation__c';

const fields = [
    NAME_FIELD,
    IMAGE_FIELD,
    FAMILY_FIELD,
    SCIENTIFIC_NAME_FIELD,
    OTHER_NAMES_FIELD,
    TOXIC_FIELD,
    PERFECT_PACE_FIELD,
    SUN_LIGHT_FIELD,
    GROWS_DURING_FIELD,
    WATERING_FIELD,
    LEAF_PROP_FIELD,
    OFFSET_PROP_FIELD,
    CUT_PROP_FIELD
];

export default class SucculentCard extends LightningElement {
    /** Id of Succulent__c to display. */
    recordId;

    @wire(CurrentPageReference) pageRef;

    /** Load the succulent__c to display. */
    @wire(getRecord, { recordId: '$recordId', fields })
    succulent;

    connectedCallback() {
        registerListener(
            'succulentSelected',
            this.handleSucculentSelected,
            this
        );
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    /**
     * Handler for when a succculent is selected. When `this.recordId` changes, the @wire
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
