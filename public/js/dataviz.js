var chartBar = document.getElementById("chartBar");

new Chart(chartBar, {
  type: "bar",
  data: {
    labels: ["Number of Men", "Number of Women"],
    datasets: [
      {
        order: 0,
        data: [chartBar.dataset.male, chartBar.dataset.female],
        backgroundColor: ["#81ecec", "#55efc4"],
        borderColor: ["#00cec9", "#00b894"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: { yAxes: [{ ticks: { beginAtZero: true, max: 10 } }] },
    legend: { display: false },
  },
});

var chartDoughnut = document.getElementById("chartDoughnut");

new Chart(chartDoughnut, {
  type: "doughnut",
  data: {
    labels: ["Number of Read Messages", "Number of Unread Messages"],
    datasets: [
      {
        data: [chartDoughnut.dataset.readmessages, chartDoughnut.dataset.unreadmessages],
        backgroundColor: ["#fab1a0", "#ff7675"],
        borderColor: ["#e17055", "#d63031"],
        borderWidth: 1,
      },
    ],
  },
});

var chartPie = document.getElementById("chartPie");

new Chart(chartPie, {
  type: "pie",
  data: {
    labels: ["Number of Delivered Orders", "Number of Undelivered Orders"],
    datasets: [
      {
        data: [chartPie.dataset.deliveredorders, chartPie.dataset.undeliveredorders],
        backgroundColor: ["#dfe6e9", "#636e72"],
        borderColor: ["#b2bec3", "#2d3436"],
        borderWidth: 1,
      },
    ],
  },
});

var chartLine = document.getElementById("chartLine");
var data = JSON.parse(chartLine.dataset.chartline);

var labelsDates = [];
var dataSales = [];

for (var i = 0; i < data.length; i++) {
  var date = `${data[i]._id.yearinsert} / ${data[i]._id.monthinsert}`;

  labelsDates.push(date);
  dataSales.push(data[i].totalSales);
}

new Chart(chartLine, {
  type: "line",
  data: {
    labels: labelsDates,
    datasets: [
      {
        data: dataSales,
        backgroundColor: ["#6c5ce7"],
      },
    ],
  },
  options: {
    scales: { yAxes: [{ ticks: { beginAtZero: true, max: 1850 } }] },
    legend: { display: false },
    title: {
      display: true,
      text: "Sales per Month",
      fontStyle: "bold",
      fontSize: 20,
      fontColor: "#6c5ce7",
    },
  },
});
