import {User} from "../../orm/entity/User";

export const createUser = async (req, res) => {
    const nickname = req.body.nickname;

    const user = new User();
    user.nickname = nickname;
    user.isActive = true;

    try {
        await user.save();
        res.json({message: 'Saved user', user})
    } catch (error) {
        res.json({message: error.message});
    }
};

export const searchUserByNickname = async (req, res) => {
    const nickname = req.body.nickname;

    const user = User.findOne({where: nickname});

    if (user){
        res.json({user});
    }
};
