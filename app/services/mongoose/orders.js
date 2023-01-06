const Orders = require("../../api/v1/orders/model");

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};
  //jika rolenya bukan owner makan data yang di tampilkan berdasarkan organizer yang terdapat
  //pada schema order di historyEvent
  //jika dia adalah owner maka seluruh data order bisa di lihat owner.
  if (req.user.role !== "owner") {
    condition = { ...condition, "historyEvent.organizer": req.user.organizer };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    // memfilter dari waktu jam 0 menit 0 detik 0 sampai
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    //waktu jam 24 menit 59 detik 59
    end.setHours(23, 59, 59);

    condition = {
      ...condition,
      date: {
        $gte: start, // lebih dari
        $lt: end, // kecil dari
      },
    };
  }

  const result = await Orders.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);
  // mengdebug isi dari condition dan ingin mengetahui kode (...codition,asdasd), rupanya
  // ini adalah spread operator untuk memasukan suatu data dalam object condition, jadi tujuannya
  // semua data akan dimasukan kedalam objeck condition
  console.log("condition  : ");
  console.log(condition);
  return { data: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = {
  getAllOrders,
};
