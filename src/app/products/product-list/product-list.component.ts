import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Input() displayCode: boolean;

  @Output() displayCodeChange = new EventEmitter<void>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() productWasSelected = new EventEmitter<Product>();

  productSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

  checkChanged() {
    this.displayCodeChange.emit();
  }

  newProduct() {
    this.initializeNewProduct.emit();
  }
}
