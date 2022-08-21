/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btnSidebar = document.querySelector('.sidebar-toggle');

    btnSidebar.addEventListener('click', () => {
      document.querySelector('body').classList.toggle('sidebar-open');
      document.querySelector('body').classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const modalRegister = App.getModal('register');
    const modalLogin = App.getModal('login');

    const elementRegister = document.querySelector('.menu-item_register a');
    const elementlogin = document.querySelector('.menu-item_login a');
    const elementlogout = document.querySelector('.menu-item_logout a');

    elementRegister.addEventListener('click', (event) => {
      event.preventDefault();
      modalRegister.open();
    });

    elementlogin.addEventListener('click', (event) => {
      event.preventDefault();
      modalLogin.open();
    });

    elementlogout.addEventListener('click', (event) => {
      event.preventDefault();
      User.logout((err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
}