import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useTypedSelector = useSelector.withTypes<RootState>();
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
