const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', ()=> {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    const userCreationResponse = await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/') // test opens application
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes') // finds an element with the text 'Notes'
    await expect(locator).toBeVisible() // checks if the locator is visible on the page
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible() // same thing for another element, without using a intermediary variable
  })

  test('user can login with correct credentials', async ({ page }) => {
    await loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })
  
  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    // makes sure the error message is displayed properly
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    // the logged in message should not be rendered in case of a failed login
    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })

  describe('when logged in', ()=> {
    beforeEach(async({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page })=> {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', ()=> {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test.only('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note') // retrieves the span element (the button is outside the text now)
        const otherNoteElement = await otherNoteText.locator('..') // retrieves the parent element of the span tag

        await otherNoteElement.getByRole('button', { name: 'make not important' }).click() // find button within the element
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })

  })

})


// test.only makes the given test the only one being executed