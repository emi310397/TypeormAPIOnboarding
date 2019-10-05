import {Post} from '../../orm/entity/Post';
import {User} from '../../orm/entity/User';
import {Category} from '../../orm/entity/Category';
import {Like} from "typeorm";

export const createPost = async (req, res) => {
    const {title, content, user_id, category_name} = req.body;

    const userId = user_id;
    const categoryName = category_name;

    const post = new Post();
    post.title = title;
    post.content = content;

    const user = await User.findOne({where: {id: userId}});

    if (user) {
        post.craftedBy = user;
    } else {
        res.status(404).json({message: 'User not Found'});
    }

    let category = await Category.findOne({where: {name: categoryName}});

    if (category) {
        post.category = category;
    } else {
        category = new Category();
        category.name = categoryName;
        try {
            await category.save();
            res.json({message: 'Saved category', category});
            post.category = category;
        } catch (error) {
            res.json({message: error.message});
        }
    }

    try {
        await post.save();
        res.json({message: "The post was created succesfully", post});
    } catch (error) {
        res.json({message: error.message});
    }
};

export const searchPostsByContent = async (req, res) => {
    const content = req.body.content;

    try {
        const posts = await Post.find({content: Like(content)});
        res.json({posts});
    } catch (error) {
        res.json({message: error.message});
    }
};

export const searchPostsByCategory = async (req, res) => {
    const category_name = req.body;

    let category = await Category.findOne({where: {name: category_name}});

    if (category) {
        try {
            const posts = await Post.find({where: {category}});
            res.json({posts});
        } catch (error) {
            res.json({message: error.message});
        }
    } else {
        res.status(404).json({message: "Category not found"});
    }
};

export const searchPostsByUser = async (req, res) => {
    const {user_id, category_name} = req.body;

    const user = await User.findOne({id: user_id});

    if (user) {
        let category = await Category.findOne({where: {name: category_name}});

        if (category) {
            try {
                const posts = await Post.find({where: {user, category}});
                res.json({posts});
            } catch (error) {
                res.json({message: error.message});
            }
        } else {
            try {
                const posts = await Post.find({where: {user}});
                res.json({posts});
            } catch (error) {
                res.json({message: error.message});
            }
        }
    } else {
        res.status(404).json({message: 'User not Found'});
    }
};
