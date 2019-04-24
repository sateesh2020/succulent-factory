import { LightningElement, api, track } from 'lwc';

/**
 * A presentation component to display a Succulent__c sObject. The provided
 * Succulent__c data must contain all fields used by this component.
 */
export default class succulentTile extends LightningElement {
    /** Whether the tile is draggable. */
    @api draggable;

    _succulent;
    /** Succulent__c to display. */
    @api
    get succulent() {
        return this._succulent;
    }
    set succulent(value) {
        this._succulent = value;
        this.pictureUrl = value.Image__c;
        this.name = value.Name;
    }

    /** succulent__c field values to display. */
    @track pictureUrl;
    @track name;

    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.succulent.Id
        });
        this.dispatchEvent(selectedEvent);
    }

    handleDragStart(event) {
        event.dataTransfer.setData('succulent', JSON.stringify(this.succulent));
    }
}
