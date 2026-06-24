/************************************************************
 *  UK TIME HELPERS
 ************************************************************/
function getUKTime() {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
}

function getUKDate() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric"
  });

  const parts = formatter.formatToParts(new Date());
  const lookup = Object.fromEntries(parts.map(p => [p.type, p.value]));

  return new Date(
      `${lookup.year}-${lookup.month}-${lookup.day}T${lookup.hour}:${lookup.minute}:${lookup.second}`
  );
}

/************************************************************
*  TIME CONVERSION HELPERS
************************************************************/
function timeToMinutes(timeStr) {
  let [time, period] = timeStr.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function parseHours(hoursRange) {
  const [openStr, closeStr] = hoursRange.split("-").map(s => s.trim());

  return {
      open: timeToMinutes(openStr),
      close: timeToMinutes(closeStr)
  };
}

/************************************************************
*  STORE TIMINGS (SINGLE SOURCE OF TRUTH)
************************************************************/
const storeTimings = {
  rugeley: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  brownhills: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  cannock: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  halesowen: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  kittsgreen: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  uppergornal: {
    0: { day: 'Sun', hours: '12:00 PM - 12:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 12:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 12:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 12:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 12:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 01:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 01:00 AM' }
  },
  wednesbury: {
    0: { day: 'Sun', hours: '03:00 PM - 03:05 AM' },
    1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '03:00 PM - 03:05 AM' },
    6: { day: 'Sat', hours: '03:00 PM - 03:05 AM' }
  },
  willenhall: {
    0: { day: 'Sun', hours: '03:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '03:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '03:00 PM - 03:00 AM' }
  },
  wolverhampton: {
    0: { day: 'Sun', hours: '03:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '03:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '03:00 PM - 03:00 AM' }
  },
  greatbarr: {
    0: { day: 'Sun', hours: '03:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '03:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '03:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '03:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '03:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '03:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '03:00 PM - 03:00 AM' }
  },
  tipton: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  stafford: {
    0: { day: 'Sun', hours: '12:00 PM - 12:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 12:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 12:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 12:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 12:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 12:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 12:00 AM' }
  },
  netherton: {
    0: { day: 'Sun', hours: '12:00 PM - 11:00 PM' },
    1: { day: 'Mon', hours: '12:00 PM - 11:00 PM' },
    2: { day: 'Tue', hours: '12:00 PM - 11:00 PM' },
    3: { day: 'Wed', hours: '12:00 PM - 11:00 PM' },
    4: { day: 'Thu', hours: '12:00 PM - 11:00 PM' },
    5: { day: 'Fri', hours: '12:00 PM - 11:00 PM' },
    6: { day: 'Sat', hours: '12:00 PM - 11:00 PM' }
  },
  longbridge: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  handsacre: {
    0: { day: 'Sun', hours: '12:00 PM - 10:00 PM' },
    1: { day: 'Mon', hours: '12:00 PM - 10:00 PM' },
    2: { day: 'Tue', hours: '12:00 PM - 10:00 PM' },
    3: { day: 'Wed', hours: '12:00 PM - 10:00 PM' },
    4: { day: 'Thu', hours: '12:00 PM - 10:00 PM' },
    5: { day: 'Fri', hours: '12:00 PM - 11:00 PM' },
    6: { day: 'Sat', hours: '12:00 PM - 11:00 PM' }
  },
  bushbury: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  stoke: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  worcester: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
  bloxwich: {
    0: { day: 'Sun', hours: '12:00 PM - 03:00 AM' },
    1: { day: 'Mon', hours: '12:00 PM - 03:00 AM' },
    2: { day: 'Tue', hours: '12:00 PM - 03:00 AM' },
    3: { day: 'Wed', hours: '12:00 PM - 03:00 AM' },
    4: { day: 'Thu', hours: '12:00 PM - 03:00 AM' },
    5: { day: 'Fri', hours: '12:00 PM - 03:00 AM' },
    6: { day: 'Sat', hours: '12:00 PM - 03:00 AM' }
  },
};

/************************************************************
*  BUILD BRANCH TIMINGS DYNAMICALLY
************************************************************/
function buildBranchTimings(storeTimings, today) {
  const timings = {};

  Object.keys(storeTimings).forEach(store => {
      const todayTiming = storeTimings[store][today];
      if (!todayTiming) return;

      timings[`${store}-branch`] = parseHours(todayTiming.hours);
  });

  return timings;
}

/************************************************************
*  OPEN / CLOSED STATUS HANDLER
************************************************************/
document.addEventListener("DOMContentLoaded", function () {

  const ukNow = getUKDate();
  const today = ukNow.getDay();
  const branchTimings = buildBranchTimings(storeTimings, today);

  function updateBranchStatus() {
      const now = getUKTime();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      Object.keys(branchTimings).forEach(branchId => {
          const indicator = document.getElementById(branchId);
          if (!indicator) return;

          const { open, close } = branchTimings[branchId];

          const isOpen = close < open
              ? currentMinutes >= open || currentMinutes < close
              : currentMinutes >= open && currentMinutes < close;

          indicator.classList.toggle("open", isOpen);
          indicator.classList.toggle("closed", !isOpen);
      });
  }

  updateBranchStatus();
  setInterval(updateBranchStatus, 0);
});

/************************************************************
*  DISPLAY TODAY'S HOURS
************************************************************/
function formatTiming(t) {
  if (!t) return '<span class="store-time">No hours available</span>';
  return `<span class="store-time">${t.day}: <b>${t.hours}</b></span>`;
}

document.addEventListener("DOMContentLoaded", function () {
  const ukNow = getUKDate();
  const today = ukNow.getDay();

  document.querySelectorAll('.store').forEach(storeEl => {
      const storeId = storeEl.getAttribute('data-store-id');
      let hoursEl = storeEl.querySelector('.store-hours');

      if (!hoursEl) {
          hoursEl = document.createElement('div');
          hoursEl.className = 'store-hours';
          storeEl.appendChild(hoursEl);
      }

      const timings = storeTimings[storeId];
      const dayTiming = timings ? timings[today] : null;

      hoursEl.innerHTML = formatTiming(dayTiming);
  });
});
