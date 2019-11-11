import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: 'https://011b1bf566b44210957f6c68a63835e9@sentry.io/1806939',
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
