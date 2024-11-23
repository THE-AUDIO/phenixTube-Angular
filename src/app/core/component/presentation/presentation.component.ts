import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {
  isDarkMode = false;
  isChoose:boolean = false
  @ViewChild('presentation')sectionPresentation!: ElementRef;

  constructor(private themeService: ThemeService) {}
  tggleDarokMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  chooseType(){    
     if (!this.isChoose) {
      this.sectionPresentation.nativeElement.innerHTML = '';
      this.isChoose = true
     }
  }
}
