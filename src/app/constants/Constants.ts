/**
* Class responsible for the Giphy API URL, endpoints and keys
*/
export class Constants
{

  	public static get API_KEY (): string 
  	{ 
  		return 'QrOqc4rBxBHkypdODTxv3mY4iY5jLAWS'; 
  	};

    public static get API_MAX_REGISTERS (): string 
    {
      return '?limit=300';
    };

    public static get API_SEARCH_PREFIX (): string 
    {
      return '&api_key='; 
    };

    public static get API_TRENDING_PREFIX (): string 
    {
      return '?api_key='; 
    };


  	public static get API_URL (): string 
  	{ 
  		return 'http://api.giphy.com/v1'; 
  	};

  	public static get GET_SEARCH_ENDPOINT (): string 
  	{ 
  		return '/gifs/search'; 
  	};

  	public static get GET_SEARCH_PREFIX (): string 
  	{
  		return '?q='; 
  	};

  	public static get GET_TRENDING_ENDPOINT (): string 
  	{ 
  		return '/gifs/trending'; 
  	};

}