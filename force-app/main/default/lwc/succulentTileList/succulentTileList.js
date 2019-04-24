import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

/** getSucculents() method in SucculentController Apex class */
import getSucculents from '@salesforce/apex/SucculentController.getSucculents';

/** Pub-sub mechanism for sibling component communication. */
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

/**
 * Container component that loads and displays a list of Succulent__c records.
 */
export default class SucculentTileList extends LightningElement {
    /**
     * Whether to display the search bar.
     * TODO - normalize value because it may come as a boolean, string or otherwise.
     */
    @api searchBarIsVisible = false;

    /**
     * Whether the succulent tiles are draggable.
     * TODO - normalize value because it may come as a boolean, string or otherwise.
     */
    @api tilesAreDraggable = false;

    /** All available Succulent__c[]. */
    @track succulents = [];

    /** Current page in the succulent list. */
    @track pageNumber = 1;

    /** The number of items on a page. */
    @track pageSize;

    /** The total number of items matching the selection. */
    @track totalItemCount = 0;

    /** JSON.stringified version of filters to pass to apex */
    filters = '{}';

    @wire(CurrentPageReference) pageRef;

    /**
     * Load the list of available succulents.
     */
    @wire(getSucculents, { filters: '$filters', pageNumber: '$pageNumber' })
    succulents;

    connectedCallback() {
        registerListener('filterChange', this.handleFilterChange, this);
    }

    handleSucculentSelected(event) {
        fireEvent(this.pageRef, 'succulentSelected', event.detail);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.handleFilterChange({ searchKey });
    }

    handleFilterChange(filters) {
        this.filters = JSON.stringify(filters);
        this.pageNumber = 1;
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
    }
}
