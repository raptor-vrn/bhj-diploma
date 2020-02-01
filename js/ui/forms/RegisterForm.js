/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options.data, (err, response) => {

      if (response && response.success) {
        this.element.reset();
        App.setState('user-logged');
        let registerModal = App.getModal('register');
        registerModal.close();
      }
    })
  }
}
