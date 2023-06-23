import { render, screen } from '@testing-library/react'

import DateTimePicker from '.'
import moment from 'moment'

describe('<DateTimePicker />', () => {
  it('should render the heading', () => {
    render(
      <DateTimePicker
        id="date"
        date={moment('2022-07-14').toDate()}
        setDate={() => {}}
      />
    )

    expect(
      screen.getByRole('button', { name: /July 14, 2022/i })
    ).toBeInTheDocument()
  })
})
