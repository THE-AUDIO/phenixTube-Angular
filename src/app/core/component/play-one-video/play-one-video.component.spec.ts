import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayOneVideoComponent } from './play-one-video.component';

describe('PlayOneVideoComponent', () => {
  let component: PlayOneVideoComponent;
  let fixture: ComponentFixture<PlayOneVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayOneVideoComponent]
    });
    fixture = TestBed.createComponent(PlayOneVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
