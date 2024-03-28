import { Option } from '@/app/types'
import { ChangeEvent } from 'react'

interface Props {
  options: Option[]
  value?: string
  disabled: boolean
  defaultLabel: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({
  options,
  value,
  defaultLabel,
  onChange,
  disabled,
}: Props) => {
  return (
    <select
      className="form-select alt bg-grey"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">{defaultLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
