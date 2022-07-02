import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProductsSuccess = createAction(
  '[Product API] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFail = createAction(
  '[Product API] Load Fail',
  props<{ error: string }>()
);

export const addProductSuccess = createAction(
  '[Product API] Add Success',
  props<{ product: Product }>()
);

export const addProductFail = createAction(
  '[Product API] Add Fail',
  props<{ error: string }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update Success',
  props<{ product: Product }>()
);

export const updateProductFail = createAction(
  '[Product API] Update Fail',
  props<{ error: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Success',
  props<{ productId: number }>()
);

export const deleteProductFail = createAction(
  '[Product API] Delete Fail',
  props<{ error: string }>()
);
