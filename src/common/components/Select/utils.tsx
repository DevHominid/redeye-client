import type { SelectOption } from './Select';

export function listOptions(options: SelectOption[]) {
  return options.map(({ text, value }) => (
    <option key={value} value={value}>{text}</option>
  ));
}
