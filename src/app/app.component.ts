import { Component } from '@angular/core';
import { ToolTipComponent } from './tool-tip/tool-tip.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tooltipComponent = ToolTipComponent;
}
