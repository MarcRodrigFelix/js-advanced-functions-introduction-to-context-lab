// Your code here


function createEmployeeRecord(employeeCard){
  const employee = {
    firstName: employeeCard[0],
    familyName: employeeCard[1],
    title: employeeCard[2],
    payPerHour: employeeCard[3],
    timeInEvents: [],
    timeOutEvents: []
  }

  return employee
};



function createEmployeeRecords(employeeRecordArray){
  const employeesRecords = []
  employeeRecordArray.map(function(emp){
    employeesRecords.push(createEmployeeRecord(emp))
  })

  return employeesRecords
};



function createTimeInEvent(employeeRecordObject, dateStamp){
  let timeIn = {
    type: "TimeIn",
    date: dateStamp.split(" ")[0],
    hour: parseInt(dateStamp.split(" ")[1])
  }
  employeeRecordObject.timeInEvents.push(timeIn)

  return employeeRecordObject
};



function createTimeOutEvent(employeeRecordObject, dateStamp){
  let timeOut = {
    type: "TimeOut",
    date: dateStamp.split(" ")[0],
    hour: parseInt(dateStamp.split(" ")[1])
  }
  employeeRecordObject.timeOutEvents.push(timeOut)

  return employeeRecordObject
};



function hoursWorkedOnDate(empRecObj, workDate){
  let timeInDate = empRecObj.timeInEvents.find( e => {return e.date === workDate} )
  let timeIn = timeInDate.hour;
  let timeOutDate = empRecObj.timeOutEvents.find( e => {return e.date === workDate} )
  let timeOut = timeOutDate.hour;
  
  return (timeOut - timeIn) *  .0100;
};

function wagesEarnedOnDate(employeeObject, date){
  let hoursWorked = hoursWorkedOnDate(employeeObject, date)
  let payOwed = hoursWorked * employeeObject.payPerHour

  return parseInt(payOwed)
};



function allWagesFor(employeeObject){
  let employeeEvents = employeeObject.timeInEvents
  let daysWorked = employeeEvents.map( day => day.date )
  let wagesEarned = daysWorked.map( day => wagesEarnedOnDate(employeeObject, day) )

  return wagesEarned.reduce((total, currentWage)=> total + currentWage, 0)
};



function findEmployeeByFirstName(arrayOfEmployeeRecords, employeeName){
let employeesName = arrayOfEmployeeRecords.find( employee => employee.firstName === employeeName)

return employeesName
};

function calculatePayroll(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce( (total, employee) => {
    return total + allWagesFor(employee)
  }, 0)
};
