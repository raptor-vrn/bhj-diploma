'use strict';

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
      localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
      if (localStorage.getItem('user')) {
          return JSON.parse(localStorage.getItem('user'))
      }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    return createRequest({
        method: 'GET',
        url: this.HOST + this.URL + '/current',
        responseType: 'json',
        data,
        callback: (err, response) => {
            if (response.user) {
                this.setCurrent(response.user);
            } else {
                this.unsetCurrent();
            }
            callback(err, response);
        }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    return createRequest({
        method: 'POST',
        url: this.HOST + this.URL + '/login',
        responseType: 'json',
        data,
        callback: (err, response) => {
            if (response.user && response.success === true) {
                this.setCurrent(response.user);
            }
            callback(err, response);
        }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    return createRequest({
        method: 'POST',
        url: this.HOST + this.URL + '/register',
        responseType: 'json',
        data,
        callback: (err, response) => {
            if (response.user && response.success === true) {
                this.setCurrent(response.user);
            }
            callback(err, response);
        }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    return createRequest({
        method: 'POST',
        url: this.HOST + this.URL + '/logout',
        responseType: 'json',
        data,
        callback: (err, response) => {
            if (response.user && response.success === true) {
                this.unsetCurrent();
            }
            callback(err, response);
        }
    })
  }
}
User.URL = '/user';
User.HOST = Entity.HOST;