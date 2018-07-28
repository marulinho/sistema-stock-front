import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuloConfiguracionService extends RestBaseService {

    private obtenerCategoriasURL = '/obtenerCategorias/';
    private obtenerCategoriaIdURL = '/obtenerCategoriaId/';
    private registrarCategoriaURL = '/registrarCategoria/';
    private modificarCategoriaURL = '/modificarCategoria/';
    private eliminarCategoriaURL = '/eliminarCategoria/';
    private obtenerSubCategoriaCategoriaIdURL = '/obtenerSubCategoriaCategoria/';
    private obtenerSubCategoriaNoCategoriaIdURL = '/obtenerSubCategoriaNoCategoria/'
    private asignarSubCategoriaCategoriaURL = '/asignarSubcategoriaCategoria/';
    private desasignarSubCategoriaCategoriaURL = '/desasignarSubcategoriaCategoria/';
    private desasignarProductoCategoriaURL = '/desasignarProductoCategoria/';


    private obtenerSubCategoriasURL = '/obtenerSubCategorias/';
    private obtenerSubCategoriaIdURL = '/obtenerSubCategoriaId/';
    private registrarSubCategoriaURL = '/registrarSubCategoria/';
    private modificarSubCategoriaURL = '/modificarSubCategoria/';
    private eliminarSubCategoriaURL = '/eliminarSubCategoria/';
    private desasignarProductoSubCategoriaURL = '/desasignarProductoSubCategoria/';

    private obtenerProductosURL = '/obtenerProductos/';
    private obtenerProductoIdURL = '/obtenerProductoId/';
    private registrarProductoURL = '/registrarProducto/';
    private modificarProductoURL = '/modificarProducto/';
    private eliminarProductoURL = '/eliminarProducto/';
    private obtenerProductoCategoriaIdURL = '/obtenerProductoCategoria/';
    private obtenerProductoNoCategoriaIdURL = '/obtenerProductoNoCategoria/'
    private asignarProductoCategoriaURL = '/asignarProductoCategoria/';
    private obtenerProductoSubCategoriaIdURL = '/obtenerProductoSubCategoria/';
    private obtenerProductoNoSubCategoriaIdURL = '/obtenerProductoNoSubCategoria/';
    private asignarProductoSubCategoriaURL = '/asignarProductoSubCategoria/';

    private obtenerUnidadesMedidasURL = '/obtenerUnidadMedida/';
   

    constructor(private http: Http) { super(); }

    //CATEGORIAS
    obtenerCategorias(): Promise<Categoria> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerCategoriasURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Categoria; })
            .catch(this.handleError);
    }

    obtenerCategoriaId(id_categoria:number): Promise<Categoria> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerCategoriaIdURL +id_categoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Categoria; })
            .catch(this.handleError);
    }

    registrarCategoria(nombre: string, descripcion:string): Promise<ResultadoNone> {
        const data = {
            'nombre': nombre,
            'descripcion': descripcion
        };

        return this.http.post(ModuloConfiguracionService.serverURL + this.registrarCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    modificarCategoria(codigo: number, nombre: string, descripcion:string): Promise<ResultadoNone> {
        const data = {
            'codigo': codigo,
            'nombre': nombre,
            'descripcion': descripcion
        };

        return this.http.put(ModuloConfiguracionService.serverURL + this.modificarCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    eliminarCategoria(codigo: number): Promise<ResultadoNone> {
        const data = {
            'codigo': codigo
        };

        return this.http.put(ModuloConfiguracionService.serverURL + this.eliminarCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    desasignarProductoCategoria(id_categoria: number, id_producto:number): Promise<ResultadoNone> {
        const data = {
            'id_categoria': id_categoria,
            'id_producto': id_producto
        };
        return this.http.put(ModuloConfiguracionService.serverURL + this.desasignarProductoCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    desasignarSubCategoriaCategoria(id_categoria: number, id_subcategoria:number): Promise<ResultadoNone> {
        const data = {
            'id_categoria': id_categoria,
            'id_subcategoria': id_subcategoria
        };
        return this.http.put(ModuloConfiguracionService.serverURL + this.desasignarSubCategoriaCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    //SUB_CATEGORIAS

    obtenerSubCategorias(): Promise<SubCategoria> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerSubCategoriasURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as SubCategoria; })
            .catch(this.handleError);
    }

    obtenerSubCategoriaId(id_subcategoria:number): Promise<SubCategoria> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerSubCategoriaIdURL +id_subcategoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as SubCategoria; })
            .catch(this.handleError);
    }

    registrarSubCategoria(nombre: string, descripcion:string): Promise<ResultadoNone> {
        const data = {
            'nombre': nombre,
            'descripcion': descripcion
        };

        return this.http.post(ModuloConfiguracionService.serverURL + this.registrarSubCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    modificarSubCategoria(codigo: number, nombre: string, descripcion:string): Promise<ResultadoNone> {
        const data = {
            'codigo': codigo,
            'nombre': nombre,
            'descripcion': descripcion
        };

        return this.http.put(ModuloConfiguracionService.serverURL + this.modificarSubCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    eliminarSubCategoria(codigo: number): Promise<ResultadoNone> {
        const data = {
            'codigo': codigo
        };

        return this.http.put(ModuloConfiguracionService.serverURL + this.eliminarSubCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    obtenerSubCategoriasCategoriaId(id_categoria:number): Promise<SubCategoria> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerSubCategoriaCategoriaIdURL +id_categoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as SubCategoria; })
            .catch(this.handleError);
    }

    obtenerSubCategoriasNoCategoriaId(id_categoria:number): Promise<SubCategoria> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerSubCategoriaNoCategoriaIdURL +id_categoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as SubCategoria; })
            .catch(this.handleError);
    }

    asignarSubCategoriaCategoria(id_categoria: number, id_subcategoria:number): Promise<ResultadoNone> {
        const data = {
            'id_categoria': id_categoria,
            'id_subcategoria': id_subcategoria
        };
        return this.http.post(ModuloConfiguracionService.serverURL + this.asignarSubCategoriaCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    desasignarProductoSubCategoria(id_subcategoria: number, id_producto:number): Promise<ResultadoNone> {
        const data = {
            'id_subcategoria': id_subcategoria,
            'id_producto': id_producto
        };
        return this.http.put(ModuloConfiguracionService.serverURL + this.desasignarProductoSubCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    //PRODUCTOS
    obtenerProductos(): Promise<Producto> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerProductosURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Producto; })
            .catch(this.handleError);
    }

    obtenerProductoId(id_producto:number): Promise<Producto> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerProductoIdURL +id_producto+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Producto; })
            .catch(this.handleError);
    }

    registrarProducto(nombre: string, marca:string, medida:number, unidad_medida:number): Promise<ResultadoNone> {
        const data = {
            'nombre': nombre,
            'marca': marca,
            'medida':medida,
            'id_unidad_medida':unidad_medida
        };

        return this.http.post(ModuloConfiguracionService.serverURL + this.registrarProductoURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }
    modificarProducto(codigo: number, nombre: string, marca:string, id_unidad_medida:number, medida:number): Promise<ResultadoNone> {
        const data = {
            'codigo':codigo,
            'nombre': nombre,
            'marca': marca,
            'medida':medida,
            'id_unidad_medida':id_unidad_medida
        };

        return this.http.put(ModuloConfiguracionService.serverURL + this.modificarProductoURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    eliminarProducto(codigo: number): Promise<ResultadoNone> {
        const data = {
            'codigo': codigo
        };

        return this.http.put(ModuloConfiguracionService.serverURL + this.eliminarProductoURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    obtenerProductosCategoriaId(id_categoria:number): Promise<Producto> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerProductoCategoriaIdURL +id_categoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Producto; })
            .catch(this.handleError);
    }

    obtenerProductosNoCategoriaId(id_categoria:number): Promise<Producto> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerProductoNoCategoriaIdURL +id_categoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Producto; })
            .catch(this.handleError);
    }

    asignarProductoCategoria(id_categoria: number, id_producto:number): Promise<ResultadoNone> {
        const data = {
            'id_categoria': id_categoria,
            'id_producto': id_producto
        };
        return this.http.post(ModuloConfiguracionService.serverURL + this.asignarProductoCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }

    obtenerProductosSubCategoriaId(id_subcategoria:number): Promise<Producto> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerProductoSubCategoriaIdURL +id_subcategoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Producto; })
            .catch(this.handleError);
    }

    obtenerProductosNoSubCategoriaId(id_subcategoria:number): Promise<Producto> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerProductoNoSubCategoriaIdURL +id_subcategoria+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Producto; })
            .catch(this.handleError);
    }

    asignarProductoSubCategoria(id_subcategoria: number, id_producto:number): Promise<ResultadoNone> {
        const data = {
            'id_subcategoria': id_subcategoria,
            'id_producto': id_producto
        };
        return this.http.post(ModuloConfiguracionService.serverURL + this.asignarProductoSubCategoriaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as ResultadoNone;

            })
            .catch(this.handleError);
    }


    //UNIDADES MEDIDAS

    obtenerUnidadesMedidas(): Promise<UnidadMedida> {
        return this.http.get(ModuloConfiguracionService.serverURL + this.obtenerUnidadesMedidasURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as UnidadMedida; })
            .catch(this.handleError);
    }
}

export interface Categoria {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface SubCategoria {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface Producto {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface UnidadMedida {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}

export interface ResultadoNone {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}