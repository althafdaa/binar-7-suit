const User = require("../models").user;
const Room = require("../models").room;

const checkRole = (data) => {
  const { role } = data;

  if (role !== "PlayerUser") {
    return false;
  } else {
    return true;
  }
};

const checkUserInput = (room) => {
  if (room.choiceOne.length === 3 && room.choiceTwo.length === 3) {
    return true;
  } else {
    return false;
  }
};

const checkPlayerTurn = (room, playerOne, playerTwo) => {
  const { choiceOne, choiceTwo } = room;

  if (choiceOne && choiceTwo) {
    if (playerOne && choiceOne.length > choiceTwo.length) return false;
    else if (playerTwo && choiceTwo.length > choiceOne.length) return false;
  } else if (playerOne && choiceOne && !choiceTwo) {
    return false;
  } else if (playerTwo && choiceTwo && !choiceOne) {
    return false;
  } else {
    return true;
  }
};

const updatePlayer = async (room, userId) => {
  const { id: roomId } = room;

  let isFirstEmpty = true;
  let isSecondEmpty = true;

  let isFirstPlayer = false;
  let isSecondPlayer = false;

  if (room.playerOne === userId) {
    isFirstPlayer = true;
  } else if (room.playerTwo === userId) {
    isSecondPlayer = true;
  } else if (room.playerOne !== userId && room.playerTwo !== userId) {
    return { error: "Room sudah penuh" };
  }

  if (isFirstEmpty) {
    try {
      await Room.update(
        { playerOne: userId },
        {
          where: {
            id: roomId,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (isFirstEmpty) {
    try {
      await Room.update(
        { playerTwo: userId },
        {
          where: {
            id: roomId,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isFirstEmpty,
    isSecondEmpty,
    isFirstPlayer,
    isSecondPlayer,
  };
};

const joinRoom = async (req, res) => {
  try {
    const findRoom = Room.findOne({ where: { room_name: req.body.room_name } });
    if (!findRoom) {
      return res.status(400).json({ message: "room not found" });
    } else {
    }
  } catch (error) {}
};
