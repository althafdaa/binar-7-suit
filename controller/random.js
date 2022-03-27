const User = require("../models").user;
const Room = require("../models").room;

const isPlayerUser = (user) => {
  const { role } = user;
  if (role !== "PlayerUser") {
    return false;
  } else {
    return true;
  }
};

const checkRoom = async (roomName) => {
  const room = await Room.findOne({
    where: {
      room_name: roomName,
    },
  });

  if (!room) {
    return false;
  } else {
    return true;
  }
};

const checkPlayer = async (one, two) => {
  const playerOneCheck = await User.findOne({
    where: {
      username: one,
    },
  });

  const playerTwoCheck = await User.findOne({
    where: {
      username: two,
    },
  });

  if (!playerOneCheck || !playerTwoCheck) {
    return false;
  } else {
    return { one_id: playerOneCheck.id, two_id: playerTwoCheck.id };
  }
};

const checkChoice = async (one, two) => {
  if (one.length !== 3 && two.length !== 3) {
    return false;
  } else {
    return true;
  }
};

const playGame = async (req, res) => {
  const { usernameOne, usernameTwo, choiceOne, choiceTwo } = req.body;
  const { roomName } = req.params;

  try {
    const firstCheck = await isPlayerUser(req.user);
    const secondCheck = await checkRoom(roomName);
    const thirdCheck = await checkPlayer(usernameOne, usernameTwo, roomName);
    const fourthCheck = await checkChoice(choiceOne, choiceTwo);

    if (!firstCheck) {
      return res.status(400).json({ message: "You're not PlayerUser" });
    } else if (!secondCheck) {
      return res.status(400).json({ message: "Wrong room name" });
    } else if (!thirdCheck) {
      return res
        .status(400)
        .json({ message: "Please input 3 choices for each player" });
    } else if (!fourthCheck) {
      return res
        .status(400)
        .json({ message: "Please input 3 choices for each player" });
    }

    let playerOneScore = 0;
    let playerTwoScore = 0;
    let draw = null;

    for (let i = 0; i <= 2; i++) {
      if (choiceOne[i] === choiceTwo[i]) {
        draw = true;
      } else if (
        (choiceOne[i] === "Rock" && choiceTwo[i] === "Scissor") ||
        (choiceOne[i] === "Scissor" && choiceTwo[i] === "Paper") ||
        (choiceOne[i] === "Paper" && choiceTwo[i] === "Rock")
      ) {
        playerOneScore = playerOneScore + 30;
        draw = false;
      } else if (
        (choiceOne[i] === "Scissor" && choiceTwo[i] === "Rock") ||
        (choiceOne[i] === "Paper" && choiceTwo[i] === "Scissor") ||
        (choiceOne[i] === "Rock" && choiceTwo[i] === "Paper")
      ) {
        playerTwoScore = playerTwoScore + 30;
        draw = false;
      }
    }

    await Room.update(
      {
        win_id: playerOneScore,
        lose_id: playerTwoScore,
        draw,
        playerOne: thirdCheck.one_id,
        playerTwo: thirdCheck.two_id,
        choiceOne,
        choiceTwo,
      },
      { where: { room_name: roomName } }
    );

    const gameFinished = await Room.findOne({ where: { room_name: roomName } });

    res.status(200).json({
      message: "Game telah selesai",
      room: gameFinished,
    });
  } catch (error) {
    res.status(400).json({
      error: `${error}`,
    });
  }
};

module.exports = { checkRoom, checkPlayer, checkChoice, playGame };
