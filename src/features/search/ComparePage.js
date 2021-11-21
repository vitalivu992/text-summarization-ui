import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, Button, List, Label, Icon, Form } from 'semantic-ui-react';
import { SCORE_CODE_TO_LABEL, PRECISION } from '../home/App';

export class ComparePage extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };



  render() {
    const { comparePending, compareError, suggest, compareScores, compareTime } = this.props.search;
    const { compare } = this.props.actions;
    const handleChange = event => { this.props.search[event.target.name] = event.target.value; };
    return (
      <div className="search-compare-page">
        <Header as='h1'>Semantic Similarity Comparision</Header>
        <Form onSubmit={compare}>

          <Form.Group>
            <Form.Input placeholder={suggest} width={6} name='question1' onChange={handleChange} />
            <Form.Input placeholder={suggest} width={6} name='question2' onChange={handleChange} />
            <Button width={2} primary={!comparePending} disable={comparePending} type="submit" ><Icon name='check square outline' />Compare</Button>
          </Form.Group>
        </Form>
        {compareError && (
          <Header as="h3" className="fetch-list-error">Failed to load: {compareError.toString()}</Header>
        )}
        {compareScores.length > 0 ?
          (<div><List divided selection>
            {compareScores.map((cs) =>
              <List.Item>
                <Label color={cs.score > 0.99? 'red': cs.score >= 0.85 ? 'green' : (cs.score > 0.5 ? 'blue' : 'grey')} horizontal>
                  {SCORE_CODE_TO_LABEL[cs.label]}
                </Label>{Math.round(cs.score * PRECISION) / PRECISION}
              </List.Item>)}
          </List>
                      <Header as="h5">Response in <span className="search-highlight">{compareTime}</span> seconds</Header>
          </div>) : 
          (
            <div>
              <p>Just give me 2 sentences</p>
            </div>
          )
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparePage);
