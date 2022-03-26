const Room = require("../models").room;

const isSuperAdmin = (user) => {
  const { role } = user;
  if (role !== "SuperAdmin") {
    return false;
  } else {
    return true;
  }
};

const createRoom = async (req, res) => {
  const { room_name } = req.body;
  const isAdmin = isSuperAdmin(req.user);

  if (!isAdmin) {
    return res.status(400).json({
      message: "Role is not allowed, SuperAdmin only",
    });
  }
  try {
    await Room.create({
      room_name,
    });

    return res.status(200).json({
      message: "Room berhasil dibuat",
    });
  } catch (error) {
    return res.status(500).json({
      data: req.user,
      message: `${error}`,
    });
  }
};

module.exports = {
  createRoom,
};
