/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />

// ----------------------------------------------------------------------------
// Custom Commands:
//   command defined in /integration/sold.com/support/commands.js
// ----------------------------------------------------------------------------
Cypress.Commands.add('addEntries', entries => {
    const newTodo = cy.get('.new-todo')
    entries.forEach( entry => {
      newTodo.type(entry)
      .type('{enter}');
    });
});

describe('On initialization it ', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Initial page display, assert the main and footer sections should be hidden
  it('Hides main and footer sections.', () => {
    cy.get('.footer')
    .should('not.exist');

    cy.get('.main')
    .should('not.exist');
  });

  // When page is initially opened, it should focus on the todo input field
  it('Focuses on todo input.', () => {
    cy.get('.new-todo')
    .should('exist')
    .should('have.focus');
  });

  // Add todo, should clear text input field when an item is added, assert field is blank
  it('Clears text input field when an item is added.', () => {
    cy.get('.new-todo')
    .type('Hello World!')
    .type('{enter}')
    .should('have.value', '');
  });

  // Add todo, assert the main and footer sections should not be hidden
  it('Shows main and footer sections when adding a todo.', () => {
    cy.addEntries(['Hello World'])
    .then(() => {
      cy.get('.main')
      .should('exist');
      cy.get('.footer')
      .should('exist');
    });
  });

  // Add new todo item and assert that it exists
  it('Displays added todo items.', () => {
    const value = 'Foo'
    cy.addEntries([value])
    .then(() => {
      cy.contains(value).should('exist');
    });
  });

  // Add three todos and make sure they all exist, and assert there are 3 li items
  it('Adds multiple todo items and displays correctly.', () => {
    const entries = ['Foo', 'Bar', 'Baz'];
    cy.addEntries(entries).then(() => {
      const $els = cy.get('.view > label');
      $els.should('exist');
      $els.should('have.length', entries.length);
      $els.each(($el, i) => {
        expect($el.parent().parent()[0].nodeName).to.eq('LI');
        expect($el[0].outerText).to.eq(entries[i]);
      });
    });
  });

  //Add todo item which has leading and trailing spaces, when created should trim
  it('Trims entry strings', () => {
    const entries = [' spaces ', 'rightspace ', ' leftspace'];
    cy.addEntries(entries).then(() => {
      const $els = cy.get('.view > label');
      $els.should('exist');
      $els.should('have.length', entries.length);
      $els.each(($el, i) => {
        expect($el[0].outerText).to.eq(entries[i].trim());
      });
    })
  })
});