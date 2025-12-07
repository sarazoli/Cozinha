import { TestBed } from '@angular/core/testing';

import { SpoonacularService } from './spoonacular';

describe('Spoonacular', () => {
  let service: SpoonacularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoonacularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
