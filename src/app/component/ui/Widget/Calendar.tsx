import React, { useState } from "react";
import { GoPin } from "react-icons/go";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbBellPin } from "react-icons/tb";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockEvents = [
    { title: "Hostel Anniversery", type: "Zoom", date: "01 Nov 2021" },
    { title: "Design meeting (team)", type: "Skype", date: "01 Nov 2021" },
    { title: "Background research", type: "Google", date: "01 Nov 2021" },
    { title: "Meeting with client", type: "Zoom", date: "01 Nov 2021" },
];

const CalendarWithNotes: React.FC = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayIndex = (firstDay.getDay() + 6) % 7; // Make Monday = 0
    const totalDays = lastDay.getDate();

    const handleMonthChange = (direction: number) => {
        const newDate = new Date(currentYear, currentMonth + direction);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    };

    const getDayClass = (day: number) => {
        const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
        return isToday ? "btn btn-secondary -circle py-0" : "text-center";
    };

    return (
        <div className="card p-3 border-0">
            <h5 className="mb-3 text-muted">Events Calendar</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <button title="button" className="btn btn-sm " onClick={() => handleMonthChange(-1)}>
                    <FaChevronLeft />
                </button>
                <h6 className="m-0">
                    {new Date(currentYear, currentMonth).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h6>
                <button title="button" className="btn btn-sm" onClick={() => handleMonthChange(1)}>
                    <FaChevronRight />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="d-grid text-muted" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                {daysOfWeek.map((day) => (
                    <div key={day} className="text-center fw-semibold text-muted small">
                        {day}
                    </div>
                ))}
                {Array(startDayIndex).fill(null).map((_, idx) => (
                    <div key={`empty-${idx}`}></div>
                ))}
                {Array.from({ length: totalDays }, (_, i) => (
                    <div key={i + 1} className={getDayClass(i + 1)}>
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Events List */}
            <div className="mt-4">
                {mockEvents.map((event, idx) => (
                    <div key={idx} className="d-flex align-items-start mb-3">
                        <span className="me-2 fs-4 text-sm" ><TbBellPin style={{ height: "22px" }} />
                        </span>
                        <div>
                            <div className="fw-semibold text-md">{event.title}</div>
                            <div className="small text-muted text-sm">{event.type} meeting</div>
                        </div>
                        <div className="ms-auto small text-muted text-sm">{event.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarWithNotes;
