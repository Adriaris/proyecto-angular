import { Component, OnInit } from '@angular/core';
import { ProductosService } from './service/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  providers: [ProductosService]
})
export class AppComponent implements OnInit{
  title = 'proyecto-angular';

  productos:any;

  constructor(private producteService:ProductosService){

  }
  ngOnInit():void{
    this.productos = this.producteService.getProductos();
  }
}
