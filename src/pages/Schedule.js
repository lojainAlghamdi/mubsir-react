import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";


function Schedule() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const times = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
    "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
  ];

  useEffect(() => {
    const storedCourses = localStorage.getItem("mubsir_schedule");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      fetch(`https://api.betterkau.com/api/courses/search/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
          const allCourses = data.data?.map(course => ({
            id: course.id,
            name: course.name,
            code: `${course.code}${course.number}`
          })) || [];
          setAvailableCourses(allCourses);
        });
    } else {
      setAvailableCourses([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = availableCourses.filter(course =>
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  }, [availableCourses, searchTerm]);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`https://api.betterkau.com/api/courses/${selectedCourse.id}`)
        .then(res => res.json())
        .then(response => {
          const courseData = response.data;
          console.log(courseData.sections[0].classes[0]);

          const courseCode = `${courseData.code}${courseData.number}`;

          const flatSections = courseData.sections.map(section => {
            const instructor = section.classes[0]?.lecturers[0]?.name || "Unknown";
            return {
              course: courseCode,
              title: courseData.name,
              section: section.reference,
              instructor,
              classes: section.classes
            };
          });

          setSections(flatSections);
        });
    } else {
      setSections([]);
    }
  }, [selectedCourse]);

  const parseDay = (letter) => {
    const map = { M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday", S: "Saturday", U: "Sunday" };
    return map[letter] || "";
  };

  function convertTimeToMinutes(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  const handleAddToSchedule = () => {
    if (!selectedSection) return;

    const newEntries = selectedSection.classes
      .filter(cls => cls.days)
      .flatMap(cls =>
        cls.days.split('').map(letter => {
          const day = parseDay(letter);
          const startHour = convertTimeToMinutes(cls.time_start);
          return {
            day,
            key: `${day}-${startHour}`,
            time: `${cls.time_start} - ${cls.time_end}`,
            time_start: cls.time_start,
            course: selectedSection.course,
            instructor: selectedSection.instructor,
            section: selectedSection.section,
            room: cls.room || "Unknown" // ✅ أضفنا رقم الغرفة
          };
        })
      );

    const hasConflict = newEntries.some(newEntry =>
      courses.some(existing =>
        `${existing.day}-${convertTimeToMinutes(existing.time_start)}` === newEntry.key
      )
    );

    if (hasConflict) {
      alert("There is a time conflict with an existing section in the schedule");
      return;
    }

    const updatedCourses = [...courses, ...newEntries];
    setCourses(updatedCourses);
    localStorage.setItem("mubsir_schedule", JSON.stringify(updatedCourses));

    setSearchTerm("");
    setSelectedCourse(null);
    setSelectedSection(null);
    setFilteredCourses([]);
    setSections([]);
  };

  const handleRemoveCourse = (courseToRemove) => {
    const updatedCourses = courses.filter(
      c =>
        !(
          c.course === courseToRemove.course &&
          c.section === courseToRemove.section
        )
    );
    setCourses(updatedCourses);
    localStorage.setItem("mubsir_schedule", JSON.stringify(updatedCourses));
  
    
    localStorage.removeItem("selectedCourseForMap");
  };

  const getCourseCell = (day, time) => {
    return courses
      .filter(c => c.day === day && c.time.startsWith(time))
      .map((match, index) => {
        const colorClass = `course-${match.section.slice(-1)}`;
        const handleCourseClick = (courseInfo) => {
          localStorage.setItem("selectedCourseForMap", JSON.stringify(courseInfo));
          window.location.href = "/map"; // يوديك صفحة الماب
        };
        return (
          <div key={index} className={`course-block ${colorClass}`}>
            <div className="course-content"
              onClick={() => handleCourseClick(match)}>
              {match.course}<br />
              {match.instructor}<br />
              {match.time}
            </div>
            <button
              onClick={() => handleRemoveCourse(match)}
              className="remove-btn"
              title="Remove"
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
        );
      });
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "100px" }}>
        <h2 className="mb-4">My Schedule</h2>

        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Courses</h5>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search course code or name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedCourse(null);
                }}
              />

              {filteredCourses.length > 0 && (
                <ul className="list-group mb-2">
                  {filteredCourses.map(course => (
                    <li
                      key={course.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setSelectedCourse(course);
                        setSearchTerm(course.code);
                        setFilteredCourses([]);
                      }}
                    >
                      <strong>{course.code}</strong> - {course.name}
                    </li>
                  ))}
                </ul>
              )}

              {sections.length > 0 && (
                <div>
                  <h6 className="mt-3">Available Sections</h6>
                  <ul className="list-group">
                    {sections.map((section, idx) => (
                      <li
                        key={idx}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{section.section}</strong> | {section.instructor}
                        </div>
                        <input
                          type="radio"
                          name="sectionSelect"
                          value={idx}
                          onChange={() => setSelectedSection(section)}
                          checked={
                            selectedSection?.section === section.section &&
                            selectedSection?.instructor === section.instructor
                          }
                        />
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handleAddToSchedule}
                    disabled={!selectedSection}
                  >
                    Add to Schedule
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="schedule-grid">
              <div className="grid-header"></div>
              {days.map(day => (
                <div key={day} className="grid-header">{day}</div>
              ))}
              {times.map(time => (
                <React.Fragment key={time}>
                  <div className="grid-time">{time}</div>
                  {days.map(day => (
                    <div key={day + time} className="grid-cell">
                      {getCourseCell(day, time)}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="contact-us">
        <div className="title">Developed by</div>
        <div className="developer-list">
          <a href="https://x.com/_ghadaa112" target="_blank" rel="noopener noreferrer">Ghada Allaythi</a>
          <a href="https://x.com/xflojain" target="_blank" rel="noopener noreferrer">Lojain Alghamdi</a>
          <a href="https://x.com/itzrafal_" target="_blank" rel="noopener noreferrer">Rafal Fakeera</a>
          <a href="https://x.com/Marya_Fawaz" target="_blank" rel="noopener noreferrer">Marya Alkanani</a>
        </div>
        <div className="slogan">Simplifying Your FCIT Campus Journey</div>
        <div className="footer">
          <div className="copyright">Copyright © 2025</div>
        </div>
      </div>

    </>
  );
}

export default Schedule;