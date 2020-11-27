import { useEffect, useReducer } from 'react';

import dataReducer, {
  SET_USERS
} from '../reducers/data_reducer';

import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
      users: [],
      loading: true,
  });
  useEffect(() => {
      
  }, []);

  return {
      state,
      dispatch,
  };
};

export default useApplicationData;