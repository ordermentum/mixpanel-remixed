import mixpanel from 'mixpanel-browser';

export default function mixpanelBuilder(token) {
  mixpanel.init(token);

  // eslint-disable-next-line
  return store => next => action => {
    if (action.meta && action.meta.analytics) {
      const {
        event,
        payload,
        type,
      } = action.meta.analytics;
      if (type === 'identify') {
        mixpanel.people.set(payload);
        mixpanel.identify(payload.userId);
      } else {
        mixpanel.track(event, payload);
      }
    }
    return next(action);
  };
}
