/// <reference types="cypress" />
beforeEach(() => {
  // application should be running at port 3000
  cy.request('POST', '/reset', {
    todos: []
  });
  cy.visit('localhost:3000');
  cy.contains('h1', 'todos');
});

it('starts with zero items', () => {
  // check if the list is empty initially
  //   find the selector for the individual TODO items
  //   in the list
  //   use cy.get(...) and it should have length of 0
  //   https://on.cypress.io/get
  cy.get('li.todo').should('have.length', 0);
});

it('adds two items', () => {
  // repeat twice
  //    get the input field
  //    type text and "enter"
  //    assert that the new Todo item
  //    has been added added to the list
  cy.get('.new-todo').type('first item{enter}');
  cy.contains('li.todo', 'first item').should('be.visible');
  cy.get('.new-todo').type('second item{enter}');
  cy.contains('li.todo', 'second item').should('be.visible');
});

/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = text => {
  cy.get('.new-todo').type(`${text}{enter}`);
};

it('can add many items', () => {
  const N = 5;
  for (let k = 0; k < N; k += 1) {
    // add an item
    // probably want to have a reusable function to add an item!
    addItem(`item ${k}`);
  }
  // check number of items
  cy.get('li.todo').should('have.length', 5);
});

it('can mark items as completed', () => {
  // add a few items
  // mark items as completed
  // select completed items and confirm their number

  addItem('simple');
  cy.contains('li.todo', 'simple')
    .should('exist')
    .find('input[type="checkbox"]')
    .check();
  // have to force click because the button does not appear unless we hover
  cy.contains('li.todo', 'simple')
    .find('.destroy')
    .click({ force: true });
  cy.contains('li.todo', 'simple').should('not.exist');
});

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/
