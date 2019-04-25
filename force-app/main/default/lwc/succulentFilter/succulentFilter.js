import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import FAMILY_FIELD from '@salesforce/schema/Succulent__c.Family__c';
import GROWS_IN_FIELD from '@salesforce/schema/Succulent__c.Grows_During__c';
import PROPOGATE_BY_FIELD from '@salesforce/schema/Succulent__c.Propogate_By__c';
import TOXIC_FIELD from '@salesforce/schema/Succulent__c.Toxic__c';

/** Pub-sub mechanism for sibling component communication. */
import { fireEvent } from 'c/pubsub';

/** The delay used when debouncing event handlers before firing the event. */
const DELAY = 350;

export default class SucculentFilter extends LightningElement {
    searchKey = '';

    filters = {
        searchKey: ''
    };

    @wire(CurrentPageReference) pageRef;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: FAMILY_FIELD
    })
    families;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: GROWS_IN_FIELD
    })
    growingSeasons;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: PROPOGATE_BY_FIELD
    })
    propogationMethods;

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: TOXIC_FIELD
    })
    toxic;

    handleSearchKeyChange(event) {
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
    }

    handleCheckboxChange(event) {
        if (!this.filters.families) {
            // Lazy initialize filters with all values initially set
            this.filters.families = this.families.data.values.map(
                item => item.value
            );
            this.filters.growingSeasons = this.growingSeasons.data.values.map(
                item => item.value
            );
            this.filters.propogationMethods = this.propogationMethods.data.values.map(
                item => item.value
            );
            this.filters.toxic = this.toxic.data.values.map(item => item.value);
        }
        const value = event.target.dataset.value;
        const filterArray = this.filters[event.target.dataset.filter];
        if (event.target.checked) {
            if (!filterArray.includes(value)) {
                filterArray.push(value);
            }
        } else {
            this.filters[event.target.dataset.filter] = filterArray.filter(
                item => item !== value
            );
        }
        fireEvent(this.pageRef, 'filterChange', this.filters);
    }

    delayedFireFilterChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            fireEvent(this.pageRef, 'filterChange', this.filters);
        }, DELAY);
    }
}
