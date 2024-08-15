import { DatePicker } from "antd";

import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { filtersAtom } from "@/atoms/filters";

const { RangePicker } = DatePicker;

const Filters = ({ className }) => {
  const [filters, setFilters] = useAtom(filtersAtom);

  const handleChange = (selectedDates) => {
    setFilters({
      dateRange: [
        selectedDates?.[0]?.startOf("day") || null,
        selectedDates?.[1]?.endOf("day") || null,
      ],
    });
  };

  return (
    <div className={styles.filters}>
      <RangePicker
        value={[filters?.dateRange?.[0], filters?.dateRange?.[1]]}
        onChange={handleChange}
        format="MM/DD/YYYY"
        className={className}
      />
    </div>
  );
};

export default Filters;
