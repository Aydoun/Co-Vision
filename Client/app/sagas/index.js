import { fork } from 'redux-saga/effects';

import vision from './visionSaga';

/**
 * rootSaga
 */

export default function* root() {
    yield [
        vision
    ]
}
