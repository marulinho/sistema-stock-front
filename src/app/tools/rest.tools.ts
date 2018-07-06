import { Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import { environment } from '../../environments/environment';
import { HttpRequest } from 'selenium-webdriver/http';

export class RestBaseService {
  public static serverUrl = environment.serverBase;

  protected handleError(error: Response | any) {
/*    if (error && (error.status == 401 || error.status == 0) && window.location.pathname != "/") {
      window.location.assign(RestBaseService.serverUrl);
    }*/

    let errMsg: string;
    if (error instanceof Response) {
      console.log(error);
      const body = error.json() || '';
      return Promise.reject(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
      return Promise.reject(errMsg);
    }
  }

  protected getRestHeader(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append( 'Access-Control-Allow-Origin', '*' );        
    //headers.getAll( 'set-cookie' );        
    const options = new RequestOptions({ headers: headers, withCredentials:true} );
    return options;
  }
}
