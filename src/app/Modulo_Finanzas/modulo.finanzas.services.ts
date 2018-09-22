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

    private obtenerRetirosURL = '/obtenerRetiros/';
    private obtenerRetiroIdURL = '/obtenerRetiroId/';
    private registrarRetiroURL = '/generarRetiroCapital/';
    private cancelarRetiroURL = '/cancelarRetiroCapital/';

    private registrarVentaURL = '/registrarVenta/';
    private cancelarVentaURL = '/cancelarVenta/';
    private cobrarVentaURL = '/cobrarVenta/';
    private cambiarEstadoVentaURL = '/cambiarEstadoVenta/';
    private obtenerVentasURL = '/obtenerVentas/';
    private obtenerVentaIdURL = '/obtenerVentaId/';

    private registrarRemitoURL = '/registrarRemito/';
    private cancelarRemitoURL = '/cancelarRemito/';
    private obtenerRemitosURL = '/obtenerRemitos/';
    private obtenerRemitoIdURL = '/obtenerRemitoId/';

    private generarMovimientoStockSalidaCapitalURL = '/generarMovimientoSalidaCapitalStock/';
    private generarMovimientoStockEntradaCapitalURL = '/generarMovimientoEntradaCapitalStock/';

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

    registrarCompra(usuario,descuento,lista_productos,lista_cantidad): Promise<Resultado> {
        const data = {
            "id_usuario":usuario,
            "descuento":descuento,
            "lista_productos":lista_productos,
            "cantidad_productos":lista_cantidad
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.registrarCompraURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }


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


    //RETIROS

    registrarRetiro(usuario,descripcion,total): Promise<Resultado> {
        const data = {
            "id_usuario":usuario,
            "descripcion":descripcion,
            "total":total
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.registrarRetiroURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }


    obtenerRetiros(): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerRetirosURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    obtenerRetiroId(codigo:number): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerRetiroIdURL +codigo+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cancelarRetiro(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cancelarRetiroURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }



    //VENTAS

    registrarVenta(usuario,descuento,lista_productos,lista_cantidad): Promise<Resultado> {
        const data = {
            "id_usuario":usuario,
            "descuento":descuento,
            "lista_productos":lista_productos,
            "cantidad_productos":lista_cantidad
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.registrarVentaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }


    obtenerVentas(): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerVentasURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    obtenerVentaId(codigo:number): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerVentaIdURL +codigo+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cancelarVenta(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cancelarVentaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cobrarVenta(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cobrarVentaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cambiarEstadoVenta(codigo:number, estado:string): Promise<Resultado> {
        const data = {
            'codigo':codigo,
            'estado':estado
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cambiarEstadoVentaURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }



    //REMITOS
    obtenerRemitos(): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerRemitosURL, this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    obtenerRemitoId(codigo:number): Promise<Resultado> {
        return this.http.get(ModuloFinanzasService.serverURL + this.obtenerRemitoIdURL +codigo+'/', this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    registrarRemito(usuario,lista_productos,lista_cantidad): Promise<Resultado> {
        const data = {
            "id_usuario":usuario,
            "lista_productos":lista_productos,
            "cantidad_productos":lista_cantidad
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.registrarRemitoURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as Resultado; })
            .catch(this.handleError);
    }

    cancelarRemito(codigo:number): Promise<Resultado> {
        const data = {
            'codigo':codigo
        }
        return this.http.put(ModuloFinanzasService.serverURL + this.cancelarRemitoURL, JSON.stringify(data), this.getRestHeader())
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

    generarMovimientoStockEntradaCapital(codigo:number): Promise<Resultado> {
        const data = {
            'codigo': codigo
        }
        return this.http.post(ModuloFinanzasService.serverURL + this.generarMovimientoStockEntradaCapitalURL, JSON.stringify(data), this.getRestHeader())
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