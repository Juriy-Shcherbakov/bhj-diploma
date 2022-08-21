/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const { method, callback, data } = options;
    let { url } = options;
    const formData = new FormData();
  
    if (!url && !method && !callback) {
      console.error('Ошибка в данных запроса');
      return;
    }
  
    if (data) {
      if (method === 'GET') {
        url += '?' + Object.entries(data).map(
          ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join('&');
      } else {
        for (let key in data) {
          formData.append(key, data[key]);
        }
      }
    }
  
    try {
      xhr.responseType = 'json';
      xhr.open(method, url);
  
      if (method === 'GET') {
        xhr.send();
      } else {
        xhr.send(formData);
      }
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 0) {
          throw new Error('Сервер не отвечает');
        }
      };
      
    } catch (err) {
      callback(err);
    }
  
    xhr.addEventListener('load', () => {
      if (xhr.response.success) {
        callback(null, xhr.response);
      } else {
        callback(xhr.response.error);
      }
    });
};
