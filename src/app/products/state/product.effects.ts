import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductApiActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductApiActions.loadProductsFail({ error })))
        )
      )
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.addProduct),
      concatMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => ProductApiActions.addProductSuccess({ product })),
          catchError((error) => of(ProductApiActions.addProductFail({ error })))
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductApiActions.updateProductSuccess({ product })),
          catchError((error) => of(ProductApiActions.updateProductFail({ error })))
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.product.id).pipe(
          map(() =>
            ProductApiActions.deleteProductSuccess({
              productId: action.product.id,
            })
          ),
          catchError((error) => of(ProductApiActions.deleteProductFail({ error })))
        )
      )
    );
  });
}
