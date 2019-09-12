/* eslint-disable no-undef */
const chai = require('chai');
const Blizzcle = require('../src/index');

const { expect } = chai;
const { assert } = chai;

describe('Connection Test', () => {
  it('Should not throw any errors', async () => {
    const blizzcle = new Blizzcle({ count: 1 });
    try {
      await blizzcle.get();
    } catch (error) {
      assert.ok(false, error);
      return;
    }
    assert.ok(true);
  });
});
describe('get() Test', () => {
  context('Count Test', () => {
    describe('Specific length Test: 10', () => {
      it('should return 10 length of json', async () => {
        const a = new Blizzcle({
          count: 10,
        });
        const json = await a.get();
        expect(json.length).to.be.equal(10);
      });
    });
    describe('Full length Test for Overwatch', () => {
      it('should match the length of all overwatch posts', async () => {
        const a = new Blizzcle({
          game: 'overwatch',
        });
        const json = await a.get();
        expect(json.length).to.be.equal(a.metadata.totalCount);
      });
    });
  });
  context('Game Test', () => {
    describe('Correct Game Test', () => {
      it('should return return the community name "overwatch"', async () => {
        const a = new Blizzcle({
          count: 1,
          game: 'overwatch',
        });
        await a.get();
        expect(a.metadata.game).to.be.equal('overwatch');
      });
    });
    describe('Inorrect Game Test', () => {
      it('should return return the community name "All"', async () => {
        const a = new Blizzcle({
          count: 1,
          game: 'I_AM_SOME_RANDOM_GAME_NAME',
        });
        await a.get();
        expect(a.metadata.game).to.be.equal('All');
      });
    });
  });
  context('Language Test', () => {
    describe('Correct Language Test', () => {
      it('Should not throw any errors', async () => {
        const blizzcle = new Blizzcle({
          count: 1,
          language: 'en-us',
        });
        try {
          await blizzcle.get();
        } catch (error) {
          assert.ok(false, error);
          return;
        }
        assert.ok(true);
      });
    });
    describe('Incorrect Language Test', () => {
      it('Should throw errors', async () => {
        const blizzcle = new Blizzcle({
          count: 1,
          language: 'I_AM_A_FUNNY_AND_INCORRECT_LANGUAGE',
        });
        try {
          await blizzcle.get();
        } catch (error) {
          assert.ok(true);
          return;
        }
        assert.ok(false);
      });
    });
  });
});
