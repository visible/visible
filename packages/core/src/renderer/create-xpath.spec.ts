import { createXPath } from './create-xpath';

describe('createXPath', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('creates xpath for an element', () => {
    const p = document.createElement('p');
    document.body.appendChild(p);
    const xpath = createXPath(p);
    expect(xpath).toBe('/html/body/p');
  });

  it('creates xpath with position predicate', () => {
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    document.body.appendChild(p1);
    document.body.appendChild(p2);
    const xpath = createXPath(p2);
    expect(xpath).toBe('/html/body/p[position()=1]');
  });

  it('creates xpath for a text node', () => {
    const text = document.createTextNode('hello');
    document.body.append(text);
    const xpath = createXPath(text);
    expect(xpath).toBe('/html/body/text()');
  });

  it('creates xpath for a nested element', () => {
    const wrapper = document.createElement('div');
    document.body.append(wrapper);
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    wrapper.append(p1);
    wrapper.append(p2);
    const xpath = createXPath(p2);
    expect(xpath).toBe('/html/body/div/p[position()=1]');
  });

  it('creates xpath for complex HTML', () => {
    document.body.innerHTML = `
      <button style="background-color: blue; color: white;">
        click me!
      </button>

      <button style="background-color: grey; color: white;">
        click me!
      </button>

      <button style="background-color: #666666; color: white;">
        click me!
      </button>

      <img src="https://neet.love/static/08f107f32847dd729a44804b70d72537/1b8c6/avatar.jpg">

      <img alt="hello" src="https://neet.love/static/08f107f32847dd729a44804b70d72537/1b8c6/avatar.jpg">

      <button></button>
    `;

    const elm = document.querySelector('body > img[alt="hello"]');
    if (!elm) throw new Error();
    const xpath = createXPath(elm);
    expect(xpath).toBe('/html/body/img[position()=2]');
  });
});
