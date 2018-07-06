import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { RestBaseService } from '../../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrarUsuarioService extends RestBaseService{
  private loginUrl = '/registrarUsuario/';

  


  constructor(private http: Http) {super();}

  registrarUsuario(nombre:string,
                  apellido:string, 
                  usuario:string,
                  contrasenia:string): Promise<RespuestaRegistrar> {
    const data = {
      'nombre': nombre,
      'apellido': apellido,
      'usuario':usuario,
      'contrasenia':contrasenia,
      'id_pregunta':1,
      'respuesta_descripcion':1
      //'imagenUsuario':''
    };

    return this.http.put(RegistrarUsuarioService.serverUrl +this.loginUrl, JSON.stringify(data), this.getRestHeader())
      .toPromise()
      .then(response => {
        return response.json() as RespuestaRegistrar;
      })
      .catch(this.handleError);
  }

}

export interface RespuestaRegistrar {
  resultado: boolean;
  datos_operacion;

}



