function toPersianMonth(month) {
    month = month.toString().replace("Farvardin", "فروردین");
    month = month.toString().replace("Ordibehesht", "اردیبهشت");
    month = month.toString().replace("Khordaad", "خرداد");
    month = month.toString().replace("Tir", "تیر");
    month = month.toString().replace("Mordaad", "مرداد");
    month = month.toString().replace("Shahrivar", "شهریور");
    month = month.toString().replace("Mehr", "مهر");
    month = month.toString().replace("Aabaan", "ابان");
    month = month.toString().replace("Aazar", "اذر");
    month = month.toString().replace("Dey", "دی");
    month = month.toString().replace("Bahman", "بهمن");
    month = month.toString().replace("Esfand", "اسفند");
    return month;
}
function monthToNumber(month) {
    month = month.toString().replace("Farvardin", "1");
    month = month.toString().replace("Ordibehesht", "2");
    month = month.toString().replace("Khordaad", "3");
    month = month.toString().replace("Tir", "4");
    month = month.toString().replace("Mordaad", "5");
    month = month.toString().replace("Shahrivar", "6");
    month = month.toString().replace("Mehr", "7");
    month = month.toString().replace("Aabaan", "8");
    month = month.toString().replace("Aazar", "9");
    month = month.toString().replace("Dey", "10");
    month = month.toString().replace("Bahman", "11");
    month = month.toString().replace("Esfand", "12");
    return month;
}

let currentMonth = moment();
// تابع برای ساخت تقویم فارسی
function generateCalendar() {
    // شروع از اولین روز ماه
    const firstDayOfMonth = moment(currentMonth).startOf("jMonth");

    // شماره روز اولین روز ماه (1 تا 7)
    const firstDayOfWeek = firstDayOfMonth.jDay();

    // تعداد روزهای ماه قبل که باید نمایش داده شود
    const daysFromPreviousMonth = (firstDayOfWeek + 7) % 7;

    // تعداد روزهای کل ماه جاری
    const totalDaysInMonth = currentMonth.jDaysInMonth();

    // تعداد روزهای باقی‌مانده برای کامل کردن جدول
    const remainingDays = 42 - (daysFromPreviousMonth + totalDaysInMonth);

    // محاسبه تاریخ شروع جدول (روز اول)
    const startDate = moment(firstDayOfMonth).subtract(
        daysFromPreviousMonth,
        "jDay"
    );

    // خالی کردن محتوای جدول
    let calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";
    // افزودن روزها به جدول
    for (let i = 0; i < 42; i++) {
        const day = moment(startDate).add(i, "jDay");
        const dayNumber = day.jDate();        
        const isCurrentMonth = day.isSame(firstDayOfMonth, "jMonth");
        const isPastDay = day.isBefore(moment().subtract(1, "jDay"), "jDate"); // افزودن کلاس past-day به روزهای گذشته
        let isToday =
            day.isBefore(moment().subtract(0, "jDay"), "jDate") &&
            dayNumber == moment().format("jDD") && !isPastDay;

        const dayClass = isCurrentMonth
            ? isPastDay
                ? "past-day"
                : ""
            : "text-muted";

        // اضافه کردن روز به جدول
        let td = document.createElement("td");
        let div = document.createElement("div");
        div.className = "dayGhaymat__parent";
        div.innerHTML = `<span class='${dayClass} day ${
            isToday ? "today" : ""
        }'>${dayNumber}</span>`;

        td.appendChild(div);
        calendarBody.appendChild(td);

        // اگر روز آخر هفته یا آخر جدول بود، یک ردیف جدید اضافه می‌شود
        if ((i + 1) % 7 === 0 || i === 41) {
            let tr = document.createElement("tr");
            calendarBody.appendChild(tr);
        }
    }

    // نمایش اسم ماه
    // $("#current-month").text(currentMonth.format("jMMMM jYYYY"));
    document.getElementById("current-month").innerText =
        toPersianMonth(currentMonth.format("jMMMM")) +
        " " +
        currentMonth.format("jYYYY");
}

// تابع برای نمایش ماه قبل
function previousMonth() {
    currentMonth.subtract(1, "jMonth");
    generateCalendar();
}

// تابع برای نمایش ماه بعد
function nextMonth() {
    currentMonth.add(1, "jMonth");
    generateCalendar();
}

// اجرای تابع برای نمایش تقویم
generateCalendar();
