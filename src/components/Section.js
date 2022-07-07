export default class Section {
    constructor({ data, renderer }, containerSelector) {
      this._data = data
      this._renderedItems = [];
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      this._userId = null
    }

    setRenderedElements(data){
      this._renderedItems = data
    }

    setData(data) {
      this._data = data
    }

    getData(){
      return this._data
    }

    setOwner(id){
      this._userId = id
    }
  
    addItem(item) {
      this._data = [... this._data, item]
      this.renderElements()
    }

    deleteItem(deletedItem){
      this._data = this._data.filter(item => {
        return item._id !== deletedItem.id
      })
      this.deleteElement(deletedItem.id)
    }
  
    clear() {
      this._container.innerHTML = "";
    }

    appendElement(element){
      this._container.prepend(element)
    }

    deleteElement(id){
      const elementToDelete = this._container.querySelector(`#${CSS.escape(id)}`);
      elementToDelete.remove()
    }
  
    renderElements() {
      this.clear();
      this._renderedItems = this._data.map(item => this._renderer(item, this._userId));
      this._renderedItems.forEach(element => this.appendElement(element))
    }
  }
  