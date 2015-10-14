import Ember from 'ember';
import { initialize, instanceInitialize } from 'ember-cli-segment/initializer';

function checkVersion(version) {
  var parts = version.split('.');
  return (parts[0] > 1 || parts[1] > 10);
}

export default {
  name: 'segment',
  initialize: function(application) {
    initialize(application);
    if (!checkVersion(Ember.VERSION)) {
      instanceInitialize(application);
    }
  }
};
