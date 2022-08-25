import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    const hideCompletedTask = instance.state.get('hideCompleted');

    // if user is logged in return all his/her tasks
    if (Meteor.userId()) {
      // UPDATE-1: Return only logged in user's task
      const userId = Meteor.userId();
      if (hideCompletedTask) {
        return Tasks.find(
          {
            owner: { $eq: userId },
            checked: { $ne: true }
          },
          { sort: { createdAt: -1 } }
        );
      }

      return Tasks.find({ owner: { $eq: userId } }, { sort: { createdAt: -1 } });
    } else {
      // return only public tasks (of all users)[If no user is logged in]
      if (hideCompletedTask) {
        return Tasks.find(
          {
            checked: { $ne: true },
            private: { $ne: true }
          },
          { sort: { createdAt: -1 } });
      }

      return Tasks.find({ private: { $ne: true } }, { sort: { createdAt: -1 } });
    }
  },

  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  }
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
});
