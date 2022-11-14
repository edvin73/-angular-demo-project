import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileModuleComponent } from './file-module.component';

describe('FileModuleComponent', () => {
  let component: FileModuleComponent;
  let fixture: ComponentFixture<FileModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
