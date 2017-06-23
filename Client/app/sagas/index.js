import { fork } from 'redux-saga/effects';

import vision from './visionSaga';
import user from './userSaga';

/**
 * rootSaga
 */

export default function* root() {
    yield [
        vision,
        user
    ]
}
