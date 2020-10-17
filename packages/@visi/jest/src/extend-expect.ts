import 'jest';

import { Outcome, Report } from '@visi/core';

/* eslint-disable */
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeFail(): R;
      toBePassed(): R;
      toBeInapplicable(): R;
    }
  }
}
/* eslint-enable */

expect.extend({
  toBeFail<T extends Report>(received?: T) {
    const pass = received?.outcome === Outcome.FAIL;

    return {
      pass,
      message: () => {
        if (received == null) return `Report is not defined`;
        return `Outcome for report ${received.id} was ${received.outcome} while expecting FAIl`;
      },
    };
  },

  toBePassed<T extends Report>(received?: T) {
    const pass = received?.outcome === Outcome.PASSED;

    return {
      pass,
      message: () => {
        if (received == null) return `Report is not defined`;
        return `Outcome for report ${received.id} was ${received.outcome} while expecting PASSED`;
      },
    };
  },

  toBeInapplicable<T extends Report>(received?: T) {
    const pass = received?.outcome === Outcome.INAPPLICABLE;

    return {
      pass,
      message: () => {
        if (received == null) return `Report is not defined`;
        return `Outcome for report ${received.id} was ${received.outcome} while expecting FAIl`;
      },
    };
  },
});
