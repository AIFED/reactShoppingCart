import { FilterCode, FilterCategory } from 'src/entities/filter';
import { initialFiltersSettings } from 'src/configs';
import { updateFilters, filterProducts, getActiveFilters } from '.';

import { testData } from '../testData';

describe('filterProducts', () => {
  test('if no active filters return all products from initial data list', () => {
    const filters1 = initialFiltersSettings;
    const activeFilters1 = getActiveFilters(filters1);

    const expected1 = testData;
    const filteredProducts1 = filterProducts(activeFilters1, testData);
    expect(filteredProducts1).toEqual(expected1);
  });

  test('should filterProducts return correct productList for each filter combination', () => {
    const filters1 = initialFiltersSettings;

    const filters2 = updateFilters(
      {
        code: FilterCode.PriceGte200,
        active: true,
        category: FilterCategory.Price,
      },
      filters1,
    );
    const activeFilters2 = getActiveFilters(filters2);

    const filters3 = updateFilters(
      {
        code: FilterCode.RateEt1,
        active: true,
        category: FilterCategory.Rating,
      },
      filters2,
    );
    const activeFilters3 = getActiveFilters(filters3);

    const filters4 = updateFilters(
      {
        code: FilterCode.RateEt3,
        active: true,
        category: FilterCategory.Rating,
      },
      filters3,
    );
    const activeFilters4 = getActiveFilters(filters4);

    const filters5 = updateFilters(
      {
        code: FilterCode.RateEt5,
        active: true,
        category: FilterCategory.Rating,
      },
      filters4,
    );
    const activeFilters5 = getActiveFilters(filters5);

    const filters6 = updateFilters(
      {
        code: FilterCode.PriceLte100,
        active: true,
        category: FilterCategory.Price,
      },
      filters5,
    );
    const activeFilters6 = getActiveFilters(filters6);

    const expected2 = testData.filter((item) => item.price > 200);
    const filteredProducts2 = filterProducts(activeFilters2, testData);
    expect(filteredProducts2).toEqual(expected2);

    const expected3 = testData.filter(
      (item) => 1 === Math.round(item.rating.rate) && item.price > 200,
    );
    const filteredProducts3 = filterProducts(activeFilters3, testData);
    expect(filteredProducts3).toEqual(expected3);

    const expected4 = testData.filter(
      (item) =>
        (3 === Math.round(item.rating.rate) ||
          1 === Math.round(item.rating.rate)) &&
        item.price > 200,
    );
    const filteredProducts4 = filterProducts(activeFilters4, testData);
    expect(filteredProducts4).toEqual(expected4);

    const expected5 = testData.filter(
      (item) =>
        (5 === Math.round(item.rating.rate) ||
          3 === Math.round(item.rating.rate) ||
          1 === Math.round(item.rating.rate)) &&
        item.price > 200,
    );
    const filteredProducts5 = filterProducts(activeFilters5, testData);
    expect(filteredProducts5).toEqual(expected5);

    const expected6 = testData.filter(
      (item) =>
        (5 === Math.round(item.rating.rate) ||
          3 === Math.round(item.rating.rate) ||
          1 === Math.round(item.rating.rate)) &&
        (item.price > 200 || item.price < 100),
    );
    const filteredProducts6 = filterProducts(activeFilters6, testData);
    expect(filteredProducts6).toEqual(expected6);
  });
});
