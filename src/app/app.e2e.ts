import {browser, by, element} from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
    browser.waitForAngular();
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Angular Preboot';
    expect(subject).toEqual(result);
  });

  it('should have a welcome message', () => {
    let subject = element(by.css('.welcome')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

});
