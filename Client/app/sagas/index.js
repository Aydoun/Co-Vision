import vision from './vision';
import user from './user';
import courrier from './courrier';
import feedback from './feedback';
import discover from './discover';
/**
 * rootSaga
 */

export default function* root() {
    yield [
        vision,
        user,
        courrier,
        feedback,
        discover
    ];
}
