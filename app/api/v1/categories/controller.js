const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");
// create
const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// Kalo mau ambil  beberapa nilai aja, seperti id sama name
// const getSelect = async (req, res, next) => {
//   try {
//     const result = await Categories.find().select("_id name");
//     res.status(StatusCodes.OK).json({
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const findIdIndex = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // kode terdahulu yang di modifikasi lagi
    // const { id } = req.params;
    // const { name } = req.body;
    // // Cara pertama
    // // const checkingCategories = await Categories.findOne({ _id: id });
    // // if (!checkingCategories)
    // //   return res.status(404).json({
    // //     message: "Id tidak ditemukan",
    // //   });
    // // // edit name dari id
    // // checkingCategories.name = name;
    // // // kemudian kita simpan nama yang sudah di edit tadi
    // // await checkingCategories.save();

    // // cara kedua menggunakan fungsi orm mongoose
    // const result = await Categories.findByIdAndUpdate(
    //   { _id: id },
    //   { name },
    //   { new: true, runValidators: true }
    // );

    // jika sudah di masukan ke service categories maka kode nya hanya seperti ini saja.
    const result = await updateCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    // kode dahulu yang belum menggunakan services
    // const { id } = req.params;
    // const result = await Categories.findByIdAndRemove(id);
    const result = await deleteCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  findIdIndex,
  update,
  deleteCategory,
};
