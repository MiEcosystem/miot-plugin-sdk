/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule decelerationRate
 */
'use strict';
import {Platform} from 'react-native';
function decelerationRate(
    decelerationRate: number | 'normal' | 'fast',
): number {
    if (decelerationRate === 'normal') {
        return Platform.select({
            ios: 0.998,
            android: 0.985,
        });
    } else if (decelerationRate === 'fast') {
        return Platform.select({
            ios: 0.99,
            android: 0.9,
        });
    }
    return decelerationRate;
}
export default decelerationRate;