import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';


import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { CustomTooltipDirective } from './custom-tooltip.directive';

@NgModule({
  declarations: [AppComponent, ToolTipComponent, CustomTooltipDirective],
  imports: [BrowserModule, AppRoutingModule, MatButtonModule, MatTooltipModule, OverlayModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
