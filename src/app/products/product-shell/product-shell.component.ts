import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductPageActions } from '../state/actions';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct)
    this.displayCode$ = this.store.select(getShowProductCode);
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({currentProductId: product.id}));
    // this.productService.changeSelectedProduct(product);
  }

  createProduct(product: Product) {
    this.store.dispatch(ProductPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(ProductPageActions.deleteProduct({ product }));
  }

  clearCurrentProduct() {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
  }
}
