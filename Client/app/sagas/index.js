import vision from './vision';
import user from './user';
import feedback from './feedback';
import discover from './discover';
/**
 * rootSaga
 */

export default function* root() {
    yield [
        vision,
        user,
        feedback,
        discover
    ];
}
