import {
  Directive,
  Input,
  TemplateRef,
  OnInit,
  ElementRef,
  HostListener,
  ViewContainerRef,
} from '@angular/core';
import {
  ComponentType,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';

@Directive({
  selector: '[appCustomTooltip]',
})
export class CustomTooltipDirective implements OnInit {
  @Input('appCustomTooltip')
  tooltipContent!: TemplateRef<any> | ComponentType<any>;
  private overlayRef: OverlayRef | undefined;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.tooltipContent) {
      const position = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetX: 0,
            offsetY: 5,
          },
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetX: 0,
            offsetY: -5,
          },
        ]);

      this.overlayRef = this.overlay.create({
        positionStrategy: position,
        scrollStrategy: this.overlay.scrollStrategies.close(),
        panelClass: 'custom-tooltip-class',
      });
    }
  }
  @HostListener('mouseenter')
  private _show(): void {
    if (this.overlayRef) {
      let containerPortal: TemplatePortal<any> | ComponentPortal<any>;

      if (this.tooltipContent instanceof TemplateRef) {
        containerPortal = new TemplatePortal(
          this.tooltipContent,
          this.viewContainerRef
        );
      } else {
        containerPortal = new ComponentPortal(
          this.tooltipContent,
          this.viewContainerRef
        );
      }
      this.overlayRef.attach(containerPortal);
    }
  }
  @HostListener('mouseout')
  private _hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}