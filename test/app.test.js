/* eslint-disable */
const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('Unit test: Nyitó oldal', function () {
    it('Oldal nyitás sikeres (HTTP 200)', function () {
        return request(app)
            .get('/')
            .then(function (response) {
                assert.equal(response.status, 200);
            })
    });

    it('Oldalon szerepel az "Azure" szó', function () {
        return request(app)
            .get('/')
            .then(function (response) {
                expect(response.text).to.contain('Azure');
            })
    });

});