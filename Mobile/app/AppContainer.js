import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getPostById , getUsers } from './actions/postsAction';
import { Container, Header, Title, Content, InputGroup, Input, List, Button, Icon , ListItem , Text , Spinner } from 'native-base';
import { View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

class Hi extends Component {

  constructor(props) {
    super(props);
    this.state = { inputText: '', displayType: 'all' };
  }

  componentDidMount(){
      var self = this;
      this.props.getUsers();
  }

  sendGreeting(message = 'Cool Stuff'){
      var self = this;
      //this.setState({inputText : 'Hey Asswhole'});
      //console.log('Greeting!');
      console.log('sendGreeting! : ');
      this.props.getUsers();
  }

  listCliked(key){
      console.log('list clicked! : ' , key);
  }

  render() {
    //console.log('props ' , this.props);
    const {usersList , users} = this.props;

    return (
      <Container>
        <Header >
          <Title>NativeBase Greeting</Title>
        </Header>
        <Content>
              {
                usersList == null ?
                <Spinner color='blue' /> :
                null
              }
              <List dataArray={usersList}
                renderRow={(item , index) =>
                          <ListItem button onPress={() => this.listCliked(item)}>
                              <Text>{item.name}</Text>
                          </ListItem>
                }
              >

              </List>
        </Content>
      </Container>
    );
  }
}

function makeList(arr){
    const pollyfill = [{ name:'test' },{ name:'nest' }];
    return Array.isArray(arr) ? arr : null;
    if (Array.isArray(arr)) {
      // return arr.map(function(item , index){
      //     return <ListItem button onPress={() => listCliked()} key={index}>
      //               <Text>{item.name}</Text>
      //            </ListItem>
      // });
      return arr;
    }

    // return pollyfill.map(function(item , index){
    //     return <ListItem key={index}>
    //               <Text>{item.name}</Text>
    //            </ListItem>
    // });

    return null;
}

function mapStateToProps(state) {
  console.log('state : ' , state.posts);
  return {
    post: state.posts.message,
    users : Array.isArray(state.posts.users) ? state.posts.users : [],
    usersList : makeList(state.posts.users)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostById: id => dispatch(getPostById(id)),
    getUsers: () => dispatch(getUsers())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hi);
