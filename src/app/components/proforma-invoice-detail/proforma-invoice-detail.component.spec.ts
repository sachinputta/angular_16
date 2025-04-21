import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaInvoiceDetailComponent } from './proforma-invoice-detail.component';

describe('ProformaInvoiceDetailComponent', () => {
  let component: ProformaInvoiceDetailComponent;
  let fixture: ComponentFixture<ProformaInvoiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProformaInvoiceDetailComponent]
    });
    fixture = TestBed.createComponent(ProformaInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
