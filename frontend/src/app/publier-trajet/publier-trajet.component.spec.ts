import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierTrajetComponent } from './publier-trajet.component';

describe('PublierTrajetComponent', () => {
  let component: PublierTrajetComponent;
  let fixture: ComponentFixture<PublierTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublierTrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublierTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
