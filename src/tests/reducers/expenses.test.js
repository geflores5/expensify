import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should add expense', () => {
  const currentState = [];
  const action = {
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  };
  const state = expensesReducer(currentState, action);

  expect(state).toEqual([expenses[2]])
});

test('should remove expense', ()=> {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expense if id not found', ()=> {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'abc123'
  }
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should edit expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount: 200000
    }
  }
  const state = expensesReducer(expenses, action);

  expect(state[0]).toEqual({
    ...expenses[0],
    amount: 200000
  })
});

test('should not edit expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {
      amount: 200000
    }
  }
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses)
});