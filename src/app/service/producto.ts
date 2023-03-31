export class Producto {
    nom: string = '';
    apellido: string = '';
    edad: number = 0;
  
    constructor(nom: string, apellido: string, edad: number) {
      this.nom = nom;
      this.apellido = apellido;
      this.edad = edad;
    }
  
    // Métodos de la clase
    getNombreCompleto(): string {
      return `${this.nom} ${this.apellido}`;
    }
  
    esMayorDeEdad(): boolean {
      return this.edad >= 18;
    }
  }
  