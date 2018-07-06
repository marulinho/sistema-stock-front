import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IniciarSesionService extends RestBaseService{
  private loginUrl = '/iniciarSesion/';

  constructor(private http: Http) {super();}

  login(username: string, password: string): Promise<Usuario> {
    const data = {
      'usuario': username,
      'contrasenia': password
    };

    return this.http.post(IniciarSesionService.serverUrl +this.loginUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as Usuario;

      })
      .catch(this.handleError);
  }
  
}

export interface Usuario {
  resultado:boolean;
  datos_operacion;
  
}



