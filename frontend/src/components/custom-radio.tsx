import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";

type OptionType = {
  label: string;
  value: string | number;
};

type Props = RadioGroupProps & {
  options: OptionType[];
  label: string;
};

const CustomRadio = (props: Props) => {
  return (
    <FormControl>
      <FormLabel id={props.id}>{props.label}</FormLabel>
      <RadioGroup
        aria-labelledby={props.id}
        name={props.name || props.id}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadio;
