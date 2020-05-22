import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkOverlayOrigin, Overlay, OverlayConfig} from "@angular/cdk/overlay";
import {ComponentPortal, TemplatePortal} from "@angular/cdk/portal";
import {merge} from "rxjs/index";
import {FilePreviewOverlayRef} from "my-lib/tag-selector/file-preview-overlay-ref";

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}
@Component({
  selector: 'lee-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls:['./tag-selector.component.less']
})
export class TagSelectorComponent implements OnInit {
  @ViewChild(CdkOverlayOrigin, {static: false}) _overlayOrigin: CdkOverlayOrigin;
  @ViewChild('overlay', {static: false}) overlayTemplate: TemplateRef<any>;
  constructor(private overlay: Overlay,private view:ViewContainerRef) { }

  ngOnInit(){}

  arr=[{name:'测试一'},{name:'测试一'},{name:'测试一'},{name:'测试一'},{name:'测试一'},{name:'测试一'},{name:'测试一'}]
  dialogRef: FilePreviewOverlayRef;
  showPreview() {
    this.dialogRef = this.open();
  }

  open(config: FilePreviewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new FilePreviewOverlayRef(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new TemplatePortal(this.overlayTemplate, this.view)

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(filePreviewPortal);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  close(){
    if(this.dialogRef){
      this.dialogRef.close();
      this.dialogRef = undefined;
    }
  }
}
