p = (any) => {
  console.log(any);
};
getData = () => {
  StringData = document.forms.formData["data"].value;
  while (StringData[StringData.length - 1] == " ") {
    StringData = StringData.slice(0, -1);
  }
  data = [];
  StringData.split(" ").map((e) => {
    data.push(Number(e));
  });
  return data;
};

getSum = (data) => {
  let sum = 0;
  for (let i of data) sum += i;
  return sum;
};

getSDev = (data, mean) => {
  let sum = 0;
  for (let i of data) {
    sum += (i - mean) * (i - mean);
  }
  return Math.sqrt(sum / data.length);
};

const mean = document.querySelector("#mean");
const median = document.querySelector("#median");
const minMax = document.querySelector("#minMax");
const zScore = document.querySelector("#zScore");
const output = document.querySelector("#output");

mean.addEventListener("click", () => {
  const data = getData();
  output.innerHTML = "Mean => " + getSum(data) / data.length;
});

median.addEventListener("click", () => {
  const data = getData().sort(function (a, b) {
    return a - b;
  });
  let mid = parseInt((data.length - 1) / 2);
  p(mid);
  console.log(data);
  if (data.length % 2) {
    output.innerHTML = "Median => " + parseInt(data[mid]);
  } else {
    output.innerHTML =
      "Median => ( " +
      data[mid] +
      "+" +
      data[mid + 1] +
      " ) / 2 => " +
      ((data[mid]) + (data[mid + 1])) / 2;
  }
});

minMax.addEventListener("click", () => {
  output.innerHTML = "";
  const data = getData().sort(function (a, b) {
    return a - b;
  });
  const min = data[0];
  const max = data[data.length - 1];
  const rangeMin = parseInt(document.querySelector("#rangeMin").value);
  const rangeMax = parseInt(document.querySelector("#rangeMax").value);

  console.log(rangeMin, rangeMax);
  for (let i of data) {
    output.innerHTML +=
      i + " => " + (((i - min) / (max - min))*((rangeMax - rangeMin)) + rangeMin) +
      "</br>";
  }
});

zScore.addEventListener("click", () => {
  output.innerHTML = "";
  const data = getData();
  const mean = getSum(data) / data.length;
  const s_dev = getSDev(data, mean);
  for (let i of data) {
    output.innerHTML += i + " => " + (i - mean) / s_dev + "</br>";
  }
});
