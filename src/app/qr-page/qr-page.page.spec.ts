import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrPagePage } from './qr-page.page';

describe('QrPagePage', () => {
  let component: QrPagePage;
  let fixture: ComponentFixture<QrPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
