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

  it('Oldalon szerepel az "felhő" szó', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('felhő');
      });
  });

  it('A válasz Content-Type értéke text/html', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.headers['content-type']).to.include('text/html');
      });
  });

  it('Az oldal tartalmazza az aktuális évet', () => {
    const currentYear = new Date().getFullYear().toString();
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain(currentYear);
      });
  });

  it('Oldalon szerepel a "NodeJS Verzió" felirat', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('NodeJS Verzió');
      });
  });

  it('Oldalon szerepel a "Szerver neve" felirat', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.text).to.contain('Szerver neve');
      });
  });

  it('A válasz tartalmaz X-Powered-By fejlécet', () => {
    return request(app)
      .get('/')
      .then((response) => {
        expect(response.headers).to.have.property('x-powered-by');
      });
  });
});

describe('Unit test: Mentés', () => {
  it('Érvényes üzenet mentése visszairányít a főoldalra (HTTP 302)', () => {
    return request(app)
      .post('/save')
      .send('uzenet=Teszt+üzenet')
      .then((response) => {
        assert.equal(response.status, 302);
      });
  });

  it('Érvénytelen üzenet mentése 400-as hibát ad vissza', () => {
    return request(app)
      .post('/save')
      .send('uzenet=!!')
      .then((response) => {
        assert.equal(response.status, 400);
      });
  });

  it('Mentés után az üzenet megjelenik a főoldalon', () => {
    return request(app)
      .post('/save')
      .send('uzenet=FelhőDemo')
      .then(() => request(app).get('/'))
      .then((response) => {
        expect(response.text).to.contain('FelhőDemo');
      });
  });

  it('Üres üzenet esetén 400-as hibát ad vissza', () => {
    return request(app)
      .post('/save')
      .send('uzenet=')
      .then((response) => {
        assert.equal(response.status, 400);
      });
  });

  it('Túl rövid üzenet esetén 400-as hibát ad vissza', () => {
    return request(app)
      .post('/save')
      .send('uzenet=ab')
      .then((response) => {
        assert.equal(response.status, 400);
      });
  });

  it('Tiltott karakterek esetén 400-as hibát ad vissza', () => {
    return request(app)
      .post('/save')
      .send('uzenet=<script>')
      .then((response) => {
        assert.equal(response.status, 400);
      });
  });

  it('A hibaoldal tartalmaz "Érvénytelen" szöveget', () => {
    return request(app)
      .post('/save')
      .send('uzenet=')
      .then((response) => {
        expect(response.text).to.contain('Érvénytelen');
      });
  });
});

describe('Unit test: Nem létező oldal', () => {
  it('Nem létező oldal 404-es hibát ad vissza', () => {
    return request(app)
      .get('/nem-letezik')
      .then((response) => {
        assert.equal(response.status, 404);
      });
  });

  it('A 404-es válasz szövege tartalmaz "Not Found" szöveget', () => {
    return request(app)
      .get('/nem-letezik')
      .then((response) => {
        expect(response.text).to.contain('Not Found');
      });
  });
});
