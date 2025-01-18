import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

const marks = [
  {
    value: 0,
    label: "1",
  },
  {
    value: 10,
    label: "2",
  },
  {
    value: 20,
    label: "3",
  },
  {
    value: 30,
    label: "4",
  },
  {
    value: 40,
    label: "5",
  },
  {
    value: 50,
    label: "6",
  },
  {
    value: 60,
    label: "7",
  },
  {
    value: 70,
    label: "8",
  },
  {
    value: 80,
    label: "9",
  },
  {
    value: 90,
    label: "10",
  },
]

export function DiscreteSliderValues({ onChange, value, label }: any) {
  return (
    <Box sx={{ width: 700 }}>
      <span>{label}</span>
      <Slider
        aria-label="Restricted values"
        defaultValue={20}
        step={null}
        valueLabelDisplay="off"
        value={(Number(value) - 1) * 10}
        onChange={value => onChange((Number(value) - 1) * 10)}
        marks={marks}
      />
    </Box>
  )
}
