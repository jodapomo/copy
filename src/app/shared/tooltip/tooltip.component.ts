import { Component, OnInit, Input, ElementRef, Renderer2, HostListener, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnChanges {

  @Input('tooltip-text') tooltipText: string;
  @Input('tooltip-direction') tooltipDirection: string;
  @Input('tooltip-effect') tooltipEffect: string;

  @Input('tooltip-display') display = true;

  private element: ElementRef;
  private trigger: ElementRef;
  private tooltip: ElementRef;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {

    this.element = this.el.nativeElement.childNodes[0];

    this.renderTooltip();

  }

  ngOnChanges(): void {
    if ( this.tooltip ) {
      this.clearTootip();

      this.renderTooltip();
    }

  }

  clearTootip() {
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    this.renderer.removeChild(this.el.nativeElement, this.trigger);
  }

  renderTooltip() {

    this.trigger = this.renderer.createElement('at-trigger');
    this.tooltip = this.renderer.createElement('at-tooltip');

    let tooltipContent;

    if ( this.tooltipText !== undefined ) {
      tooltipContent = this.renderer.createText(this.tooltipText);
    } else {
      tooltipContent = this.renderer.createText('Tooltip');
    }

    this.renderer.appendChild(this.tooltip, tooltipContent);

    // Tooltip direction class
    if ( /^(top|right|bottom|left)$/.test( this.tooltipDirection ) ) {

      this.renderer.addClass(this.tooltip, this.tooltipDirection);

    } else {

      this.renderer.addClass(this.tooltip, 'bottom');

    }

    this.renderer.appendChild(this.el.nativeElement, this.trigger);
    this.renderer.appendChild(this.trigger, this.element);
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);

  }

  addEffect() {
    // Tooltip effect class
    if (/^(zoom|fade|slide)$/.test(this.tooltipEffect)) {

      this.renderer.addClass(this.tooltip, this.tooltipEffect);

    } else {

      this.renderer.addClass(this.tooltip, 'zoom');

    }
  }

  @HostListener('click') onclick() {
    this.addEffect();
  }

  @HostListener('mouseenter') onmouseenter() {

    if ( this.display ) {
      this.addEffect();

      this.renderer.removeClass(this.el.nativeElement, 'at-deactivate');
      this.renderer.addClass(this.el.nativeElement, 'at-active');

    }

  }

  @HostListener('mouseleave') onmouseleave() {

    if ( this.display ) {

      this.renderer.removeClass(this.el.nativeElement, 'at-active');
      this.renderer.addClass(this.el.nativeElement, 'at-deactivate');

    }

  }
}
