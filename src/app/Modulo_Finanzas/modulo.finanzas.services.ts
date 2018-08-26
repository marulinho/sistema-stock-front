import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuloFinanzasService extends RestBaseService {

    private obtenerUltimaCajaURL = '/obtenerCaja/';
    private abrirCajaURL = '/abrirCaja/';
    private cerrarCajaURL = '/cerrarCaja/';
    private generarDetalleCajaURL = '/generarDetalleCaja/';
    
    private registrarCompraURL = '/registrarCompra/';
    private cancelarCompraURL = '/cancelarCompra/';
    private pagarCompraURL = '/pagarCompra/';
    private cambiarEstadoCompraURL = '/cambiarEstadoCompra/';
    private obtenerComprasURL = '/obtenerCompras/';
    private obtenerCompraIdURL = '/obtenerCompraId/';

    private generarMovimientoStockSalidaCapitalURL = '/generarMovimientoSalidaCapitalStock/';

    constructor(private http: Http) { super(); }

    //CAJA
    obtenerUltimaCaja(): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerUltimaCajaURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }
    
    abrirCaja(): Promise<Resultado> {
        const data = {};
    
        return this.http.post(ModuloFinanzasService.serverURL + this.abrirCajaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Resultado;
                })
            .catch(this.handleError);
    }

    cerrarCaja(): Promise<Resultado> {
        const data = {};
    
        return this.http.put(ModuloFinanzasService.serverURL + this.cerrarCajaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Resultado;
                })
            .catch(this.handleError);
    }

    generarDetalleCaja(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.generarDetalleCajaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    //COMPRAS
    obtenerCompras(): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerComprasURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    obtenerCompraId(codigo:number): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerCompraIdURL +codigo+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cancelarCompra(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cancelarCompraURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    pagarCompra(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.pagarCompraURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cambiarEstadoCompra(codigo:number, estado:string): Promise<Resultado> {
        const data = {
            'codigo':codigo,
            'estado':estado
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cambiarEstadoCompraURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    //MOVIMIENTO CAPITAL

    generarMovimientoStockSalidaCapital(codigo:number): Promise<Resultado> {
        const data = {
            'codigo': codigo
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.generarMovimientoStockSalidaCapitalURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

}   

export interface Resultado {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}