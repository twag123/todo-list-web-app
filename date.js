// Get current date as a formatted string
export function getDate() {
    var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];

    var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];

    var dateObj = new Date();

    var dayName = days[dateObj.getDay()];
    var month = months[dateObj.getMonth()];
    var dayNumb = dateObj.getDate().toString();

    return (dayName + ', ' + month + ' ' + dayNumb);
}