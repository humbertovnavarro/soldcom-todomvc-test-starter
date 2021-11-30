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

describe('SOLD.com Test Project: task management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Adds completed class to checked input boxes', () => {
    cy.addEntries(['Foo', 'Bar','Baz']).then(() => {
      const $inputs = cy.get('.todo-list .view input');
      $inputs.click({multiple: true}).then(() => {
        const $entries = cy.get('.todo-list > li');
        $entries.each($el => {
          expect($el.hasClass('completed'), 'Has class completed').to.true;
        })
      });
    });
  });
  
  it('Removes completed class from unchecked input boxes', () => {
    cy.addEntries(['Foo', 'Bar','Baz']).then(() => {
      const $inputs = cy.get('.todo-list .view input');
      $inputs.click({multiple: true}).then(() => {
        $inputs.click({multiple: true}).then(() => {
          const $entries = cy.get('.todo-list > li');
          $entries.each($el => {
            expect($el.hasClass('completed'), 'Has class completed').to.false;
          });
        })
      });
    });
  });

  it('Displays the correct amount of entries', () => {
    cy.addEntries(['Foo', 'Bar','Baz']).then(() => {
      const $inputs = cy.get('.todo-list .view input');
      $inputs.eq(0).click().then(() => {
        cy.get('.todo-count').should('have.text', '2 items left');
      })
    });
  });
  
  it('Clear completed wipes tasks', () => {
    cy.addEntries(['Foo', 'Bar', "Baz"]).then(() => {
      const $inputs = cy.get('.todo-list .view input');
      $inputs.eq(1).click().then(() => {
        cy.get('.clear-completed').click().then(() => {
          cy.get('.todo-list').should('not.have.text', 'Bar');
        })
      })
    });
  });

  it('Hides other controls when editing', () => {
    cy.addEntries(['Foo']).then(() => {
      const $label = cy.get('.todo-list li');
      $label.dblclick().then(() => {
        const $button = cy.get('.todo-list li button').should('not.be.visible');
        const $toggle = cy.get('.todo-list li .toggle').should('not.be.visible');
      });
    });
  });

  it('Hides other controls when editing', () => {
    cy.addEntries(['Foo']).then(() => {
      const $label = cy.get('.todo-list li');
      $label.dblclick().then(() => {
        const $button = cy.get('.todo-list li button').should('not.be.visible');
        const $toggle = cy.get('.todo-list li .toggle').should('not.be.visible');
      });
    });
  });

});
