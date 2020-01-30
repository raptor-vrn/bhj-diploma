/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element != '') {
        this.element = element;
        this.registerEvents();
    } else {
        throw new Error('Element is empty')
    }

  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
      const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
      this.onClose = this.onClose.bind(this);
      for (let closeButton of closeButtons) {
          closeButton.addEventListener('click', this.onClose);
      }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault();
    this.close()
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
      const deleteButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
      this.onClose = this.onClose.bind(this);
      for (let deleteButton of deleteButtons) {
          deleteButton.removeEventListener('click', this.onClose);
      }
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
      this.element.style.display = '';
  }
}
