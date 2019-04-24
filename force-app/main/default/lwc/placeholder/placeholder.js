import { LightningElement, api, track } from 'lwc';

/** Static Resources. */
//import SUCCULENTS_ASSETS_URL from '@salesforce/resourceUrl/bike_assets';

export default class Placeholder extends LightningElement {
    @api message;

    /** Url for bike logo. */
    // @track logoUrl = SUCCULENTS_ASSETS_URL + '/logo.jpg';
    @track logoUrl = '';
}
