export default class Section {
    constructor({ data, renderer }, containerSelector) {
      this._renderedItems = data;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    getInitialItems(data){
      this._renderedItems = data
    }
  
    addItem(element) {
      this._container.prepend(element);
    }

    deleteItem(deletedItem){
      this._renderedItems = this._renderedItems.filter(item => {
        return item !== deletedItem
      })
    }
  
    clear() {
      this._container.innerHTML = "";
    }
  
    renderItems() {
      this.clear();
  
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
  }
  