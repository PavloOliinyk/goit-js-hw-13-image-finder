import { success, error, defaults } from '@pnotify/core';

function noticeError() {
  error({
    title: 'Error',
    text: 'Enter correct value',
  });
}

function noticeSuccess() {
  success({
    title: 'Success',
    text: 'The search proceeded successfully',
  });
}

function setDefaultsDelay(delay) {
  defaults.delay = delay;
}

export { noticeError, noticeSuccess, setDefaultsDelay };
