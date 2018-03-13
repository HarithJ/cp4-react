import userReducer from '../../reducers/user';

describe('Users reducers changes state on', () => {
  it('has a default state', () => {
    expect(userReducer(undefined, { type: 'unexpected' }))
      .toEqual({});
  }),
  it('change state on user login', () => {
    const results =
        {
          user: [{ token: '23dfaf333vfdff32' }],
          type: 'USER_LOGGED_IN',
        };
    expect(userReducer(null, results))
      .toEqual([{ token: '23dfaf333vfdff32' }]);
  }),
  it('clears state on user logout', () => {
    const results =
        {
          user: [{ token: '23dfaf333vfdff32' }],
          type: 'USER_LOGGED_OUT',
        };
    expect(userReducer(null, results))
      .toEqual({});
  }),
  it('adds categories to state', () => {
    const results =
        {
          categories: [{ categoryOne: { food: 'one' } }],
          type: 'GET_USER_CATEGORIES',
        };
    expect(userReducer({ token: '123432323' }, results))
      .toEqual({
        message: null,
        token: '123432323',
        categories: [{ categoryOne: { food: 'one' } }],

      });
  }),
  it('adds message to reset password', () => {
    const results =
        {
          resetMessage: 'successfully updated',
          type: 'USER_RESET_PASSWORD',
        };
    expect(userReducer({
      token: '123432323',
      categories: [{ categoryOne: { food: 'one' } }],
    }, results))
      .toEqual({
        token: '123432323',
        categories: [{ categoryOne: { food: 'one' } }],
        message: 'successfully updated',

      });
  }),
  it('Gets user recipes', () => {
    const results =
        {
          recipes: [{ recipeOne: { food: 'one' } }],
          type: 'GET_USER_RECIPES',
        };
    expect(userReducer({
      token: '123432323',
      categories: [{ categoryOne: { food: 'one' } }],
    }, results))
      .toEqual({
        token: '123432323',
        message: null,
        categories: [{ categoryOne: { food: 'one' } }],
        recipes: [{ recipeOne: { food: 'one' } }],
      });
  }),
  it('Searches categories', () => {
    const results =
        {
          SearchObject: [{ categoryTwo: { food: 'two' } }],
          type: 'SEARCH_USER_CATEGORIES',
        };
    expect(userReducer({
      token: '123432323',
      categories: [{ categoryOne: { food: 'one' } }],
    }, results))
      .toEqual({
        token: '123432323',
        categories: results.SearchObject

      });
  }),
  it('Searches user recipes', () => {
    const results =
        {
          SearchObject: [{ recipeTwo: { food: 'two' } }],
          type: 'SEARCH_USER_RECIPES',
        };
    expect(userReducer({
      token: '123432323',
      categories: [{ categoryOne: { food: 'one' } }],
    }, results))
      .toEqual({
        token: '123432323',
        categories: [{ categoryOne: { food: 'one' } }],
        recipes: results.SearchObject
      });
  });
});