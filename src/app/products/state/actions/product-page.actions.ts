import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize Current Product'
);

export const loadProducts = createAction('[Product Page] Load');

export const addProduct = createAction(
  '[Product Page] Add',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product Page] Update',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product Page] Delete',
  props<{ product: Product }>()
);
