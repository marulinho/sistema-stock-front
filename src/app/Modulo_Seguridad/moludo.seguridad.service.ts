import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuloSeguridadService extends RestBaseService {

    private loginURL = '/iniciarSesion/';
    private finalizarSesionURL = '/finalizarSesion/';
    private registarURL = '/registrarUsuario/';
    private obtenerUsuarioURL = '/obtenerUsuario/';
    private obtenerUsuarioIdURL = '/obtenerUsuarioId/';
    private recuperarCuentaURL = '/recuperarCuenta/';
    private modificarUsuarioURL = '/modificarUsuario/';
    private modificarContraseniaURL = '/modificarContrasenia/';
    private eliminarUsuarioURL = '/eliminarUsuario/';

    private preguntasURL = '/buscarPreguntas/';
    private preguntasDescripcionURL = '/obtenerPreguntaDescripcion/';
    private preguntaIdURL = '/obtenerPreguntaId/';

    private respuestaPreguntaUsuarioURL  ='/obtenerRespuestaUsuarioPregunta/';

    constructor(private http: Http) { super(); }

    //USUARIOS

    login(username: string, password: string): Promise<Usuario> {
        const data = {
            'usuario': username,
            'contrasenia': password
        };

        return this.http.post(ModuloSeguridadService.serverURL + this.loginURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Usuario;

            })
            .catch(this.handleError);
    }

    finalizarSesion(id_usuario: number): Promise<ResultadoNone> {
        const data = {
            'id_usuario': id_usuario
        };
        return this.http.post(ModuloSeguridadService.serverURL + this.finalizarSesionURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;
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
        return this.http.post(ModuloSeguridadService.serverURL + this.registarURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as RespuestaRegistrar;
            })
            .catch(this.handleError);
    }

    obtenerUsuario(usuario:string): Promise<Usuario> {
        return this.http.get(ModuloSeguridadService.serverURL + this.obtenerUsuarioURL +usuario+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Usuario; })
            .catch(this.handleError);
    }

    obtenerUsuarioId(id_usuario:number): Promise<Usuario> {
        return this.http.get(ModuloSeguridadService.serverURL + this.obtenerUsuarioIdURL +id_usuario+'/', this.getRestHeader())
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

        return this.http.put(ModuloSeguridadService.serverURL + this.recuperarCuentaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    modificarUsuario(id_usuario: number, nombre: string, apellido:string, respuestaPregunta: string): Promise<ResultadoNone> {
        const data = {
            'id_usuario': id_usuario,
            'nombre': nombre,
            'apellido': apellido,
            'respuesta_descripcion': respuestaPregunta
        };

        return this.http.put(ModuloSeguridadService.serverURL + this.modificarUsuarioURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    modificarContrasenia(id_usuario: number, passwordActual: string, passwordNueva:string): Promise<ResultadoNone> {
        const data = {
            'id_usuario': id_usuario,
            'contrasenia_actual': passwordActual,
            'contrasenia_nueva': passwordNueva
        };

        return this.http.put(ModuloSeguridadService.serverURL + this.modificarContraseniaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    eliminarUsuario(id_usuario: number): Promise<ResultadoNone> {
        const data = {
            'id_usuario': id_usuario
        };

        return this.http.put(ModuloSeguridadService.serverURL + this.eliminarUsuarioURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    //PREGUNTAS

    obtenerPreguntasSeguridad(): Promise<PreguntaSeguridad> {
        return this.http.get(ModuloSeguridadService.serverURL + this.preguntasURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as PreguntaSeguridad; })
            .catch(this.handleError);
    }

    obtenerPreguntaId(id_pregunta:number): Promise<PreguntaSeguridad> {
        return this.http.get(ModuloSeguridadService.serverURL + this.preguntaIdURL +id_pregunta+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as PreguntaSeguridad; })
            .catch(this.handleError);
    }

    buscarPreguntaDescripcion(descripcion:string): Promise<PreguntaSeguridad> {
        const data = {
            'descripcion': descripcion
        };
        return this.http.post(ModuloSeguridadService.serverURL + this.preguntasDescripcionURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as PreguntaSeguridad;

            })
            .catch(this.handleError);
    }

    //RESPUESTA

    obtenerRespuestaPreguntaUsuario(id_usuario:number,id_pregunta:number): Promise<RespuestaSeguridad> {
        return this.http.get(ModuloSeguridadService.serverURL + this.respuestaPreguntaUsuarioURL +id_usuario+'/'+id_pregunta+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as RespuestaSeguridad; })
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

export interface RespuestaSeguridad {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}