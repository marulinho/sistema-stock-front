import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuloSeguridadService extends RestBaseService {

    private loginUrl = '/iniciarSesion/';
    private registarUrl = '/registrarUsuario/';
    private obtenerUsuarioUrl = '/obtenerUsuario/';
    private obtenerUsuarioIdUrl = '/obtenerUsuarioId/';
    private recuperarCuentaUrl = '/recuperarCuenta/';

    private preguntasUrl = '/buscarPreguntas/';
    private preguntasDescripcionUrl = '/obtenerPreguntaDescripcion/';
    private preguntaIdUrl = '/obtenerPreguntaId/';

    constructor(private http: Http) { super(); }

    login(username: string, password: string): Promise<Usuario> {
        const data = {
            'usuario': username,
            'contrasenia': password
        };

        return this.http.post(ModuloSeguridadService.serverUrl + this.loginUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Usuario;

            })
            .catch(this.handleError);
    }

    registrarUsuario(nombre: string, apellido: string, usuario: string,contrasenia: string, id_pregunta:number, respuesta_descripcion:string): Promise<RespuestaRegistrar> {
        const data = {
            'nombre': nombre,
            'apellido': apellido,
            'usuario': usuario,
            'contrasenia': contrasenia,
            'id_pregunta': id_pregunta,
            'respuesta_descripcion': respuesta_descripcion
        };
        return this.http.post(ModuloSeguridadService.serverUrl + this.registarUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as RespuestaRegistrar;
            })
            .catch(this.handleError);
    }

    obtenerUsuario(usuario:string): Promise<Usuario> {
        return this.http.get(ModuloSeguridadService.serverUrl + this.obtenerUsuarioUrl +usuario+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Usuario; })
            .catch(this.handleError);
    }

    obtenerUsuarioId(id_usuario:number): Promise<Usuario> {
        return this.http.get(ModuloSeguridadService.serverUrl + this.obtenerUsuarioIdUrl +id_usuario+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Usuario; })
            .catch(this.handleError);
    }

    recuperarCuenta(id_usuario: number, id_pregunta: number, respuestaPregunta:string, contrasenia:string): Promise<ResultadoNone> {
        const data = {
            'id_usuario': id_usuario,
            'id_pregunta': id_pregunta,
            'respuesta_descripcion': respuestaPregunta,
            'contrasenia_nueva': contrasenia
        };

        return this.http.put(ModuloSeguridadService.serverUrl + this.recuperarCuentaUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }


    obtenerPreguntasSeguridad(): Promise<PreguntaSeguridad> {
        return this.http.get(ModuloSeguridadService.serverUrl + this.preguntasUrl, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as PreguntaSeguridad; })
            .catch(this.handleError);
    }

    obtenerPreguntaId(id_pregunta:number): Promise<PreguntaSeguridad> {
        return this.http.get(ModuloSeguridadService.serverUrl + this.preguntaIdUrl +id_pregunta+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as PreguntaSeguridad; })
            .catch(this.handleError);
    }

    buscarPreguntaDescripcion(descripcion:string): Promise<PreguntaSeguridad> {
        const data = {
            'descripcion': descripcion
        };
        return this.http.post(ModuloSeguridadService.serverUrl + this.preguntasDescripcionUrl, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as PreguntaSeguridad;

            })
            .catch(this.handleError);
    }

}

export interface Usuario {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface PreguntaSeguridad {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface RespuestaRegistrar {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface ResultadoNone {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}
