// Calendar data
const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// just uncomment if you wannat get full name of weekday
// const _weekdayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const _weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const _monthLabelsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const _today = new Date();

const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  monthName: _monthLabelsShort[_today.getMonth()],
  day: _today.getDate(),
};

export {
  _daysInMonths,
  _weekdayLabels,
  _monthLabelsShort,
  _monthLabels,
  _today,
  _todayComps
}