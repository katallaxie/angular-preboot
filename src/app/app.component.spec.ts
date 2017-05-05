import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed,} from '@angular/core/testing';

// Load the implementations that should be tested
import {AppComponent} from './app.component';

describe(`App`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [AppComponent],
          schemas: [NO_ERRORS_SCHEMA],
        })
        .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();  // trigger initial data binding
  });

  it(`should have the title 'Angular Preboot'`, () => {
    expect(comp.name).toEqual('Angular Preboot');
  });

  it(`should have the @Angular logo`, () => {
    expect(comp.logo).toEqual('/img/angular.png');
  });

});
