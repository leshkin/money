export function transfers(participants) {
  const sum = participants.reduce((acc, cur) => acc + cur.sum, 0);
  const count = participants.reduce((acc, cur) => acc + cur.count, 0);
  const share = sum / count;
  const transfers = [];

  let paidLess = [];
  let paidMore = [];
  for (const p of participants) {
    const newValue = { id: p.id, pay: p.count * share - p.sum };
    if (newValue.pay > 0) {
      paidLess.push(newValue);
    } else {
      paidMore.push(newValue);
    }
  }
  paidLess = paidLess.sort((a, b) => b.pay - a.pay);
  paidMore = paidMore.sort((a, b) => a.pay - b.pay);

  let i = 0;
  let j = 0;
  while (i < paidLess.length && j < paidMore.length) {
    const paidLessId = paidLess[i].id;
    const paidMoreId = paidMore[j].id;
    let remainder = paidLess[i].pay + paidMore[j].pay;
    let paid;
    if (remainder > 0) {
      paid = paidLess[i].pay - remainder;
      paidLess[i].pay = remainder;
      j++;
    } else {
      paid = paidLess[i].pay;
      paidMore[j].pay = remainder;
      i++;
    }

    let roundedPaid = Math.round(paid)
    if (roundedPaid > 0) {
      transfers.push({from: paidLessId, to: paidMoreId, pay: roundedPaid});
    }
  }

  return {
    sum,
    share: Math.round((share + Number.EPSILON) * 100) / 100,
    transfers
  }
}
