import assert from 'assert';
import { expect } from 'chai';
import request from 'supertest';

// Use dynamic import if app.js is CommonJS, or static import if ES module
import app from '../app.js';

describe('Unit test: Nyitó oldal', () => {
  it('Oldal nyitás sikeres (HTTP 200)', () => {
    return request(app)
      .get('/')
      .then((response) => {
        assert.equal(response.status, 200);
      });
  });

  it('Oldalon szerepel az "Azure" szó', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('Azure');
      });
  });
});
