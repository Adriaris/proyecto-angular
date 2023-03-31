import { Injectable } from "@angular/core";
import { Producto } from "./producto";

@Injectable()
export class ProductosService{
    productos = [
        new Producto("ejemplo nombre1", "apellido", 18),
        new Producto("ejemplo nombre2", "apellido2", 41),
        new Producto("ejemplo nombre3", "apellido3", 89),

      ]
      constructor(){

      }
      getProductos(){
        return this.productos;
      }
      getProducto(id_producto:number){
        this.productos[id_producto]
      }
}