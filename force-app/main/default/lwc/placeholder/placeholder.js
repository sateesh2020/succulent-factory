import { LightningElement, api, track } from 'lwc';

/** Static Resources. */
import SUCCULENTS_ASSETS_URL from '@salesforce/resourceUrl/logo';

export default class Placeholder extends LightningElement {
    @api message;

    /** Url for bike logo. */
    @track logoUrl = SUCCULENTS_ASSETS_URL;
    //@track logoUrl = '';
}
