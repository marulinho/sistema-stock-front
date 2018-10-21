import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-style';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  columns: Number;
  abecedario = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet = XLSX.utils.json_to_sheet(json);
    //this.wrapAndCenterCellHeader(worksheet.A1);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSXStyle.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public setColumn(column){
    this.columns = column;
  }

  private wrapAndCenterCellHeader(cell) {
    const wrapAndCenterCellStyle = { 
      alignment: { 
        wrapText: true, 
        vertical: 'center', 
        horizontal: 'center' },
      font:{
        bold:true,
        sz:12
      },
      border:{
        top: { style: "thin", color: "FFFFAA00"},
        bottom: { style: "thin", color: "FFFFAA00"},
        left: { style: "thin", color: "FFFFAA00"},
        right: { style: "thin", color: "FFFFAA00"}
      }
      };
    this.setCellStyle(cell, wrapAndCenterCellStyle);
    }

  private setCellStyle(cell, style: {}) {
    cell.s = style;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}