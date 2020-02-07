/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
      Account.create(options.data, (err, response) => {
        if (response && response.success) {
            let formModal = App.getModal('createAccount');
            formModal.close();
            this.element.reset();
            App.update();
        }
      })
  }
}
