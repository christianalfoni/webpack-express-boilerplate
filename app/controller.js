import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const model = Model({
  title: 'Hello world!'
});

export default Controller(model);
