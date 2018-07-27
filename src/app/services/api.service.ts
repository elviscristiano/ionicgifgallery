import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Constants } from '../constants/Constants';

@Injectable()

/**
* Service responsible for the interations with the Giphy API
*/
export class ApiService
{
	private apiKey: String;
	private baseUrl: String;
	private http: any;

	/**
	 * Constructor 
	 *
	 * @param http Http
	 */
	constructor(http: Http)
	{
		this.apiKey = Constants.API_KEY;
		this.baseUrl = Constants.API_URL;
		this.http = http;
	}

	/**
	 * Polymorphic function that hit different endpoints  
	 *
	 * @param endpoint string
	 * @param query string. Null when the endpoint doesn't need this second parameter
	 * @return JSON object
	 */
	getEndpointResponse(endpoint, query = null)
	{
		const endpointPath = {
			"search" : {
				"apiKeyPrefix" : Constants.API_SEARCH_PREFIX,
				"maxRegisters" : Constants.API_MAX_REGISTERS,
				"path" : Constants.GET_SEARCH_ENDPOINT,
				"searchPrefix" : Constants.GET_SEARCH_PREFIX
			},
			"trending" : {
				"apiKeyPrefix" : Constants.API_TRENDING_PREFIX,
				"maxRegisters" : Constants.API_MAX_REGISTERS,
				"path" : Constants.GET_TRENDING_ENDPOINT
			}
		};
		endpoint = endpointPath[endpoint];
		let querySearch = (query) ? endpoint.searchPrefix + query.target.value.replace(/\s+/g,'-') : '';
		return this.http.get(this.baseUrl + endpoint.path + querySearch + endpoint.apiKeyPrefix + this.apiKey)
			.map(res => res.json())
			.catch(this.errorHandler);
	}

    /**
     * Error handling
     *
     * @param error (any)
     */

	errorHandler(error: any)
	{
		return Observable.throw(error.message || 'Server error!');
	}
}