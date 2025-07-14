import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />) // renders without rendering to the DOM

  // screen.debug() // prints the HTML of a component to console

  const element = screen.getByText('Component testing is done with react-testing-library') // can test without expect using only the getByText
  // screen.debug(element) // prints the wanted element to console

  expect(element).toBeDefined() // expect generates an assertion, toBeDefined checks element existence

  // returns an object container from the rendered nonte
  // const { container } = render(<Note note={note} />)

  // const div = container.querySelector('.note') // retrieves the 'note' class from one of the fields of container
  // expect(div).toHaveTextContent('Component testing is done with react-testing-library') // checks content
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn() // defined a mock function

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup() // a session is started to interact with component
  const button = screen.getByText('make not important') // test finds corresponding button with the appropriate name
  await user.click(button) // test clicks the button

  expect(mockHandler.mock.calls).toHaveLength(1) // verifies that the mock function has been called exactly once
})