import { success, error, defaults, notice } from '@pnotify/core';

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

function noticeFetchTrouble() {
  notice({
    title: 'Warning',
    text: 'Oooops, something went wrong:(',
  });
}

export { noticeError, noticeSuccess, setDefaultsDelay, noticeFetchTrouble };
