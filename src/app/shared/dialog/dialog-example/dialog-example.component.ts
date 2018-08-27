import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../Datos_Sistema/constantes';

@Component({
  selector:"app-dialog",
  templateUrl: './dialog-example.component.html',
  styleUrls: [
    './dialog-example.component.scss'
  ]
})
export class DialogExampleComponent implements OnInit {
  title:string;
  description:string;
  option1:string;
  option2:string;
  descipcion_lista_precio : string;
  label_precio_compra = Constantes.LABEL_PRECIO_COMPRA;
  label_precio_venta = Constantes.LABEL_PRECIO_VENTA;
  label_peso = Constantes.LABEL_PESO;
  label_margen_ganancia = Constantes.LABEL_MARGEN_GANANCIA;
  label_cantidad_productos = Constantes.LABEL_CANTIDAD;
  precio_compra: number;
  margen_ganancia: number;
  cantidad: number = 0;
  precio_compra_modificar: boolean = false;
  
  constructor(private dialogRef: MdDialogRef<DialogExampleComponent>) {
  }

  ngOnInit(): void {
  }

  getModificiarPrecioCompra(){
    return this.precio_compra_modificar;
  }

}
