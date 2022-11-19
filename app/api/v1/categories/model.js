const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Panjang nama minimal 3 karakter"],
      maxlength: [20, "Panjang nama maksimal 20 karakter"],
      required: [true, "Nama kategori harus diisi"],
    },
    organizer: {
      type: mongoose.Types.ObjectId, // cara menggunakan relasi dari tabel organizer
      ref: "Organizer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
