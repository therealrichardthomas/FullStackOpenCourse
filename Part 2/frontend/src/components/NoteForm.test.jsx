import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { create } from '../../../../Part 4/bloglist/models/blog'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByRole('textbox') // test access input field using getByRole
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...') // test writes into the input field
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

// if having multiple input fields, getAllByRole is used (returns an array of the multiple input fields)
// type will then be used as input[0] to access a singular input field to write into
// if an input field has placeholder text (which typically they do), you can use getByPlaceholderText to retrieve the field
// 