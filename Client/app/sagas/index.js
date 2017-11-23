import vision from './vision';
import user from './user';
import feedback from './feedback';
/**
 * rootSaga
 */

export default function* root() {
    yield [
        vision,
        user,
        feedback
    ];
}
