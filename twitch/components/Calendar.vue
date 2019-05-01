<template>
  <div class="Calendar__main-container">
    <div class="Calendar__center-container">
      <div data-aos="zoom-in" class="Calendar__title">
        Kalendarz
      </div>
      <div class="Calendar__all-days-container">
        <div
          class="Calendar__day-small-container"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="500"
        >
          <div class="Calendar__day-container">
            <span class="Calendar__date">
              {{ dateTitle(-2) }}
            </span>
            <span class="Calendar__day-name">
              {{ dayName(-2) }}
            </span>
            <span class="Calendar__day-information">
              {{ dayInformation(-2) }}
            </span>
          </div>
          <div v-if="dayInformation(-2) === 'WOLNE'" class="Calendar__plan">
            WOLNE :)
            <br />
            MIŁEGO DNIA
          </div>

          <div v-else class="Calendar__plan">
            - 18:00 dodanie kalendarza
            <br />
            - 20:00 BF 5
          </div>
        </div>
        <div
          class="Calendar__day-mid-container"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="500"
        >
          <div class="Calendar__day-container">
            <span class="Calendar__date">
              {{ dateTitle(-1) }}
            </span>
            <span class="Calendar__day-name">
              {{ dayName(-1) }}
            </span>
            <span class="Calendar__day-information">
              {{ dayInformation(-1) }}
            </span>
          </div>

          <div v-if="dayInformation(-1) === 'WOLNE'" class="Calendar__plan">
            WOLNE :)
            <br />
            MIŁEGO DNIA
          </div>
          <div v-else class="Calendar__plan">
            - 18:00 dodanie kalendarza
            <br />
            - 20:00 BF 5
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="500"
          class="Calendar__day-center-container"
        >
          <div class="Calendar__day-container">
            <span class="Calendar__date">
              {{ dateTitle(0) }}
            </span>
            <span class="Calendar__day-name">
              {{ dayName(0) }}
            </span>
            <span class="Calendar__day-information">
              {{ dayInformation(0) }}
            </span>
          </div>
          <div class="Calendar__plan">
            - 18:00 dodanie kalendarza
            <br />
            - 20:00 BF 5
          </div>
        </div>
        <div
          class="Calendar__day-mid-container"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="500"
        >
          <div class="Calendar__day-container">
            <span class="Calendar__date">
              {{ dateTitle(1) }}
            </span>
            <span class="Calendar__day-name">
              {{ dayName(1) }}
            </span>
            <span class="Calendar__day-information">
              {{ dayInformation(1) }}
            </span>
          </div>
          <div v-if="dayInformation(-1) === 'WOLNE'" class="Calendar__plan">
            WOLNE :)
            <br />
            MIŁEGO DNIA
          </div>
          <div v-else class="Calendar__plan">
            - 18:00 dodanie kalendarza
            <br />
            - 20:00 BF 5
          </div>
        </div>
        <div
          class="Calendar__day-small-container"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="500"
        >
          <div class="Calendar__day-container">
            <span class="Calendar__date">
              {{ dateTitle(2) }}
            </span>
            <span class="Calendar__day-name">
              {{ dayName(2) }}
            </span>
            <span class="Calendar__day-information">
              {{ dayInformation(2) }}
            </span>
          </div>
          <div v-if="dayInformation(-1) === 'WOLNE'" class="Calendar__plan">
            WOLNE :)
            <br />
            MIŁEGO DNIA
          </div>
          <div v-else class="Calendar__plan">
            - 18:00 dodanie kalendarza
            <br />
            - 20:00 BF 5
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",

  methods: {
    dateTitle(num) {
      const monthNames = [
        "January",
        "February",
        "March",
        "Kwiecień",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const d = new Date();
      return `${monthNames[d.getMonth()]} ${d.getDate() +
        num}, ${d.getFullYear()}`;
    },
    dayName(num) {
      const days = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota"
      ];
      const d = new Date();
      const dayName = days[d.getDay() + num];
      return dayName;
    },
    dayInformation(num) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const d = new Date();
      const dayName = days[d.getDay() + num];
      if (dayName === "Sun" || dayName === "Sat") {
        return "WOLNE";
      }

      return "Na żywo: 18:00 - 22:00";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "Calendar";
</style>

