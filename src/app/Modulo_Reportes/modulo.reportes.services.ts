import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestBaseService } from '../tools/rest.tools';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuloReportesService extends RestBaseService {

    private obtenerReporteStockMinimoURL = '/obtenerReporteStockMinimo/';
    private obtenerReporteComprasVentasURL = '/obtenerReporteComprasVentas/';
    private obtenerReporteGananciaProductosURL = '/obtenerReporteGananciaProducto/';
    

    constructor(private http: Http) { super(); }

    
    obtenerReporteStockMinimo(cantidad): Promise<Resultado> {
        const data = {
            "cantidad_productos":cantidad
        }
        return this.http.post(ModuloReportesService.serverURL + this.obtenerReporteStockMinimoURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Resultado;
                })
            .catch(this.handleError);
    }
    
    obtenerReporteComprasVentas(fecha_desde, fecha_hasta): Promise<Resultado> {
        const data = {
            "fecha_desde":fecha_desde,
            "fecha_hasta":fecha_hasta
        }
        return this.http.post(ModuloReportesService.serverURL + this.obtenerReporteComprasVentasURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Resultado;
                })
            .catch(this.handleError);
    }

    obtenerReporteGananciaProductos(fecha_desde, fecha_hasta): Promise<Resultado> {
        const data = {
            "fecha_desde":fecha_desde,
            "fecha_hasta":fecha_hasta
        }
        return this.http.post(ModuloReportesService.serverURL + this.obtenerReporteGananciaProductosURL, JSON.stringify(data), this.getRestHeader())
            .toPromise()
            .then(response => {
                return response.json() as Resultado;
                })
            .catch(this.handleError);
    }

    

    
}   

export interface Resultado {
    resultado: boolean;
    detalle_operacion;
    datos_operacion;
}