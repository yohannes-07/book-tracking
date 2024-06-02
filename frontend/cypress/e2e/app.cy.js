/// <reference types="cypress" />


describe('Books CRUD Operations', () => {
    let randomBookTitle;

    before(() => {
      cy.randomBookTitle().then(title => {
        randomBookTitle = title;
      });
    });
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    });
  
    it('initially displays an empty list of books', () => {
      cy.get('div[data-test="book-item"]').should('have.length', 0)
    })
  
    it('can add a new book', () => {
    //   const newBookTitle = randomeData.randomValues.name;
      const newBookStatus = 'to_read'

      cy.get('[data-test="add-book"]').click()
      cy.get('input[data-test="new-book-title"]').type(randomBookTitle)
      
      cy.get('.new-book-status').click();
      cy.get('.select-item').contains('To Read').click()
     
      cy.get('[data-test="save-book"]').click()
  
      cy.get('div[data-test="book-item"]').should('have.length.at.least', 1)
      cy.get('div[data-test="book-item"]').last().should('contain.text', randomBookTitle)
      cy.get('div[data-test="book-item"]').last().should('contain.text', 'To Read')
    })
  
    it('can edit a book', () => {
      const updatedBookTitle = 'Updated Book Title'
      const updatedBookStatus = 'completed'
  
      cy.get('div[data-test="book-item"]').should('have.length.at.least', 1)
      cy.get('div[data-test="book-item"]').last().find('[data-test="edit-book"]').click()
  
      cy.get('input[data-test="edit-book-title"]').clear().type(updatedBookTitle)
      cy.get('.edit-book-status').click();
      cy.get('.select-edit-item').contains('Completed').click()
     

      cy.get('[data-test="save-book"]').click()
  
      cy.get('div[data-test="book-item"]').last().should('contain.text', updatedBookTitle)
      cy.get('div[data-test="book-item"]').last().should('contain.text', 'Completed')
    })
  
    it('can delete a book', () => {
      cy.get('div[data-test="book-item"]').should('have.length.at.least', 1)
      cy.get('div[data-test="book-item"]').first().find('[data-test="delete-book"]').click()
    })
  
    it('can filter books by status', () => {
      const books = [
        { title: 'Book 1', label: 'To Read' },
        { title: 'Book 2', label: 'In Progress' },
        { title: 'Book 3', label: 'Completed' },
      ];
  
      books.forEach(book => {
        cy.get('[data-test="add-book"]').click()
  
        cy.get('input[data-test="new-book-title"]').type(book.title)
        cy.get('.new-book-status').click();
        cy.get('.select-item').contains(book.label).click()
  
        cy.get('[data-test="save-book"]').click()
      })
  
      cy.get('a[href="/?books=to_read"]').click()
      cy.url().should('include', 'books=to_read')
      cy.get('div[data-test="book-item"]').each(book => {
        cy.wrap(book).should('contain.text', 'To Read')
      })
  
      cy.get('a[href="/?books=in_progress"]').click()
      cy.url().should('include', 'books=in_progress')
      cy.get('div[data-test="book-item"]').each(book => {
        cy.wrap(book).should('contain.text', 'In Progress')
      })

      cy.get('a[href="/?books=completed"]').click()
      cy.url().should('include', 'books=completed')
      cy.get('div[data-test="book-item"]').each(book => {
        cy.wrap(book).should('contain.text', 'Completed')
      })
    })
  })
  