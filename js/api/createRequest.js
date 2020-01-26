'use strict';

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let form = new FormData;

    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    if (options['method'] === 'GET') {
        options['url'] += "?";
        for (let item in options.data) {
            options['url'] += `${item}=${options['data'][item]}&`;
        }
    } else {
        for (let item in options['data']) {
            form.append(item, options['data'][item]);
        }
    }
    xhr.open(options['method'], options['url']);
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = xhr.response;
            options.callback(err, response);
        }
    });

    try {
        xhr.send(form);
    }catch (err) {
        callback(err);
    }

    return xhr
};