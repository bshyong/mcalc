// 2015 Ben Shyong
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


class TextInputWithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    )
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cost: 0,
      shipping: 0,
      taxRate: 0,
      subTotal: 0,
    }
  }

  calculateBalances() {
    var subTotal = this.state.cost * (1.0 + this.state.taxRate / 100.0) + this.state.shipping
    this.setState({
      subTotal: subTotal
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInputWithLabel label="Item cost">
          <TextInput
            style={styles.inputField}
            placeholder=''
            autoCorrect={false}
            keyboardType='decimal-pad'
            onChangeText={text => this.setState({cost: parseFloat(text || 0)},this.calculateBalances)} />
        </TextInputWithLabel>
        <TextInputWithLabel label="Tax Rate">
          <TextInput
            style={styles.inputField}
            placeholder=''
            autoCorrect={false}
            keyboardType='decimal-pad'
            onChangeText={text => this.setState({taxRate: parseFloat(text || 0)},this.calculateBalances)} />
        </TextInputWithLabel>
        <TextInputWithLabel label="Shipping cost">
          <TextInput
            style={styles.inputField}
            placeholder=''
            autoCorrect={false}
            keyboardType='decimal-pad'
            onChangeText={text => this.setState({shipping: parseFloat(text || 0)},this.calculateBalances)} />
        </TextInputWithLabel>
        <View style={styles.subtotal}>
          <Text>
            Subtotal ${this.state.subTotal}
          </Text>
        </View>
        <TextInputWithLabel label="Listing price">
          <TextInput
            style={styles.inputField}
            placeholder=''
            autoCorrect={false}
            keyboardType='decimal-pad' />
        </TextInputWithLabel>
        <View style={styles.profit}>
          <Text>
            Profit
          </Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  subtotal: {
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 10,
    paddingTop: 5,
    marginBottom: 20,
    borderTopColor: '#999',
    borderTopWidth: 2,
  },
  profit: {
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 10,
    paddingTop: 5,
    marginBottom: 20,
    borderTopColor: '#999',
    borderTopWidth: 2,
  },
  inputField: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#eeeeee',
    margin: 5,
    padding: 10,
  },
  container: {
    marginTop: 65,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    flex: 1,
    justifyContent: 'center',
    color: '#333333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  labelContainer: {
    marginBottom: 5,
  },
  label: {
    width: 240,
    textAlign: 'left',
    paddingLeft: 10,
  },
});

class mCalc extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.navBar}
        initialRoute={{
          title: 'm',
          component: Index,
        }} />
    )
  }
}


AppRegistry.registerComponent('mcalc', () => mCalc);
