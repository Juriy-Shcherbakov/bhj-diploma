/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {

      if (err) {
        console.error(err);
        return;
      }

      if (response && response.user) {
        const modalLogin = App.getModal('login');
        App.setState('user-logged');
        this.element.reset();
        modalLogin.close();
      }
    });
  }
}