import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

// REDUCER
export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, action) => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductPageActions.clearCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductPageActions.initializeCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductApiActions.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductApiActions.loadProductsFail, (state, action) => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductApiActions.updateProductSuccess, (state, action) => {
    const updatedProducts = state.products.map((item) =>
      item.id === action.product.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProducts,
      error: '',
      currentProductId: action.product.id,
    };
  }),
  on(ProductApiActions.updateProductFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductApiActions.addProductSuccess, (state, action) => {
    const updatedProducts = [...state.products, action.product];
    return {
      ...state,
      products: updatedProducts,
      error: '',
      currentProductId: action.product.id,
    };
  }),
  on(ProductApiActions.addProductFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductApiActions.deleteProductSuccess, (state, action) => {
    return {
      ...state,
      products: state.products.filter((p) => p.id !== action.productId),
      error: '',
      currentProductId: null,
    };
  }),
  on(ProductApiActions.deleteProductFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
