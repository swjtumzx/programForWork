/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor,screen } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps } from './autocomplete'

config.disabled = true

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>)
    inputNode = screen.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    //click the first item
    fireEvent.click(screen.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
    //fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.queryByText('ab')).toBeInTheDocument()
    })

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(screen.queryByText('ab')).toHaveClass('item-highlighted')
    //arrow down 
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(screen.queryByText('abc')).toHaveClass('item-highlighted')
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(screen.queryByText('ab')).toHaveClass('item-highlighted')
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(screen.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(screen.queryByText('ab')).not.toBeInTheDocument()
  })
})