import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView: React.FC = () => {
  const [value, setValue] = useState<Date>(new Date());

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="border rounded p-3 shadow-sm">
        <Calendar onChange={(date) => setValue(date as Date)} value={value} />
      </div>
    </div>
  );
};

export default CalendarView;
