// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(hour) });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(hour) });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;  // Assuming working hours are in 'HHMM' format
  }
  
  function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, timeInEvent) => {
      const date = timeInEvent.date;
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  