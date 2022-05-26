import router from 'express-promise-router';

import { validateBody, bodySchemas } from '../helpers/validator';
import { authController } from '../controllers';
import passport from '../helpers/passport';

const { createUserSchema, authSchema } = bodySchemas;

const { signUp, logIn, verifyUser } = authController;

const authRouter = router();

authRouter.route('/auth/signup').post(validateBody(createUserSchema), signUp);
authRouter
	.route('/auth/login')
	.post(validateBody(authSchema), passport.authenticate('local', { session: false }), logIn);
authRouter.route('/auth/verify/:userId/:verificationToken').post(verifyUser);

export default authRouter;
