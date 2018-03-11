import Locale from 'localization/localization';
import Errors from 'helpers/errors';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export default class Rest {
  static headers(auth) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: auth,
    };
  }

  static get(route, auth) {
    return this.xhr(route, auth, null, METHOD.GET);
  }

  static put(route, auth, params) {
    return this.xhr(route, auth, params, METHOD.PUT);
  }

  static patch(route, auth, params) {
    return this.xhr(route, auth, params, METHOD.PATCH);
  }

  static post(route, auth, params) {
    return this.xhr(route, auth, params, METHOD.POST);
  }

  static delete(route, auth, params) {
    return this.xhr(route, auth, params, METHOD.DELETE);
  }

  static xhr(route, auth, params, verb) {
    const options = Object.assign(
      { method: verb },
      params
        ? { body: params instanceof FormData ? params : JSON.stringify(params) }
        : null,
    );
    options.headers = Rest.headers(auth);

    return fetch(route, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .catch(err => {
        let throwable;
        if (err.statusText) {
          throwable = { message: err.statusText };
        } else {
          throwable = { message: Locale.vagueError };
        }
        throw throwable;
      });
  }

  static postMultiPartFormData = (url, auth, bytes, extension) => {
    // bytes must be an array so that we can convert to a signed 8 byte array below
    if (!Array.isArray(bytes)) {
      throw new Errors.JSAddinException(
        'Called postMultiPartFormData with non-byte array, saw "' +
          typeof bytes +
          '" instead',
      );
    }

    var signedBytes = new Int8Array(bytes);
    var formData = new FormData();
    var blob = new Blob([signedBytes], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    formData.append('data', blob, 'jsaddin.' + extension);

    return Rest.post(url, auth, formData);
  };
}
