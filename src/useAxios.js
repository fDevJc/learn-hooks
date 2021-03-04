import defalutAxios from 'axios';
import React, { useState, useEffect } from 'react';

const useAxios = (opts, axiosInstance = defalutAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  if (!opts.url) {
    return;
  }

  useEffect(() => {
    axiosInstance(opts).then((data) => {
      setState({
        ...state,
        loading: false,
        data: data,
      });
    });
  }, []);

  return state;
};

export default useAxios;
