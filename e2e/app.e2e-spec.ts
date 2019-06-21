import { RadiaPage } from './app.po';

describe('radia App', () => {
  let page: RadiaPage;

  beforeEach(() => {
    page = new RadiaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
