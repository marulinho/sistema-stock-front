import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Constantes } from '../../../../../Datos_Sistema/constantes';

@Component({
  selector:"app-dialog-editar-cantidad-remito",
  templateUrl: './dialog.editar.cantidad.remito.component.html',
  styleUrls: [
    './dialog.editar.cantidad.remito.component.scss'
  ]
})
export class DialogEditarCantidadRemitoComponent implements OnInit {
  title:string;
  description:string;
  option1:string;
  option2:string;
  label_cantidad_productos = Constantes.LABEL_CANTIDAD;
  label_stock_deposito = Constantes.LABEL_STOCK_DEPOSITO;
  label_error_cantidad_producto_remito = Constantes.ERROR_CANTIDAD_INSUFICIENTE;
  stock_deposito: number;
  cantidad: number;
  
  constructor(private dialogRef: MdDialogRef<DialogEditarCantidadRemitoComponent>) {
  }

  ngOnInit(): void {
  }
}
