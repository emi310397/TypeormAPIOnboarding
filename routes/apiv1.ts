import {Router} from 'express'
import {createPost, searchPostsByContent, searchPostsByCategory, searchPostsByUser} from './Controllers/PostController';
import {createUser, searchUserByNickname} from "./Controllers/UserController";

const router = Router();

router.post('/user', createUser);
router.get('/user', searchUserByNickname);
router.post('/post', createPost);
router.get('/post/content', searchPostsByContent);
router.get('/post/category', searchPostsByCategory);
router.get('/post/user', searchPostsByUser);
router.use('/', (req, res) => {
    res.end('API Entry Point');
});

export {router}
