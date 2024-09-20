import { Component, inject } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductoInterface } from '../../interfaces/producto-interface';
import { FormsModule } from '@angular/forms';
import { SiempreMayusculasPipe } from "../../pipes/siempre-mayusculas.pipe";

@Component({
  selector: 'app-cargar-productos',
  standalone: true,
  imports: [FormsModule, SiempreMayusculasPipe],
  templateUrl: './cargar-productos.component.html',
  styleUrls: ['./cargar-productos.component.css']
})
export class CargarProductosComponent   
 {
  private firestore: Firestore = inject(Firestore);
  productos$: Observable<ProductoInterface[]>;
  productosCollection: CollectionReference;

  product: ProductoInterface = {
    id: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: ''
  };

  constructor( ) {
    this.productosCollection = collection(this.firestore, '/Productos/Parker/Pruebas');
  }

  resetForm() {
    this.product = {
      id: '',
      nombre: '',
      precio: 0,
      descripcion: '',
      imagen: ''
    };
  }

  addProduct() {
    if (!this.product.nombre ||
        !this.product.precio ||
        !this.product.descripcion ||
        !this.product.imagen) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    addDoc(this.productosCollection, this.product)
      .then((documentReference: DocumentReference) => {
        console.log('Producto agregado exitosamente:', documentReference.id);
        alert('Producto agregado exitosamente');
      })
      .catch((error) => {
        console.error('Error al agregar el producto:', error);
        alert('Error al agregar el producto');
      });

    
  }
}
