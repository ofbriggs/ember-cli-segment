import Ember from 'ember';
import segmentMixin from './mixin';

function initialize(application) {
  var segment = Ember.Object.extend(segmentMixin);
  application.register('service:segment', segment, { singleton: true });
  application.inject('route', 'segment', 'service:segment');
  application.inject('router', 'segment', 'service:segment');
  application.inject('controller', 'segment', 'service:segment');
}

function instanceInitialize(applicationInstance) {
  var config = applicationInstance.resolveRegistration('config:environment');
  var router = applicationInstance.lookup('router:main');
  var segment = applicationInstance.lookup('service:segment');

  segment.set('config', config);

  router.on('didTransition', function() {
    segment.trackPageView();

    var applicationRoute = applicationInstance.lookup('route:application');
    if(applicationRoute && typeof applicationRoute.identifyUser === 'function') {
      applicationRoute.identifyUser();
    }
  });
}

export { initialize, instanceInitialize };
