import { 
  validate,
  urlExistsDeep 
} from '../server/lib/validate';

test('Validate url exists', function() {
  expect(validate('http://www.google.com')).toBeTruthy()
})

test('Validate url does not exists', function() {
  expect(validate('http://www.googl.io')).resolves.toEqual({})
})
