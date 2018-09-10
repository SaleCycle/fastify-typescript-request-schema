import { expect } from 'chai';
import 'mocha';
import path from 'path';
import { compileFile } from '../src/index';

describe('simple conversion', () => {
  it('should convert a schema', (done) => {
    compileFile(path.join(__dirname, 'simpleSchema.schema.json'))
      .then((converted) => {
        expect(converted.params).to.not.be.null;
        done();
      })
      .catch((ex) => {
        done(ex);
      });
  });

  it('should error out if the json is invalid', (done) => {
    compileFile(path.join(__dirname, 'brokenSchema.schema.json'))
      .then((converted) => {
        done('should not have got here');
      })
      .catch((ex) => {
        expect(ex.message).to.not.be.null;
        done();
      });
  });
});
