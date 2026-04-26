import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { options } from '@/lib/data'

function DateTimeFilter({ setDateQuery }) {
   return (
    <Combobox items={options}
      onValueChange={(value) => {
      console.log(value)
      setDateQuery(value)
  }}
    >
      <ComboboxInput placeholder="Chọn bộ lọc" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {
            options.map((option) => (
              <ComboboxItem 
                key={option.value} 
                value={option.value}
              >
                {option.label}
              </ComboboxItem>
            ))
          }
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default DateTimeFilter