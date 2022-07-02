import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import { ProductState } from './product.reducer';

// STATES
export interface State extends AppState.State {
  products: ProductState;
}

const emptyProduct: Product = {
  id: 0,
  productCode: 'New',
  productName: '',
  description: '',
  starRating: 0,
};

// SELECTORS
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return emptyProduct;
    }

    return currentProductId
      ? state.products.find((p) => p.id === currentProductId)
      : null;
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);
