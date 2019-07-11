import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDeviceComponent } from './return-device.component';

describe('ReturnDeviceComponent', () => {
  let component: ReturnDeviceComponent;
  let fixture: ComponentFixture<ReturnDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
