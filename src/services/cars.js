export const headers = [
  {
    title: "Manufacturer",
    key: "manufacturer",
  },
  {
    title: "MODEL",
    key: "model",
  },
  {
    title: "YEAR",
    key: "year",
  },
  {
    title: "PLATE LETTERS",
    key: "plate_letter",
  },
  {
    title: "PLATE NUMBERS",
    key: "plate_numbers",
  },
  {
    title: "MB",
    key: "mb",
  },
  {
    title: "STATUS",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
    sortable: false,
  },
]

// 👉 search filters

export const manufactures = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Toyota",
    value: "toyota",
  },
  {
    title: "Isuzu",
    value: "isuzu",
  },
  {
    title: "Nissan",
    value: "nissan",
  },
]

export const status = [
  {
    title: "All",
    value: "All",
  },
  {
    title: "Clear",
    value: "clear",
  },
  {
    title: "Spare Tire",
    value: "spare_tire",
  },
  {
    title: "Need Maintenance",
    value: "need_maintenance",
  },
  {
    title: "Fuel",
    value: "fuel",
  },
  {
    title: "Outdated",
    value: "outdated",
  },
]

export const mbs = [
  {
    title: "All",
    value: "All",
  },
  {
    title: "MB5",
    value: "mb5",
  },
  {
    title: "MB6",
    value: "mb6",
  },
  {
    title: "MB9",
    value: "mb9",
  },
]

export const userListMeta = [
  {
    icon: "tabler-car",
    color: "primary",
    title: "Cars",
    stats: "5",
    subtitle: "Total Cars",
  },
  {
    icon: "tabler-car-off",
    color: "success",
    title: "Fuel",
    stats: "1",
    subtitle: "Without Fuel",
  },
  {
    icon: "tabler-steering-wheel",
    color: "error",
    title: "Spare Tire",
    stats: "2",
    subtitle: "Without Spare Tire",
  },
  {
    icon: "tabler-car-crash",
    color: "warning",
    title: "Maintenance",
    stats: "0",
    subtitle: "Need Maintenance",
  },
]
