import axios from './axios';
import { globalOptions } from '../../options/options'

const crossAnywhere = 'https://cors-anywhere.herokuapp.com/'

export const postApi = async (url, data, restAuth, Authorization) => {
  try {
    let endPoint = restAuth ? globalOptions.url + url : globalOptions.api + url
    console.log(endPoint, "here_is_your_end_point")
    let options = {
      method: 'POST',
      url: endPoint,
      headers: {},
      data: data
    }
    if (Authorization) {
      options.headers.Authorization = 'Token ' + JSON.parse(Authorization)
    }
    let response = await axios(options)
    return response
  }
  catch (error) {
    console.log(error, 'ERRROR',)
    return error
  }
};


export const putApi = async (url, data, restAuth, Authorization, patch) => {
  try {
    let endPoint = restAuth ? globalOptions.url + url : globalOptions.api + url
    console.log(endPoint, "here_is_your_end_point")
    let options = {
      method: patch ? patch : 'PUT',
      url: endPoint,
      headers: {},
      data: data
    }
    if (Authorization) {
      options.headers.Authorization = 'Token ' + JSON.parse(Authorization)
    }
    let response = await axios(options)
    return response
  }
  catch (error) {
    console.log(error, 'ERRROR',)
    return error
  }
};

export const deleteApi = async (url, data, restAuth, Authorization) => {
  try {
    let endPoint = restAuth ? globalOptions.url + url : globalOptions.api + url
    console.log(endPoint, "here_is_your_end_point")
    let options = {
      method: 'DELETE',
      url: endPoint,
      headers: {},
    }
    if (Authorization) {
      options.headers.Authorization = 'Token ' + JSON.parse(Authorization)
    }
    let response = await axios(options)
    return response
  }
  catch (error) {
    console.log(error, 'ERRROR',)
    return error
  }
};

export const getApi = async (url, data, restAuth, Authorization) => {
  try {
    let endPoint = restAuth ? globalOptions.url + url : globalOptions.api + url
    console.log(endPoint, "here_is_your_end_point")
    let options = {
      method: 'GET',
      url: endPoint,
      headers: {},
    }
    if (Authorization) {
      options.headers.Authorization = 'Token ' + JSON.parse(Authorization)
    }
    const response = await axios(options);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error, 'ERRROR',)
    // return error.response.data;
    return error;
  }
};
