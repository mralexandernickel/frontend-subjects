import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksumGeneratorComponent } from './checksum-generator.component';

describe('ChecksumGeneratorComponent', () => {
  let component: ChecksumGeneratorComponent;
  let fixture: ComponentFixture<ChecksumGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksumGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksumGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
