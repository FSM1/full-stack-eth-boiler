
export interface IClient {

}

export class ApiClient implements IClient {
  private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
    this.http = http ? http : <any>window;
    this.baseUrl = baseUrl ? baseUrl : "https://localhost:3001";
  }

  GetApiInfo(): Promise<ApiInfoResponse> {
    let url_ = this.baseUrl + "/api/";
    url_ = url_.replace(/[?&]$/, "");

    let options_ = <RequestInit>{
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.process_GetApiInfo(_response);
    });

  }

  protected process_GetApiInfo(response: Response): Promise<ApiInfoResponse> {
    const status = response.status;
    let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
    if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <ApiInfoResponse>JSON.parse(_responseText, this.jsonParseReviver);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      });
    }
    return Promise.resolve<ApiInfoResponse>(<any>null);
  }

}

export interface ApiInfoResponse {
  name: string
  version: string,
  description: string,
}

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
  if (result !== null && result !== undefined)
    throw result;
  else
    throw new ApiException(message, status, response, headers, null);
}