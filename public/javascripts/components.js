export function isRequestOK(obj) {
  return obj.readyState === 4 && obj.status === 200;
}

export function parseData(obj) {
  return JSON.parse(obj.responseText);
}

export function getData(obj) {
  return obj.map((item) => item);
}

export function calculatePercent(obj) {
  const calculation = obj.map((item) => {
    const total = Number(item.positive) + Number(item.negative);

    if (item.positive !== null) {
      const positive = (item.positive / total) * 100;
      const negative = (item.negative / total) * 100;

      return `${positive.toFixed(0)}% ${negative.toFixed(0)}%`
    }

    return `${item.positive = 0 }% ${item.negative = 0}%`

  });

  return calculation;
}