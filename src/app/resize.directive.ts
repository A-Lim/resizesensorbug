import { Directive, OnInit, OnDestroy, Output, ElementRef, EventEmitter } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

@Directive({
  selector: '[resized]'
})
export class ResizeDirective implements OnInit, OnDestroy {

  @Output()
  readonly onResize = new EventEmitter<ResizedEvent>();

  private _oldWidth: number;
  private _oldHeight: number;

  private _resizeSensor: ResizeSensor;

  constructor(private readonly _element: ElementRef) {
  }

  ngOnInit() {
    this._resizeSensor = new ResizeSensor(this._element.nativeElement, () => this._onResized());
  }

  ngOnDestroy() {
    if (this._resizeSensor)
      this._resizeSensor.detach();
  }

  private _onResized() {
    const newWidth = this._element.nativeElement.getBoundingClientRect().width;
    const newHeight = this._element.nativeElement.getBoundingClientRect().oldHeight;

    if (newWidth === this._oldWidth && newHeight === this._oldHeight)
      return;

    const event: ResizedEvent = {
      element: this._element,
      newWidth: newWidth,
      newHeight: newHeight,
      oldWidth: this._oldWidth,
      oldHeight: this._oldHeight
    };

    this._oldWidth = this._element.nativeElement.clientWidth;
    this._oldHeight = this._element.nativeElement.clientHeight;

    console.log("RESIZED");
    this.onResize.emit(event);
  }
}

export interface ResizedEvent {
  element: any,
  newWidth: number,
  newHeight: number,
  oldWidth: number,
  oldHeight: number,
}