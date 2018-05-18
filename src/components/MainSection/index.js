import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';
import { bindActionCreators } from 'redux';
import { getCompletedTodoCount } from '../../selectors';
import TodoList from '../TodoList';

const MainSection = ({ todosCount, completedCount, actions }) => (
  <section className="main">
    {todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    )}
    <TodoList />
    {todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    )}
  </section>
);

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);