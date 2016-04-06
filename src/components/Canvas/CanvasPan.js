export default class CanvasPan {
  constructor(wrapper, element) {
    this.wrapper = wrapper;
    this.element = element;
  }

  currentXPosition = 0;
  currentYPosition = 0;
  dragging = false;
  
  enableEvents() {
    this.wrapper.addEventListener('mousedown', this._handleMouseDown);
    this.wrapper.addEventListener('mousemove', this._handleMouseMove);
    this.wrapper.addEventListener('mouseup', this._handleMouseUp);
  }
  
  disableEvents() {
    this.wrapper.removeEventListener('mousedown', this._handleMouseDown);
    this.wrapper.removeEventListener('mousemove', this._handleMouseMove);
    this.wrapper.removeEventListener('mouseup', this._handleMouseUp);
  }

  _handleMouseDown = (event) => {
    this.dragging = true;
    this.currentXPosition = event.clientX;
    this.currentYPosition = event.clientY;
  };

  _handleMouseMove = (event) => {
    const scrollFactor = 5;

    if (this.dragging) {
      this.element.scrollLeft = this.element.scrollLeft + (this.currentXPosition - event.clientX) / scrollFactor;
      this.element.scrollTop = this.element.scrollTop + (this.currentYPosition - event.clientY) / scrollFactor;
    }
  };

  _handleMouseUp = () => {
    this.dragging = false;
  };
}
