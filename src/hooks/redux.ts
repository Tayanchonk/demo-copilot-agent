/**
 * @fileoverview Typed Redux Hooks
 * 
 * Pre-typed versions of Redux hooks for use throughout the application.
 * These hooks provide full TypeScript support and autocomplete for
 * the app's specific state shape and dispatch types.
 * 
 * @author Demo Copilot Agent Team
 * @version 1.0.0
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

/**
 * Typed version of the useDispatch hook
 * 
 * Use this instead of the plain useDispatch hook to get proper
 * TypeScript support for async thunks and action creators.
 * 
 * @returns Typed dispatch function
 * 
 * @example
 * ```typescript
 * const dispatch = useAppDispatch();
 * dispatch(fetchProducts()); // Fully typed!
 * ```
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of the useSelector hook
 * 
 * Use this instead of the plain useSelector hook to get proper
 * TypeScript support and autocomplete for the app's state shape.
 * 
 * @example
 * ```typescript
 * const products = useAppSelector(state => state.products.products);
 * const loading = useAppSelector(state => state.products.loading);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;